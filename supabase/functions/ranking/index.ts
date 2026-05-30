import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SELECT_COLUMNS =
  "id,date_key,random_name,score,map_seed,deliveries,combo,collisions,near_misses,item_pickups,score_breakdown,created_at";
const MAX_SCORE = 120000;
const MAX_DELIVERIES = 80;
const MAX_COMBO = 80;
const MAX_COLLISIONS = 120;
const MAX_NEAR_MISSES = 200;
const MAX_ITEM_COUNT = 120;
const MAX_SCORE_BREAKDOWN_VALUE = 999999;
const DAY_MS = 24 * 60 * 60 * 1000;
const PLAYER_NAME_RE = /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}々ー]{2,16}$/u;
const ITEM_KEYS = ["clock", "shield", "magnet", "turbo", "flight", "star"] as const;
const SCORE_BREAKDOWN_KEYS = [
  "pickup",
  "delivery",
  "distance",
  "combo",
  "fast",
  "multi",
  "bonus",
  "event",
  "near",
  "penalty",
] as const;

type ItemKey = (typeof ITEM_KEYS)[number];
type ScoreBreakdownKey = (typeof SCORE_BREAKDOWN_KEYS)[number];

type ScorePayload = {
  dateKey?: unknown;
  date_key?: unknown;
  randomName?: unknown;
  random_name?: unknown;
  score?: unknown;
  mapSeed?: unknown;
  map_seed?: unknown;
  deliveries?: unknown;
  combo?: unknown;
  collisions?: unknown;
  nearMisses?: unknown;
  near_misses?: unknown;
  itemPickups?: unknown;
  item_pickups?: unknown;
  scoreBreakdown?: unknown;
  score_breakdown?: unknown;
};

type ScoreRow = {
  id: number;
  date_key: string;
  random_name: string;
  score: number;
  map_seed: number;
  deliveries: number;
  combo: number;
  collisions: number;
  near_misses: number;
  item_pickups: Record<ItemKey, number>;
  score_breakdown: Record<ScoreBreakdownKey, number>;
  created_at: string;
};

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

Deno.serve(async (request) => {
  const origin = request.headers.get("Origin");
  const corsHeaders = buildCorsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (!isAllowedOrigin(origin)) {
    return jsonResponse({ error: "forbidden_origin" }, 403, corsHeaders);
  }

  try {
    if (request.method === "GET") {
      const url = new URL(request.url);
      const dateKey = normalizeDateKey(url.searchParams.get("date") ?? url.searchParams.get("dateKey") ?? getJstDateKey(new Date()));
      return jsonResponse(await buildRankingResponse(dateKey), 200, corsHeaders);
    }

    if (request.method === "POST") {
      const payload = await readJson(request);
      const row = normalizeScorePayload(payload);
      const { data, error } = await supabase.from("scores").insert(row).select(SELECT_COLUMNS).single();

      if (error) {
        console.error("failed to insert score", error.message);
        throw new HttpError(500, "score_insert_failed");
      }

      return jsonResponse(
        {
          ok: true,
          record: serializeScore(data as ScoreRow),
          ranking: await buildRankingResponse(row.date_key),
        },
        201,
        corsHeaders,
      );
    }

    return jsonResponse({ error: "method_not_allowed" }, 405, corsHeaders);
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonResponse({ error: error.message }, error.status, corsHeaders);
    }

    console.error("ranking function error", error);
    return jsonResponse({ error: "internal_error" }, 500, corsHeaders);
  }
});

async function buildRankingResponse(dateKey: string) {
  const today = await getTodayTop10(dateKey);
  const weekDates = getCurrentWeekDateKeys(dateKey);
  const week = await Promise.all(
    weekDates.map(async (weekDateKey) => ({
      dateKey: weekDateKey,
      top: await getDailyTopScore(weekDateKey),
    })),
  );

  return {
    dateKey,
    today,
    week,
  };
}

async function getTodayTop10(dateKey: string) {
  const { data, error } = await supabase
    .from("scores")
    .select(SELECT_COLUMNS)
    .eq("date_key", dateKey)
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(10);

  if (error) {
    console.error("failed to load today ranking", error.message);
    throw new HttpError(500, "ranking_load_failed");
  }

  return (data ?? []).map((record) => serializeScore(record as ScoreRow));
}

async function getDailyTopScore(dateKey: string) {
  const { data, error } = await supabase
    .from("scores")
    .select(SELECT_COLUMNS)
    .eq("date_key", dateKey)
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("failed to load weekly ranking", error.message);
    throw new HttpError(500, "ranking_load_failed");
  }

  return data ? serializeScore(data as ScoreRow) : null;
}

function normalizeScorePayload(payload: ScorePayload) {
  if (!payload || typeof payload !== "object") {
    throw new HttpError(400, "invalid_payload");
  }

  const dateKey = normalizeDateKey(readString(payload.dateKey ?? payload.date_key, "date_key"));
  assertFreshDateKey(dateKey);

  const randomName = readString(payload.randomName ?? payload.random_name, "random_name").trim();
  if (!PLAYER_NAME_RE.test(randomName)) {
    throw new HttpError(400, "invalid_random_name");
  }

  const score = readInteger(payload.score, "score", 0, MAX_SCORE);
  const mapSeed = readInteger(payload.mapSeed ?? payload.map_seed, "map_seed", 0, 4294967295);
  const expectedMapSeed = hashString(dateKey);
  if (mapSeed !== expectedMapSeed) {
    throw new HttpError(400, "invalid_map_seed");
  }

  const deliveries = readInteger(payload.deliveries, "deliveries", 0, MAX_DELIVERIES);
  const combo = readInteger(payload.combo, "combo", 0, MAX_COMBO);
  const collisions = readInteger(payload.collisions, "collisions", 0, MAX_COLLISIONS);
  const nearMisses = readInteger(payload.nearMisses ?? payload.near_misses, "near_misses", 0, MAX_NEAR_MISSES);
  const itemPickups = normalizeItemPickups(payload.itemPickups ?? payload.item_pickups);
  const scoreBreakdown = normalizeScoreBreakdown(payload.scoreBreakdown ?? payload.score_breakdown);

  if (combo > deliveries) {
    throw new HttpError(400, "invalid_combo");
  }

  return {
    date_key: dateKey,
    random_name: randomName,
    score,
    map_seed: mapSeed,
    deliveries,
    combo,
    collisions,
    near_misses: nearMisses,
    item_pickups: itemPickups,
    score_breakdown: scoreBreakdown,
  };
}

function normalizeItemPickups(value: unknown): Record<ItemKey, number> {
  const source = isPlainObject(value) ? value : {};
  const itemPickups = Object.fromEntries(ITEM_KEYS.map((key) => [key, readInteger(source[key], key, 0, MAX_ITEM_COUNT, 0)])) as Record<
    ItemKey,
    number
  >;
  const total = Object.values(itemPickups).reduce((sum, count) => sum + count, 0);

  if (total > MAX_ITEM_COUNT) {
    throw new HttpError(400, "too_many_items");
  }

  return itemPickups;
}

function normalizeScoreBreakdown(value: unknown): Record<ScoreBreakdownKey, number> {
  const source = isPlainObject(value) ? value : {};
  return Object.fromEntries(
    SCORE_BREAKDOWN_KEYS.map((key) => [
      key,
      readInteger(source[key], key, -MAX_SCORE_BREAKDOWN_VALUE, MAX_SCORE_BREAKDOWN_VALUE, 0),
    ]),
  ) as Record<ScoreBreakdownKey, number>;
}

function serializeScore(record: ScoreRow) {
  return {
    id: record.id,
    dateKey: record.date_key,
    randomName: record.random_name,
    score: record.score,
    mapSeed: Number(record.map_seed),
    deliveries: record.deliveries,
    combo: record.combo,
    collisions: record.collisions,
    nearMisses: record.near_misses,
    itemPickups: record.item_pickups,
    scoreBreakdown: record.score_breakdown,
    createdAt: record.created_at,
  };
}

async function readJson(request: Request): Promise<ScorePayload> {
  try {
    return (await request.json()) as ScorePayload;
  } catch {
    throw new HttpError(400, "invalid_json");
  }
}

function readString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new HttpError(400, `invalid_${fieldName}`);
  }

  return value;
}

function readInteger(value: unknown, fieldName: string, min: number, max: number, fallback?: number): number {
  if (value == null && fallback != null) return fallback;
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;

  if (!Number.isInteger(number) || number < min || number > max) {
    throw new HttpError(400, `invalid_${fieldName}`);
  }

  return number;
}

function normalizeDateKey(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new HttpError(400, "invalid_date_key");
  }

  const date = parseDateKey(value);
  if (Number.isNaN(date.getTime()) || formatDateKey(date) !== value) {
    throw new HttpError(400, "invalid_date_key");
  }

  return value;
}

function assertFreshDateKey(dateKey: string) {
  const todayKey = getJstDateKey(new Date());
  const diff = Math.abs((parseDateKey(dateKey).getTime() - parseDateKey(todayKey).getTime()) / DAY_MS);

  if (diff > 1) {
    throw new HttpError(400, "stale_date_key");
  }
}

function getCurrentWeekDateKeys(dateKey: string) {
  const current = parseDateKey(dateKey);
  const day = current.getUTCDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setUTCDate(current.getUTCDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + index);
    return formatDateKey(date);
  });
}

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getJstDateKey(date: Date) {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function hashString(value: string) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function buildCorsHeaders(origin: string | null) {
  const allowOrigin = getCorsOrigin(origin);
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function isAllowedOrigin(origin: string | null) {
  const allowedOrigins = getConfiguredOrigins();
  return !origin || allowedOrigins.length === 0 || allowedOrigins.includes("*") || allowedOrigins.includes(origin);
}

function getCorsOrigin(origin: string | null) {
  const allowedOrigins = getConfiguredOrigins();
  if (allowedOrigins.length === 0 || allowedOrigins.includes("*")) return "*";
  if (origin && allowedOrigins.includes(origin)) return origin;
  return allowedOrigins[0];
}

function getConfiguredOrigins() {
  return (Deno.env.get("APP_ORIGINS") ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function jsonResponse(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
