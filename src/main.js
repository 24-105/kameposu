const GAME_SECONDS = 60;
if (!window.KAMEPOSU_COPY) throw new Error("KAMEPOSU_COPY is required");
const COPY = window.KAMEPOSU_COPY;
const ROUNDED_FONT_FAMILY =
  '"Hiragino Maru Gothic ProN", "Yu Gothic", "Meiryo", system-ui, sans-serif';
const COUNTDOWN_STEP_MS = 800;
const START_COUNTDOWN_MS = COUNTDOWN_STEP_MS * 4;
const RETRY_COUNTDOWN_MS = START_COUNTDOWN_MS;
const FINISH_ANNOUNCE_MS = 2200;
const WARP_SECONDS = 0.55;
const SECOND_HALF_SECONDS = 30;
const LAST_SPURT_SECONDS = 10;
const COLS = 38;
const ROWS = 28;
const TILE = 40;
const WORLD_WIDTH = COLS * TILE;
const WORLD_HEIGHT = ROWS * TILE;
const PLAYER_RADIUS = 10;
const COLLISION_RADIUS_SCALE = 0.5;
const RUSH_COLLISION_RADIUS_SCALE = 0.46;
const BUILDING_CORNER_RADIUS = 13;
const MAX_MOVE_STEP_PIXELS = 4.8;
const TOUCH_DEADZONE_PIXELS = 9;
const TOUCH_FULL_TILT_PIXELS = 58;
const INPUT_AXIS_SNAP_RATIO = 3.2;
const CAMERA_IDLE_Y_ANCHOR = 0.28;
const CAMERA_DEFAULT_Y_ANCHOR = 0.54;
const SCORE_KEY = "delivery-panic-session-scores-v1";
const PROFILE_KEY = "kameposu-player-profile-v1";
const PROFILE_NAME_STYLE = "turtle-v2";
const CONTROL_MODE_KEY = "kameposu-control-mode-v1";
const BLANK_FAVICON_SRC = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const MAX_CARRY_PACKAGES = 3;
const MIN_VISIBLE_PACKAGES = 5;
const BASE_PLAYER_SPEED = 210;
const RUSH_SPEED_BONUS = 132;
const LAST_SPURT_SPEED_BONUS = 34;
const RUSH_SECONDS = 3.2;
const NEAR_MISS_SCORE = 12;
const NEAR_MISS_BAND = 20;
const HAZARD_ALERT_EXTRA = 70;
const HIT_RECOVERY_SECONDS = 1.05;
const BONUS_SCORE = 90;
const BONUS_SECONDS = 2.6;
const BONUS_TTL = 8;
const BONUS_MAX_TIME = GAME_SECONDS + 6;
const BONUS_WARNING_TTL = 2.4;
const MAX_SHAKE_PIXELS = 5;
const SUPPORT_ITEM_COUNT = 18;
const SUPPORT_ITEM_SCORE = 35;
const SHIELD_SECONDS = 6;
const MAGNET_SECONDS = 7;
const TURBO_ITEM_SECONDS = 2.1;
const FLIGHT_SECONDS = 3.8;
const ELECTRIC_STUN_SECONDS = 2.1;
const ELECTRIC_RECOVERY_SECONDS = 3.0;
const SLOW_ZONE_SECONDS = 0.8;
const OIL_SLIP_SECONDS = 0.95;
const SIGNAL_CYCLE_SECONDS = 2.8;
const SIGNAL_RED_SECONDS = 1.45;
const RAIL_CYCLE_SECONDS = 4.6;
const RAIL_CLOSED_SECONDS = 1.65;
const FESTIVAL_CYCLE_SECONDS = 5.2;
const FESTIVAL_BUSY_SECONDS = 2.25;
const RIVER_SPEED_FACTOR = 0.58;
const TAILWIND_SECONDS = 1.6;
const SLOPE_BOOST_SECONDS = 1.05;
const SLOPE_SLOW_SECONDS = 0.75;
const SHORTCUT_SCORE = 30;
const SHORTCUT_COOLDOWN_SECONDS = 4.2;
const SURPRISE_STAND_SCORE = 35;
const DELIVERY_POST_SCORE = 88;
const HELI_DELIVERY_SCORE = 105;
const HELI_DELIVERY_SECONDS = 1.15;
const MAX_FLOAT_TEXTS = 7;
const MAX_SCREEN_TEXTS = 4;
const MAX_PARTICLES = 72;
const MAP_CULL_PADDING_TILES = 2;
const MAX_CANVAS_DPR =
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ? 1.5 : 2;
const PARTICLE_QUALITY =
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ? 0.55 : 0.72;
const RANKING_API_TIMEOUT_MS = 3200;
const SCORE_SUBMISSION_MATCH_WINDOW_MS = 5 * 60 * 1000;
const MANUAL_CLOCK_SECONDS = 4.0;
const SOUND_VOLUME = 0.035;
const MANUAL_ITEM_STARTING_STOCK = {
  clock: 0,
  shield: 1,
  magnet: 1,
  turbo: 1,
  flight: 0,
};
const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
const gameColumn = document.querySelector(".game-column");
const viewport = {
  width: canvas.width,
  height: canvas.height,
  dpr: 1,
};
const startButton = document.querySelector("#startButton");
const dateLabel = document.querySelector("#dateLabel");
const timeValue = document.querySelector("#timeValue");
const timeCard = timeValue.closest("div");
const timeGaugeFill = document.querySelector("#timeGauge i");
const scoreValue = document.querySelector("#scoreValue");
const scoreCard = scoreValue.closest("div");
const scoreGoal = document.querySelector("#scoreGoal");
const scoreDelta = document.querySelector("#scoreDelta");
const deliveryValue = document.querySelector("#deliveryValue");
const comboValue = document.querySelector("#comboValue");
const comboCard = comboValue.closest("div");
const comboMeter = document.querySelector("#comboMeter");
const comboMeterDots = [...comboMeter.querySelectorAll("i")];
const countdownOverlay = document.querySelector("#countdownOverlay");
const pauseOverlay = document.querySelector("#pauseOverlay");
const resumeButton = document.querySelector("#resumeButton");
const pauseRetryButton = document.querySelector("#pauseRetryButton");
const pauseRankingButton = document.querySelector("#pauseRankingButton");
const pauseRecommendButton = document.querySelector("#pauseRecommendButton");
const homeRankingButton = document.querySelector("#homeRankingButton");
const recommendButton = document.querySelector("#recommendButton");
const startGuide = document.querySelector("#startGuide");
const guideStoryCopy = document.querySelector("#guideStoryCopy");
const guideMissionMeta = document.querySelector("#guideMissionMeta");
const guideStartButton = document.querySelector("#guideStartButton");
const itemBar = document.querySelector("#itemBar");
const manualItemButtons = [...document.querySelectorAll("[data-manual-item]")];
const menuScreen = document.querySelector("#menuScreen");
const menuTitle = document.querySelector("#menuTitle");
const menuCloseButton = document.querySelector("#menuCloseButton");
const menuRankingPanel = document.querySelector("#menuRankingPanel");
const menuRecommendPanel = document.querySelector("#menuRecommendPanel");
const recommendCards = [...document.querySelectorAll(".recommend-card[href]")];
const gameSetScreen = document.querySelector("#gameSetScreen");
const retryButton = document.querySelector("#retryButton");
const resultGrade = document.querySelector("#resultGrade");
const resultName = document.querySelector("#resultName");
const resultMissionLine = document.querySelector("#resultMissionLine");
const resultScoreHero = document.querySelector("#resultScoreHero");
const resultDeliveries = document.querySelector("#resultDeliveries");
const resultCombo = document.querySelector("#resultCombo");
const resultItemCounts = {
  clock: document.querySelector("#resultItemClock"),
  shield: document.querySelector("#resultItemShield"),
  magnet: document.querySelector("#resultItemMagnet"),
  turbo: document.querySelector("#resultItemTurbo"),
  flight: document.querySelector("#resultItemFlight"),
  star: document.querySelector("#resultItemStar"),
};
const resultMaxCarry = document.querySelector("#resultMaxCarry");
const resultCollisions = document.querySelector("#resultCollisions");
const resultNearMisses = document.querySelector("#resultNearMisses");
const resultTotalDeliveries = document.querySelector("#resultTotalDeliveries");
const resultTotalPlays = document.querySelector("#resultTotalPlays");
const resultRank = document.querySelector("#resultRank");
const resultGap = document.querySelector("#resultGap");
const resultTip = document.querySelector("#resultTip");
const resultHighlights = document.querySelector("#resultHighlights");
const resultMedals = document.querySelector("#resultMedals");
const resultCelebration = document.querySelector("#resultCelebration");
const resultBestBadge = document.querySelector("#resultBestBadge");
const resultShareBox = document.querySelector("#resultShareBox");
const resultShareButton = document.querySelector("#resultShareButton");
const resultShareImageButton = document.querySelector("#resultShareImageButton");
const resultShareStatus = document.querySelector("#resultShareStatus");
const resultSessionBest = document.querySelector("#resultSessionBest");
const resultBestDeltaLabel = document.querySelector("#resultBestDeltaLabel");
const resultBestDelta = document.querySelector("#resultBestDelta");
const resultNextMoves = document.querySelector("#resultNextMoves");
const resultBreakdown = document.querySelector("#resultBreakdown");
const resultDetailToggle = document.querySelector("#resultDetailToggle");
const resultDetailPanel = document.querySelector("#resultDetailPanel");
const todayRanking = document.querySelector("#todayRanking");
const weekRanking = document.querySelector("#weekRanking");
const homeTodayRanking = document.querySelector("#homeTodayRanking");
const homeWeekRanking = document.querySelector("#homeWeekRanking");
const resultTabButtons = [...document.querySelectorAll("[data-result-tab]")];
const resultTabPanels = {
  summary: document.querySelector("#resultSummaryPanel"),
  ranking: document.querySelector("#resultRankingPanel"),
};
const guideIconCanvases = [...document.querySelectorAll("[data-guide-icon]")];
const controlModeButtons = [...document.querySelectorAll("[data-control-mode-option]")];

applyStaticCopy();

const directionState = {
  up: false,
  down: false,
  left: false,
  right: false,
};

const directionImpulse = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,
};

const touchControl = {
  active: false,
  pointerId: null,
  originX: 0,
  originY: 0,
  currentX: 0,
  currentY: 0,
};

let controlMode = loadControlMode();

const keyToDirection = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

const shortNameAdjectives = [
  "ちびかめ",
  "まるかめ",
  "のそかめ",
  "ぽてかめ",
  "にこかめ",
  "こかめ",
  "甲羅ぽか",
  "甲羅きら",
  "甲羅もち",
  "みどり",
  "のんびり",
  "てくてく",
  "ぽすぽす",
  "ほのぼの",
  "ひなた",
  "おさんぽ",
  "ころころ",
  "ぴょこ",
  "まめ",
  "ふわ",
  "すや",
  "はりきり",
  "おっとり",
  "きらり",
  "ゆる",
  "ちょこ",
  "あさつゆ",
  "夕やけ",
  "葉っぱ",
  "小道",
  "路地",
  "甲羅",
  "しっぽ",
  "おてがみ",
  "ポスト",
  "ベル",
];

const shortNameLinks = [
  "の",
  "な",
  "と",
  "は",
  "も",
  "ぽ",
];

const shortNameNouns = [
  "甲羅便",
  "こかめ便",
  "かめポス",
  "かめっこ",
  "甲羅っこ",
  "甲羅さん",
  "おてがみ便",
  "葉っぱ便",
  "ひなた便",
  "さんぽ便",
  "ベル便",
  "ポスト便",
  "庭先かめ",
  "路地かめ",
  "坂道かめ",
  "水路かめ",
  "玄関かめ",
  "まちかめ",
  "ぽすかめ",
  "バッグかめ",
  "のそ便",
  "てく便",
  "ぽて便",
  "ぴょこ便",
  "小包かめ",
  "呼び鈴かめ",
  "朝いちかめ",
  "夕やけかめ",
  "雨あがり便",
  "道くさかめ",
  "近道かめ",
  "遠回りかめ",
  "甲羅メモ",
  "番地かめ",
];

const todayKey = getJstDateKey(new Date());
const dailyModifier = getDailyModifier(todayKey);
const map = createDailyMap(todayKey);
const weekDates = getCurrentWeekDateKeys(todayKey);
const rankingApiUrl = getRankingApiUrl();

let animationFrame = 0;
let lastFrameTime = performance.now();
let countdownUntil = 0;
let countdownDurationMs = START_COUNTDOWN_MS;
let latestResultCreatedAt = "";
let latestSharePayload = null;
let activeRun;
let currentJob;
let roadEvents;
let supportItems;
let hazards;
let audioContext = null;
let onlineRanking = createOnlineRankingState();
let canvasSizeDirty = true;
let manualItemsSignature = "";
let lastManualItemsRender = 0;

applyPreparedRun(createPreparedRun("idle"));

const dailyMission = getDailyMission(todayKey);
dateLabel.textContent = `${dailyMission.cityLabel}・${dailyModifier.label}`;
guideStoryCopy.textContent = dailyMission.summary;
if (guideMissionMeta) guideMissionMeta.textContent = `${dailyMission.conditionText} / +${dailyMission.reward}`;
setControlMode(controlMode, false);
updateManualItems();
updateHud();
renderRankings();
void loadOnlineRankings();
loadRecommendCards();
drawScene();
renderGuideIcons();

if ("ResizeObserver" in window) {
  const resizeObserver = new ResizeObserver(() => {
    canvasSizeDirty = true;
    drawScene();
  });
  resizeObserver.observe(canvas);
} else {
  window.addEventListener("resize", () => {
    canvasSizeDirty = true;
    drawScene();
  });
}

startButton.addEventListener("click", handlePrimaryButton);
guideStartButton.addEventListener("click", startCountdown);
retryButton.addEventListener("click", showRetryGuide);
resumeButton.addEventListener("click", resumeRun);
pauseRetryButton.addEventListener("click", restartFromPause);
pauseRankingButton.addEventListener("click", () => openMenuScreen("ranking"));
pauseRecommendButton.addEventListener("click", () => openMenuScreen("recommend"));
homeRankingButton.addEventListener("click", () => openMenuScreen("ranking"));
recommendButton.addEventListener("click", () => openMenuScreen("recommend"));
menuCloseButton.addEventListener("click", closeMenuScreen);
controlModeButtons.forEach((button) => {
  button.addEventListener("click", () => setControlMode(button.dataset.controlModeOption));
});
resultTabButtons.forEach((button) => {
  button.addEventListener("click", () => activateResultTab(button.dataset.resultTab));
});
resultDetailToggle.addEventListener("click", () => {
  setResultDetailExpanded(resultDetailPanel.hidden);
});
resultShareButton?.addEventListener("click", shareLatestResult);
resultShareImageButton?.addEventListener("click", saveLatestResultImage);
itemBar.addEventListener("click", (event) => {
  const button = event.target.closest("[data-manual-item]");
  if (!button || button.disabled) return;
  useManualItem(button.dataset.manualItem);
});

["copy", "cut", "paste", "selectstart", "dragstart", "contextmenu"].forEach((eventName) => {
  gameColumn.addEventListener(eventName, (event) => {
    event.preventDefault();
  });
});

const directionButtons = [...document.querySelectorAll("[data-dir]")];

window.addEventListener("keydown", (event) => {
  const direction = keyToDirection[event.code];
  if (!direction) return;
  event.preventDefault();
  setDirection(direction, true);
});

window.addEventListener("keyup", (event) => {
  const direction = keyToDirection[event.code];
  if (!direction) return;
  event.preventDefault();
  setDirection(direction, false);
});

directionButtons.forEach((button) => {
  const direction = button.dataset.dir;

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    setDirection(direction, true);
    button.setPointerCapture(event.pointerId);
  });

  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    setDirection(direction, false, button);
  });

  button.addEventListener("pointercancel", () => {
    setDirection(direction, false, button);
  });

  button.addEventListener("lostpointercapture", () => {
    setDirection(direction, false, button);
  });
});

canvas.addEventListener("pointerdown", (event) => {
  if (activeRun.status !== "running") return;
  if (controlMode !== "drag") return;
  event.preventDefault();
  const point = getCanvasPointer(event);
  touchControl.active = true;
  touchControl.pointerId = event.pointerId;
  touchControl.originX = point.x;
  touchControl.originY = point.y;
  touchControl.currentX = point.x;
  touchControl.currentY = point.y;
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  if (!touchControl.active || touchControl.pointerId !== event.pointerId) return;
  event.preventDefault();
  const point = getCanvasPointer(event);
  touchControl.currentX = point.x;
  touchControl.currentY = point.y;
});

canvas.addEventListener("pointerup", (event) => {
  if (touchControl.pointerId !== event.pointerId) return;
  event.preventDefault();
  endTouchControl();
});

canvas.addEventListener("pointercancel", endTouchControl);
canvas.addEventListener("lostpointercapture", endTouchControl);

function getCanvasPointer(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function endTouchControl() {
  touchControl.active = false;
  touchControl.pointerId = null;
}

function setDirection(direction, isPressed) {
  directionState[direction] = isPressed;
  if (isPressed) {
    directionImpulse[direction] = Math.max(directionImpulse[direction], 0.12);
  }
  syncDirectionButtons();
}

function syncDirectionButtons() {
  directionButtons.forEach((button) => {
    button.classList.toggle("is-pressed", directionState[button.dataset.dir]);
  });
}

function resetInput() {
  Object.keys(directionState).forEach((direction) => {
    directionState[direction] = false;
    directionImpulse[direction] = 0;
  });
  endTouchControl();
  syncDirectionButtons();
}

function loadControlMode() {
  try {
    const saved = localStorage.getItem(CONTROL_MODE_KEY);
    return saved === "pad" ? "pad" : "drag";
  } catch {
    return "drag";
  }
}

function setControlMode(nextMode, shouldSave = true) {
  controlMode = nextMode === "pad" ? "pad" : "drag";
  gameColumn.dataset.controlMode = controlMode;
  controlModeButtons.forEach((button) => {
    const isActive = button.dataset.controlModeOption === controlMode;
    button.setAttribute("aria-pressed", String(isActive));
  });
  if (controlMode === "pad") {
    endTouchControl();
  }

  if (!shouldSave) return;
  try {
    localStorage.setItem(CONTROL_MODE_KEY, controlMode);
  } catch {
    // 保存できない環境では、このプレイ中だけ切り替える。
  }
}

function handlePrimaryButton() {
  if (activeRun.status === "countdown" || activeRun.status === "running") {
    pauseRun();
    return;
  }

  startCountdown();
}

function startCountdown() {
  if (activeRun.status === "countdown" || activeRun.status === "running" || activeRun.status === "finishing") {
    return;
  }

  resumeAudio();
  playCue("start");

  const isRetryStart = activeRun.status === "ended" || document.body.classList.contains("show-results");
  if (activeRun.status !== "idle") {
    applyPreparedRun(createPreparedRun("idle"));
  }

  activeRun.status = "countdown";
  countdownDurationMs = isRetryStart ? RETRY_COUNTDOWN_MS : START_COUNTDOWN_MS;
  countdownUntil = performance.now() + countdownDurationMs;
  resetInput();
  startButton.disabled = false;
  startButton.textContent = COPY.buttons.rest;
  updateManualItems();
  closeMenuScreen();
  document.body.classList.remove("show-results");
  document.body.classList.remove("is-result-best");
  document.body.classList.remove("is-result-top-grade");
  document.body.classList.remove("is-rush");
  document.body.classList.remove("is-last-spurt");
  timeCard.classList.remove("is-danger");
  gameSetScreen.classList.add("is-hidden");
  gameSetScreen.scrollTop = 0;
  pauseOverlay.classList.add("is-hidden");
  startGuide.classList.add("is-hidden");
  countdownOverlay.textContent = "3";
  countdownOverlay.classList.remove("is-hidden");
  countdownOverlay.classList.remove("is-finish");

  if (!animationFrame) {
    lastFrameTime = performance.now();
    animationFrame = requestAnimationFrame(tick);
  }
}

function showRetryGuide() {
  if (activeRun.status === "countdown" || activeRun.status === "running" || activeRun.status === "finishing") {
    return;
  }

  applyPreparedRun(createPreparedRun("idle"));
  resetInput();
  closeMenuScreen();
  document.body.classList.remove("show-results");
  document.body.classList.remove("is-result-best");
  document.body.classList.remove("is-result-top-grade");
  document.body.classList.remove("is-rush");
  document.body.classList.remove("is-last-spurt");
  timeCard.classList.remove("is-danger");
  gameSetScreen.classList.add("is-hidden");
  gameSetScreen.scrollTop = 0;
  pauseOverlay.classList.add("is-hidden");
  countdownOverlay.classList.add("is-hidden");
  countdownOverlay.classList.remove("is-finish");
  startGuide.classList.remove("is-hidden");
  startButton.disabled = false;
  startButton.textContent = COPY.buttons.todayDelivery;
  updateManualItems();
  updateHud();
  drawScene();
  window.scrollTo(0, 0);
}

function createPreparedRun(status = "idle") {
  const run = createFreshRun(status);
  const previousRun = activeRun;
  activeRun = run;
  const job = createTimedJob(run.rng);
  run.bonus = createBonus(run.rng, job, run.player);
  const events = createRoadEvents(map, run.rng, job);
  const items = createSupportItems(map, run.rng, job, run.player, events);
  const movingHazards = createHazards(map);
  activeRun = previousRun;

  return {
    run,
    job,
    roadEvents: events,
    supportItems: items,
    hazards: movingHazards,
  };
}

function applyPreparedRun(prepared) {
  activeRun = prepared.run;
  currentJob = prepared.job;
  roadEvents = prepared.roadEvents;
  supportItems = prepared.supportItems;
  hazards = prepared.hazards;
}

function openMenuScreen(panelName) {
  if (activeRun.status === "countdown" || activeRun.status === "running" || activeRun.status === "finishing") return;

  const isRecommend = panelName === "recommend";
  menuTitle.textContent = isRecommend ? COPY.ui.recommendations : COPY.ui.ranking;
  menuRankingPanel.hidden = isRecommend;
  menuRecommendPanel.hidden = !isRecommend;
  renderRankings();
  document.body.classList.add("show-menu");
  menuScreen.classList.remove("is-hidden");
  gameSetScreen.classList.add("is-hidden");
  window.scrollTo(0, 0);
}

function closeMenuScreen() {
  document.body.classList.remove("show-menu");
  menuScreen.classList.add("is-hidden");
}

function applyStaticCopy() {
  document.querySelectorAll("[data-copy]").forEach((element) => {
    const value = getCopyValue(element.dataset.copy);
    if (typeof value === "string") element.textContent = value;
  });

  document.querySelectorAll("[data-copy-aria-label]").forEach((element) => {
    const value = getCopyValue(element.dataset.copyAriaLabel);
    if (typeof value === "string") element.setAttribute("aria-label", value);
  });
}

function getCopyValue(path) {
  if (!path) return "";
  return path.split(".").reduce((current, key) => current?.[key], COPY);
}

function copyText(template, values = {}) {
  return String(template ?? "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function loadRecommendCards() {
  const cardGroups = new Map();
  recommendCards.forEach((card) => {
    const image = card.querySelector(".recommend-favicon");
    if (image) clearRecommendFavicon(image);

    const pageUrl = card.href;
    if (!pageUrl) return;
    const group = cardGroups.get(pageUrl) ?? [];
    group.push(card);
    cardGroups.set(pageUrl, group);
  });

  cardGroups.forEach((cards, pageUrl) => {
    resolveRecommendPageMeta(pageUrl).then((meta) => {
      cards.forEach((card) => applyRecommendPageMeta(card, meta));
    });
  });
}

async function resolveRecommendPageMeta(pageUrl) {
  try {
    const response = await fetchWithTimeout(pageUrl, { cache: "no-cache" }, 4500);
    if (!response.ok) return null;

    const html = await response.text();
    const page = new DOMParser().parseFromString(html, "text/html");
    const baseUrl = response.url || pageUrl;
    return {
      iconUrl: resolveRecommendIconUrl(page, baseUrl),
      title: extractRecommendTitle(page),
      description: extractRecommendDescription(page),
      genre: extractRecommendGenre(page),
    };
  } catch {
    return null;
  }
}

function resolveRecommendIconUrl(page, baseUrl) {
  try {
    const iconLink = findPreferredFaviconLink(page);
    const href = iconLink?.getAttribute("href")?.trim();
    if (!href) return "";
    if (href.startsWith("data:")) return href;

    const iconUrl = new URL(href, baseUrl);
    iconUrl.searchParams.set("favicon_refresh", String(Date.now()));
    return iconUrl.href;
  } catch {
    return "";
  }
}

function extractRecommendTitle(page) {
  const jsonLd = getJsonLdObjects(page);
  return (
    findJsonLdText(jsonLd, ["name"])
    || getMetaContent(page, [
      "meta[name='application-name']",
      "meta[name='apple-mobile-web-app-title']",
      "meta[property='og:site_name']",
    ])
    || stripRecommendTitle(getMetaContent(page, [
      "meta[property='og:title']",
      "meta[name='twitter:title']",
    ]) || page.querySelector("title")?.textContent)
  );
}

function extractRecommendDescription(page) {
  const jsonLd = getJsonLdObjects(page);
  return pickBriefRecommendText([
    getMetaContent(page, ["meta[property='og:description']"]),
    getMetaContent(page, ["meta[name='twitter:description']"]),
    getMetaContent(page, ["meta[name='description']"]),
    findJsonLdText(jsonLd, ["description"]),
  ], 46);
}

function extractRecommendGenre(page) {
  const jsonLd = getJsonLdObjects(page);
  for (const item of jsonLd) {
    const [genre] = toRecommendTextList(item.genre);
    if (genre) return genre;
  }
  return "";
}

function applyRecommendPageMeta(card, meta) {
  const image = card.querySelector(".recommend-favicon");
  if (image) setRecommendFavicon(image, meta?.iconUrl || "");

  const title = trimRecommendText(meta?.title, 22);
  const description = trimRecommendText(meta?.description, 46);
  const genre = trimRecommendText(meta?.genre, 14);

  card.querySelector("em").textContent = genre;
  card.querySelector("strong").textContent = title;
  card.querySelector("small").textContent = description;
  card.classList.toggle("is-empty-meta", !title && !description && !genre);

  card.setAttribute(
    "aria-label",
    title ? `${COPY.ui.recommendCardAria}: ${title}` : COPY.ui.recommendCardAria,
  );
}

function getMetaContent(page, selectors) {
  for (const selector of selectors) {
    const value = page.querySelector(selector)?.getAttribute("content")?.trim();
    if (value) return value;
  }
  return "";
}

function getJsonLdObjects(page) {
  const objects = [];
  page.querySelectorAll("script[type='application/ld+json']").forEach((script) => {
    try {
      collectJsonLdObjects(JSON.parse(script.textContent || ""), objects);
    } catch {
      // Broken metadata should not break the game.
    }
  });
  return objects;
}

function collectJsonLdObjects(value, objects) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectJsonLdObjects(item, objects));
    return;
  }

  if (!value || typeof value !== "object") return;
  objects.push(value);
  if (Array.isArray(value["@graph"])) {
    value["@graph"].forEach((item) => collectJsonLdObjects(item, objects));
  }
}

function findJsonLdText(objects, keys) {
  for (const object of objects) {
    for (const key of keys) {
      const [value] = toRecommendTextList(object[key]);
      if (value) return value;
    }
  }
  return "";
}

function toRecommendTextList(value) {
  if (Array.isArray(value)) return value.flatMap((item) => toRecommendTextList(item));
  if (typeof value === "string" || typeof value === "number") {
    const text = normalizeRecommendText(String(value));
    return text ? [text] : [];
  }
  if (value && typeof value === "object") {
    return toRecommendTextList(value.name);
  }
  return [];
}

function stripRecommendTitle(text, options = {}) {
  const normalized = normalizeRecommendText(text);
  if (!normalized) return "";
  const parts = normalized.split(/\s*[|｜\-–—]\s*/).filter(Boolean);
  if (options.keepSubtitle && parts.length > 1) return parts.slice(1).join(" ");
  return parts[0] || normalized;
}

function getRankingApiUrl() {
  const fromWindow = typeof window.KAMEPOSU_RANKING_API_URL === "string" ? window.KAMEPOSU_RANKING_API_URL : "";
  const fromMeta = document.querySelector('meta[name="kameposu-ranking-api"]')?.getAttribute("content") ?? "";
  return (fromWindow || fromMeta).trim().replace(/\/+$/, "");
}

function createOnlineRankingState() {
  return {
    dateKey: "",
    today: null,
    week: null,
  };
}

function pickBriefRecommendText(values, maxLength) {
  const normalizedValues = values
    .map((value) => normalizeRecommendText(value))
    .filter(Boolean);
  return trimRecommendText(
    normalizedValues.find((value) => value.length <= maxLength) || normalizedValues[0] || "",
    maxLength,
  );
}

function normalizeRecommendText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function trimRecommendText(text, maxLength) {
  const normalized = normalizeRecommendText(text);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 1))}…`;
}

function findPreferredFaviconLink(page) {
  const links = [...page.querySelectorAll("link[rel][href]")].filter((link) => {
    const tokens = link.relList ? [...link.relList] : link.rel.toLowerCase().split(/\s+/);
    return tokens.includes("icon") || tokens.includes("apple-touch-icon");
  });

  return (
    links.find((link) => link.type === "image/svg+xml")
    ?? links.find((link) => {
      const tokens = link.relList ? [...link.relList] : link.rel.toLowerCase().split(/\s+/);
      return tokens.includes("icon");
    })
    ?? links[0]
  );
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function setRecommendFavicon(image, iconUrl) {
  if (!iconUrl) {
    clearRecommendFavicon(image);
    return;
  }

  image.classList.add("is-empty");
  image.onload = () => {
    image.classList.remove("is-empty");
    image.closest(".recommend-card-art")?.classList.remove("is-empty");
  };
  image.onerror = () => {
    clearRecommendFavicon(image);
  };
  image.src = iconUrl;
}

function clearRecommendFavicon(image) {
  image.onload = null;
  image.onerror = null;
  image.classList.add("is-empty");
  image.src = BLANK_FAVICON_SRC;
  image.closest(".recommend-card-art")?.classList.add("is-empty");
}

function pauseRun() {
  if (activeRun.status !== "countdown" && activeRun.status !== "running") return;

  activeRun.pausedStatus = activeRun.status;
  activeRun.pausedCountdownRemaining = activeRun.status === "countdown" ? Math.max(0, countdownUntil - performance.now()) : 0;
  activeRun.status = "paused";
  resetInput();
  pauseOverlay.classList.remove("is-hidden");
  pauseOverlay.scrollTop = 0;
  startButton.disabled = true;
  updateManualItems();
}

function resumeRun() {
  if (activeRun.status !== "paused") return;

  const nextStatus = activeRun.pausedStatus === "countdown" ? "countdown" : "running";
  activeRun.status = nextStatus;
  if (nextStatus === "countdown") {
    countdownUntil = performance.now() + Math.max(1, activeRun.pausedCountdownRemaining ?? COUNTDOWN_STEP_MS);
  } else {
    countdownOverlay.classList.add("is-hidden");
    startGuide.classList.add("is-hidden");
  }

  pauseOverlay.classList.add("is-hidden");
  startButton.disabled = false;
  startButton.textContent = COPY.buttons.rest;
  updateManualItems();

  if (!animationFrame) {
    lastFrameTime = performance.now();
    animationFrame = requestAnimationFrame(tick);
  }
}

function restartFromPause() {
  if (activeRun.status !== "paused") return;

  pauseOverlay.classList.add("is-hidden");
  activeRun.status = "ended";
  startCountdown();
}

function createFreshRun(status = "countdown") {
  const runSeed = hashString(`${todayKey}:${createRunId()}`);
  const startCell = map.startCell;

  return {
    status,
    rng: mulberry32(runSeed),
    randomName: getRunPlayerName(Math.random),
    score: 0,
    scoreDelta: 0,
    scorePulse: 0,
    scoreBreakdown: createEmptyScoreBreakdown(),
    bestTarget: getSessionBestScore(todayKey),
    scoreMilestones: createScoreMilestones(),
    deliveries: 0,
    combo: 0,
    maxCombo: 0,
    collisions: 0,
    bonuses: 0,
    supportPickups: 0,
    itemPickups: createEmptyItemPickups(),
    itemDescriptionSeen: {},
    manualUses: 0,
    manualItems: createManualItemStock(),
    dailyMissionRewarded: false,
    nearMisses: 0,
    maxCarry: 0,
    secondHalfAnnounced: false,
    lastSpurtAnnounced: false,
    timeLeft: GAME_SECONDS,
    carrying: false,
    carriedPackages: [],
    bonus: null,
    shield: 0,
    magnet: 0,
    flight: 0,
    stunned: 0,
    slow: 0,
    slip: 0,
    slide: { x: 0, y: -1 },
    eventCooldowns: createEventCooldowns(),
    rush: 0,
    warp: null,
    heliDelivery: null,
    targetFocus: null,
    invulnerable: 0,
    riverHintCooldown: 0,
    flash: 0,
    shake: 0,
    shakeDuration: 0,
    shakePower: 0,
    floatTexts: [],
    screenTexts: [],
    particles: [],
    player: {
      x: centerOf(startCell.col),
      y: centerOf(startCell.row),
      speed: BASE_PLAYER_SPEED,
      facing: 0,
    },
  };
}

function tick(now) {
  const dt = Math.min((now - lastFrameTime) / 1000, 0.04);
  lastFrameTime = now;

  if (activeRun.status === "countdown") {
    updateCountdown(now);
  }

  if (activeRun.status === "running") {
    updateRun(dt);
  }

  drawScene();
  updateHud();

  if (activeRun.status === "idle" || activeRun.status === "ended" || activeRun.status === "paused") {
    animationFrame = 0;
    return;
  }

  animationFrame = requestAnimationFrame(tick);
}

function updateCountdown(now) {
  const remaining = countdownUntil - now;

  if (remaining <= 0) {
    activeRun.status = "running";
    countdownOverlay.classList.add("is-hidden");
    startGuide.classList.add("is-hidden");
    startButton.disabled = false;
    startButton.textContent = COPY.buttons.rest;
    updateManualItems();
    return;
  }

  const elapsed = countdownDurationMs - Math.max(0, remaining);
  const stepIndex = clamp(Math.floor(elapsed / COUNTDOWN_STEP_MS), 0, 3);
  const label = ["3", "2", "1", "配達へ"][stepIndex];
  countdownOverlay.textContent = label;
}

function updateRun(dt) {
  activeRun.timeLeft = Math.max(0, activeRun.timeLeft - dt);
  maybeTriggerSecondHalfCue();
  maybeTriggerLastSpurtCue();
  const wasFlying = activeRun.flight > 0;
  activeRun.rush = Math.max(0, activeRun.rush - dt);
  activeRun.shield = Math.max(0, activeRun.shield - dt);
  activeRun.magnet = Math.max(0, activeRun.magnet - dt);
  activeRun.flight = Math.max(0, activeRun.flight - dt);
  if (wasFlying && activeRun.flight <= 0) {
    resolveFlightLanding();
  }
  activeRun.stunned = Math.max(0, activeRun.stunned - dt);
  activeRun.slow = Math.max(0, activeRun.slow - dt);
  activeRun.slip = Math.max(0, activeRun.slip - dt);
  activeRun.invulnerable = Math.max(0, activeRun.invulnerable - dt);
  activeRun.riverHintCooldown = Math.max(0, activeRun.riverHintCooldown - dt);
  if (activeRun.targetFocus) {
    activeRun.targetFocus.ttl = Math.max(0, activeRun.targetFocus.ttl - dt);
    if (activeRun.targetFocus.ttl <= 0) activeRun.targetFocus = null;
  }
  activeRun.flash = Math.max(0, activeRun.flash - dt);
  activeRun.shake = Math.max(0, activeRun.shake - dt);
  updateScorePulse(dt);
  updateBonus(dt);
  Object.keys(directionImpulse).forEach((direction) => {
    directionImpulse[direction] = Math.max(0, directionImpulse[direction] - dt);
  });

  updateRoadEvents(dt);
  updateHazards(dt);
  updateEffects(dt);
  if (updateWarp(dt)) {
    return;
  }
  movePlayer(dt);
  checkTerrainEffects();
  checkRoadEvents();
  checkPackageAndDestination();
  checkBonusPickup();
  checkSupportItemPickup();
  checkHazardCollision();
  checkNearMissBonus();

  if (activeRun.timeLeft <= 0) {
    finishRun();
  }
}

function movePlayer(dt) {
  if (activeRun.stunned > 0) return;

  const input = getInputVector();
  const isSlipping = activeRun.slip > 0;
  if (!input.active && !isSlipping) return;

  let moveX = input.active ? input.x : 0;
  let moveY = input.active ? input.y : 0;

  if (isSlipping) {
    const slideWeight = clamp(activeRun.slip / OIL_SLIP_SECONDS, 0, 1) * 0.74;
    const controlWeight = input.active ? 1 - slideWeight : 0;
    moveX = moveX * controlWeight + activeRun.slide.x * slideWeight;
    moveY = moveY * controlWeight + activeRun.slide.y * slideWeight;
  }

  const length = Math.hypot(moveX, moveY);
  if (length === 0) return;

  moveX /= length;
  moveY /= length;

  const strengthScale = input.active ? 0.58 + input.strength * 0.42 : 1;
  const speed = getPlayerSpeed() * dt * (isSlipping ? 1.04 : 1) * strengthScale;
  const steps = Math.max(1, Math.ceil(speed / MAX_MOVE_STEP_PIXELS));
  const stepSpeed = speed / steps;
  activeRun.player.facing = Math.atan2(moveY, moveX);

  for (let index = 0; index < steps; index += 1) {
    const moved = movePlayerStep(moveX, moveY, stepSpeed);
    if (!moved) break;
  }
}

function movePlayerStep(moveX, moveY, speed) {
  const player = activeRun.player;
  const currentX = player.x;
  const currentY = player.y;
  const nextX = currentX + moveX * speed;
  const nextY = currentY + moveY * speed;

  if (isWalkable(nextX, nextY, PLAYER_RADIUS)) {
    player.x = nextX;
    player.y = nextY;
    return true;
  }

  const slideMoves = getSlideMoveCandidates(currentX, currentY, moveX, moveY, speed);
  const moved = slideMoves.some((candidate) => {
    if (!isWalkable(candidate.x, candidate.y, PLAYER_RADIUS)) return false;
    player.x = candidate.x;
    player.y = candidate.y;
    return true;
  });

  return moved || applyRoadCenterAssist(speed);
}

function getSlideMoveCandidates(x, y, moveX, moveY, speed) {
  const candidates = [];
  const hasX = Math.abs(moveX) > 0.08;
  const hasY = Math.abs(moveY) > 0.08;
  const partialX = hasX ? x + moveX * speed : x;
  const partialY = hasY ? y + moveY * speed : y;
  const gentleX = hasX ? x + moveX * speed * 0.62 : x;
  const gentleY = hasY ? y + moveY * speed * 0.62 : y;
  const tinyX = hasX ? x + moveX * speed * 0.34 : x;
  const tinyY = hasY ? y + moveY * speed * 0.34 : y;

  const gentleDiagonalMove = { x: gentleX, y: gentleY };
  const tinyDiagonalMove = { x: tinyX, y: tinyY };
  const xMove = { x: partialX, y };
  const yMove = { x, y: partialY };
  const gentleXMove = { x: gentleX, y };
  const gentleYMove = { x, y: gentleY };
  const tinyXMove = { x: tinyX, y };
  const tinyYMove = { x, y: tinyY };

  if (Math.abs(moveX) >= Math.abs(moveY)) {
    candidates.push(gentleDiagonalMove, xMove, yMove, gentleXMove, gentleYMove, tinyDiagonalMove, tinyXMove, tinyYMove);
  } else {
    candidates.push(gentleDiagonalMove, yMove, xMove, gentleYMove, gentleXMove, tinyDiagonalMove, tinyYMove, tinyXMove);
  }

  return candidates;
}

function applyRoadCenterAssist(speed) {
  const player = activeRun.player;
  const cell = getPlayerCell(player);
  if (!isRoadCell(cell)) return false;

  const hasLeft = map.road[cell.row]?.[cell.col - 1];
  const hasRight = map.road[cell.row]?.[cell.col + 1];
  const hasUp = map.road[cell.row - 1]?.[cell.col];
  const hasDown = map.road[cell.row + 1]?.[cell.col];
  const centerX = centerOf(cell.col);
  const centerY = centerOf(cell.row);
  const nudge = speed * 1.05;
  const candidates = [];

  const centeredX = moveToward(player.x, centerX, nudge);
  const centeredY = moveToward(player.y, centerY, nudge);

  if ((hasLeft || hasRight) && !hasUp && !hasDown) {
    candidates.push({ x: player.x, y: centeredY });
  } else if ((hasUp || hasDown) && !hasLeft && !hasRight) {
    candidates.push({ x: centeredX, y: player.y });
  } else {
    candidates.push({ x: centeredX, y: player.y }, { x: player.x, y: centeredY }, { x: centeredX, y: centeredY });
  }

  return candidates.some((candidate) => {
    if (!isWalkable(candidate.x, candidate.y, PLAYER_RADIUS)) return false;
    player.x = candidate.x;
    player.y = candidate.y;
    return true;
  });
}

function getInputVector() {
  let dx = 0;
  let dy = 0;
  const touchVector = getTouchVector();

  if (directionState.left || directionImpulse.left > 0) dx -= 1;
  if (directionState.right || directionImpulse.right > 0) dx += 1;
  if (directionState.up || directionImpulse.up > 0) dy -= 1;
  if (directionState.down || directionImpulse.down > 0) dy += 1;
  dx += touchVector.x;
  dy += touchVector.y;

  const shaped = shapeInputVector(dx, dy);
  dx = shaped.x;
  dy = shaped.y;

  const length = Math.hypot(dx, dy);
  if (length === 0) {
    return { x: 0, y: 0, active: false, strength: 0 };
  }

  return {
    x: dx / length,
    y: dy / length,
    active: true,
    strength: clamp(length, 0, 1),
  };
}

function shapeInputVector(dx, dy) {
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);

  if (absX > 0 && absY > 0) {
    if (absX >= absY * INPUT_AXIS_SNAP_RATIO) return { x: dx, y: 0 };
    if (absY >= absX * INPUT_AXIS_SNAP_RATIO) return { x: 0, y: dy };
  }

  return { x: dx, y: dy };
}

function getTouchVector() {
  if (!touchControl.active) return { x: 0, y: 0 };

  const dx = touchControl.currentX - touchControl.originX;
  const dy = touchControl.currentY - touchControl.originY;
  const distance = Math.hypot(dx, dy);

  if (distance < TOUCH_DEADZONE_PIXELS) return { x: 0, y: 0 };

  const strength = clamp(
    (distance - TOUCH_DEADZONE_PIXELS) / (TOUCH_FULL_TILT_PIXELS - TOUCH_DEADZONE_PIXELS),
    0,
    1,
  );

  return {
    x: (dx / distance) * strength,
    y: (dy / distance) * strength,
  };
}

function getPlayerSpeed() {
  const comboBonus = Math.min(activeRun.combo, 6) * 7;
  const rushBonus = activeRun.rush > 0 ? RUSH_SPEED_BONUS * getRushControlSpeedFactor() : 0;
  const flightBonus = activeRun.flight > 0 ? 32 : 0;
  const lastSpurtBonus = isLastSpurtActive() ? LAST_SPURT_SPEED_BONUS : 0;
  const slowPenalty = activeRun.slow > 0 ? 78 : 0;
  const stunPenalty = activeRun.stunned > 0 ? 999 : 0;
  const baseSpeed = Math.max(0, activeRun.player.speed + comboBonus + rushBonus + flightBonus + lastSpurtBonus - slowPenalty - stunPenalty);
  return baseSpeed * getTerrainSpeedFactor();
}

function getTerrainSpeedFactor() {
  if (activeRun.flight > 0) return 1;
  const cell = getPlayerCell(activeRun.player);
  if (isSlowRiverCell(cell)) return RIVER_SPEED_FACTOR;
  return 1;
}

function checkTerrainEffects() {
  if (activeRun.status !== "running" || activeRun.flight > 0 || activeRun.riverHintCooldown > 0) return;

  const cell = getPlayerCell(activeRun.player);
  if (!isSlowRiverCell(cell)) return;

  activeRun.riverHintCooldown = 1.6;
  addFloatText(activeRun.player.x, activeRun.player.y - 34, "川はゆっくり", "#dffcff", 0.72, -22);
}

function getRushControlSpeedFactor() {
  if (activeRun.flight > 0) return 1;

  const cell = getPlayerCell(activeRun.player);
  if (!isRoadCell(cell)) return 0.78;
  if (isIntersectionCell(map, cell)) return 0.78;
  if (isNearIntersectionCell(map, cell)) return 0.86;
  return 1;
}

function isLastSpurtActive() {
  return activeRun.status === "running" && activeRun.timeLeft > 0 && activeRun.timeLeft <= LAST_SPURT_SECONDS;
}

function maybeTriggerSecondHalfCue() {
  if (activeRun.secondHalfAnnounced || activeRun.timeLeft > SECOND_HALF_SECONDS) return;

  activeRun.secondHalfAnnounced = true;
  activeRun.rush = Math.max(activeRun.rush, 0.8);
  addFloatText(activeRun.player.x, activeRun.player.y - 74, COPY.itemText.secondHalf, "#f0bf39", 1.05, -36);
  createBurst(activeRun.player.x, activeRun.player.y, "#f0bf39", 14);
  triggerShake(1.3, 0.14);
  vibrate([12, 18, 12]);
  playCue("half");
}

function maybeTriggerLastSpurtCue() {
  if (activeRun.lastSpurtAnnounced || activeRun.timeLeft > LAST_SPURT_SECONDS) return;

  activeRun.lastSpurtAnnounced = true;
  activeRun.flash = Math.max(activeRun.flash, 0.18);
  addFloatText(activeRun.player.x, activeRun.player.y - 78, COPY.itemText.lastSpurt, "#e85d56", 1.15, -34, 17);
  addScreenText(COPY.itemText.lastSpurt, "lastSpurt", 1.15, 0.28);
  createBurst(activeRun.player.x, activeRun.player.y, "#f0bf39", 18);
  triggerShake(1.8, 0.16);
  vibrate([18, 18, 18]);
  playCue("lastSpurt");
}

function getFastTargetSeconds(job) {
  return 2.2 + job.distance * 0.16;
}

function getFastDeliveryPreview() {
  if (!activeRun.carrying) return { bonus: 0, secondsLeft: 0 };

  const elapsed = elapsedRunTime();
  const legStart = currentJob.pickupAt ?? currentJob.startedAt ?? elapsed;
  const distance = getCarriedDistanceTotal() || currentJob.distance;
  const secondsLeft = getFastTargetSeconds({ ...currentJob, distance }) - (elapsed - legStart);
  return {
    bonus: Math.max(0, Math.round(secondsLeft * 45)),
    secondsLeft: Math.max(0, secondsLeft),
  };
}

function getBonusHudHint() {
  if (!activeRun.bonus) return null;

  const blocks = Math.max(1, Math.ceil(distanceToCell(activeRun.player, activeRun.bonus.cell) / TILE));
  return {
    blocks,
    seconds: Math.max(1, Math.ceil(activeRun.bonus.ttl)),
    isWarning: activeRun.bonus.ttl <= BONUS_WARNING_TTL,
  };
}

function createEmptyScoreBreakdown() {
  return {
    pickup: 0,
    delivery: 0,
    distance: 0,
    combo: 0,
    fast: 0,
    multi: 0,
    bonus: 0,
    event: 0,
    near: 0,
    penalty: 0,
  };
}

function createEmptyItemPickups() {
  return {
    clock: 0,
    shield: 0,
    magnet: 0,
    turbo: 0,
    flight: 0,
    star: 0,
  };
}

function createEventCooldowns() {
  return {
    oil: 0,
    roadwork: 0,
    rail: 0,
    signal: 0,
    festival: 0,
    slope: 0,
    slow: 0,
    shortcut: 0,
    stand: 0,
    post: 0,
    heli: 0,
    tailwind: 0,
    electric: 0,
  };
}

function awardScore(points, bucket = null) {
  const before = activeRun.score;
  activeRun.score = Math.max(0, activeRun.score + points);
  const actualDelta = activeRun.score - before;
  activeRun.scoreDelta = actualDelta;
  activeRun.scorePulse = 0.62;
  addScoreBreakdown(bucket, actualDelta);
  checkScoreMilestones(before, activeRun.score);
}

function awardScoreParts(parts) {
  const validParts = parts.filter((part) => part.points !== 0);
  const total = validParts.reduce((sum, part) => sum + part.points, 0);
  if (total === 0) return;

  activeRun.score += total;
  activeRun.scoreDelta = total;
  activeRun.scorePulse = 0.62;
  validParts.forEach((part) => addScoreBreakdown(part.bucket, part.points));
  checkScoreMilestones(activeRun.score - total, activeRun.score);
}

function addScoreBreakdown(bucket, points) {
  if (!bucket || points === 0) return;
  activeRun.scoreBreakdown[bucket] = (activeRun.scoreBreakdown[bucket] ?? 0) + points;
}

function updateScorePulse(dt) {
  activeRun.scorePulse = Math.max(0, activeRun.scorePulse - dt);
  if (activeRun.scorePulse <= 0) {
    activeRun.scoreDelta = 0;
  }
}

function getScoreDeltaLabel() {
  if (activeRun.scorePulse <= 0 || activeRun.scoreDelta === 0) return "";
  const prefix = activeRun.scoreDelta > 0 ? "+" : "-";
  return `${prefix}${formatNumber(Math.abs(activeRun.scoreDelta))}`;
}

function createScoreMilestones() {
  const best = getSessionBestScore(todayKey);
  const scores = getTodayScores(todayKey);

  return {
    best,
    top10: scores[9]?.score ?? 0,
    top3: scores[2]?.score ?? 0,
    first: scores[0]?.score ?? 0,
    hit: {
      best: false,
      top10: false,
      top3: false,
      first: false,
    },
  };
}

function checkScoreMilestones(before, after) {
  if (activeRun.status !== "running" || after <= before) return;

  const milestones = activeRun.scoreMilestones;
  const hits = [
    {
      key: "best",
      target: milestones.best,
      label: "自己ベスト",
      color: "#12d8df",
      priority: 20,
    },
    {
      key: "first",
      target: milestones.first,
      label: "暫定1位",
      color: "#f0bf39",
      priority: 50,
    },
    {
      key: "top3",
      target: milestones.top3,
      label: "3位以内",
      color: "#f0bf39",
      priority: 40,
    },
    {
      key: "top10",
      target: milestones.top10,
      label: "10位以内",
      color: "#12d8df",
      priority: 30,
    },
  ].filter((milestone) => shouldTriggerScoreMilestone(milestone, before, after, milestones.hit));

  if (hits.length === 0) return;

  hits.forEach((hit) => {
    milestones.hit[hit.key] = true;
  });

  const hit = hits.sort((a, b) => b.priority - a.priority)[0];
  const { x, y } = activeRun.player;
  addFloatText(x, y - 76, hit.label, hit.color, 1.15, -38);
  createBurst(x, y, hit.color, 18);
  triggerShake(2.4, 0.16);
  vibrate([12, 20, 12]);
}

function shouldTriggerScoreMilestone(milestone, before, after, hitState) {
  return milestone.target > 0 && !hitState[milestone.key] && before <= milestone.target && after > milestone.target;
}

function checkPackageAndDestination() {
  const player = activeRun.player;
  const pickupRadius = getPickupRadius();

  if (canPickMorePackages()) {
    const pickedChoice = getAvailablePickupChoices(currentJob).find((choice) => distanceToCell(player, choice.cell) < pickupRadius);
    if (pickedChoice) {
      pickupPackage(pickedChoice);
    }
  }

  if (activeRun.carrying && distanceToCell(player, currentJob.destination) < getDestinationRadius()) {
    const destination = toCanvasPoint(currentJob.destination);
    const elapsed = elapsedRunTime();
    const legSeconds = elapsed - (currentJob.pickupAt ?? currentJob.startedAt ?? elapsed);
    const carried = [...activeRun.carriedPackages];
    const cargoCount = Math.max(1, carried.length);
    const distanceTotal = getCarriedDistanceTotal();
    const targetSeconds = getFastTargetSeconds({ ...currentJob, distance: distanceTotal });
    const travelBonus = Math.round(distanceTotal * 9);
    const comboBefore = activeRun.combo;
    const comboBonus = carried.reduce((sum, _package, index) => sum + (comboBefore + index) * 35, 0);
    const fastBonus = Math.max(0, Math.round((targetSeconds - legSeconds) * 45)) * cargoCount;
    const multiBonus = getMultiCarryBonus(cargoCount);
    activeRun.deliveries += cargoCount;
    activeRun.combo += cargoCount;
    activeRun.maxCombo = Math.max(activeRun.maxCombo, activeRun.combo);
    awardScoreParts([
      { bucket: "delivery", points: 130 * cargoCount },
      { bucket: "distance", points: travelBonus },
      { bucket: "combo", points: comboBonus },
      { bucket: "fast", points: fastBonus },
      { bucket: "multi", points: multiBonus },
    ]);
    const gained = 130 * cargoCount + travelBonus + comboBonus + fastBonus + multiBonus;
    activeRun.carriedPackages = [];
    activeRun.carrying = false;
    activeRun.flash = 0.18;
    const deliveryLabel = cargoCount > 1
      ? copyText(COPY.itemText.multiDeliveryComplete, { count: cargoCount, score: gained })
      : copyText(COPY.itemText.deliveryComplete, { score: gained });
    addFloatText(destination.x, destination.y - 30, deliveryLabel, "#ffffff", 1.12, -34, 15);
    addScreenText(deliveryLabel, cargoCount > 1 ? "multi" : "delivery", 0.92, 0.22);
    createBurst(destination.x, destination.y, "#e85d56", 16 + cargoCount * 4);
    triggerShake(2.0, 0.18);
    vibrate(28);
    playCue("delivery");

    if (fastBonus > 0) {
      addFloatText(player.x, player.y - 48, copyText(COPY.itemText.fastBonus, { score: fastBonus }), "#12d8df");
    }

    if (multiBonus > 0) {
      addFloatText(player.x, player.y - 66, copyText(COPY.itemText.multiBonus, { score: multiBonus }), "#f0bf39");
    }

    announceComboProgress(comboBefore);

    checkDailyMissionProgress(destination);
    currentJob = createTimedJob(activeRun.rng, currentJob.destination);
    activeRun.bonus = createBonus(activeRun.rng, currentJob, activeRun.player);
    setTargetFocus("pickup", getPreferredPickupChoice()?.cell ?? currentJob.pickup, 1.8);
  }
}

function announceComboProgress(comboBefore, origin = activeRun.player) {
  if (activeRun.combo >= 2) {
    const comboColor = activeRun.combo >= 3 ? "#f0bf39" : "#12d8df";
    const comboLabel = copyText(COPY.itemText.comboBanner, { count: activeRun.combo });
    addFloatText(origin.x, origin.y - 86, comboLabel, comboColor, 1.0, -32, activeRun.combo >= 3 ? 18 : 16);
    addScreenText(comboLabel, activeRun.combo >= 3 ? "comboSpecial" : "combo", activeRun.combo >= 3 ? 1.15 : 0.95, 0.33);
    if (activeRun.combo >= 3) {
      createBurst(origin.x, origin.y, comboColor, 18);
      triggerShake(2.4, 0.18);
      vibrate([16, 18, 16]);
    }
  }

  if (Math.floor(comboBefore / 3) < Math.floor(activeRun.combo / 3)) {
    activeRun.rush = Math.max(activeRun.rush, RUSH_SECONDS);
    addFloatText(origin.x, origin.y - 62, COPY.itemText.tailwindOn, "#12d8df", 0.9, -32, 14);
    addScreenText(COPY.itemText.tailwindOn, "boost", 0.95, 0.42);
    createBurst(origin.x, origin.y, "#12d8df", 16);
    triggerShake(2.1, 0.18);
    vibrate([18, 20, 18]);
  }
}

function pickupPackage(choice) {
  const key = cellKey(choice.cell);
  currentJob.pickedKeys = [...(currentJob.pickedKeys ?? []), key];
  currentJob.pickup = choice.cell;
  currentJob.distance = getCarriedDistanceTotal() + choice.distance;
  currentJob.pickupChoiceLabel = choice.label;
  const pickup = toCanvasPoint(choice.cell);
  const optionBonus = getPickupOptionBonus(choice);
  const carriedPackage = {
    cell: choice.cell,
    distance: choice.distance,
    bonus: optionBonus,
    label: choice.label,
    pickedAt: elapsedRunTime(),
  };
  activeRun.carriedPackages.push(carriedPackage);
  activeRun.carrying = true;
  activeRun.maxCarry = Math.max(activeRun.maxCarry, getCarriedCount());
  if (currentJob.pickupAt == null) {
    currentJob.pickupAt = elapsedRunTime();
  }

  awardScore(25 + optionBonus, "pickup");
  activeRun.flash = 0.15;
  addFloatText(pickup.x, pickup.y - 24, `バッグ${getCarriedCount()}個 +${25 + optionBonus}`, "#f0bf39", 0.9, -30, 13);
  createBurst(pickup.x, pickup.y, "#f0bf39", 10);
  setTargetFocus("destination", currentJob.destination, 1.7);
  vibrate(12);
  playCue("pickup");
  checkDailyMissionProgress(pickup);
}

function checkDailyMissionProgress(point) {
  if (activeRun.dailyMissionRewarded || !isDailyMissionCompletedBy(activeRun)) return;

  activeRun.dailyMissionRewarded = true;
  awardScore(dailyMission.reward, "event");
  const missionLabel = copyText(COPY.itemText.dailyMissionComplete, { score: dailyMission.reward });
  addFloatText(point.x, point.y - 74, missionLabel, "#f0bf39", 1.2, -34, 14);
  addScreenText(missionLabel, "combo", 1.05, 0.4);
  createBurst(point.x, point.y, "#f0bf39", 18);
  triggerShake(1.8, 0.16);
  vibrate([16, 18, 16]);
  playCue("item");
}

function setTargetFocus(kind, cell, ttl = 1.6) {
  if (!cell) return;
  activeRun.targetFocus = {
    kind,
    key: cellKey(cell),
    ttl,
    initialTtl: ttl,
  };
}

function getTargetFocusStrength(kind, cell) {
  const focus = activeRun.targetFocus;
  if (!focus || focus.kind !== kind || focus.key !== cellKey(cell)) return 0;
  return clamp(focus.ttl / (focus.initialTtl ?? 1), 0, 1);
}

function getCarriedCount() {
  return activeRun.carriedPackages?.length ?? 0;
}

function getCarriedDistanceTotal() {
  return (activeRun.carriedPackages ?? []).reduce((sum, item) => sum + (item.distance ?? cellDistance(item.cell, currentJob.destination)), 0);
}

function getMultiCarryBonus(count) {
  if (count <= 1) return 0;
  return (count - 1) * 90 + (count >= MAX_CARRY_PACKAGES ? 80 : 0);
}

function canPickMorePackages() {
  return getCarriedCount() < MAX_CARRY_PACKAGES && getAvailablePickupChoices(currentJob).length > 0;
}

function getPickupRadius() {
  return activeRun.magnet > 0 ? 92 : 24;
}

function getDestinationRadius() {
  return activeRun.magnet > 0 ? 76 : 26;
}

function getItemPickupRadius() {
  return activeRun.magnet > 0 ? 86 : 24;
}

function createManualItemStock() {
  return { ...MANUAL_ITEM_STARTING_STOCK };
}

function getManualItemName(kind) {
  if (kind === "clock") return COPY.ui.clock;
  if (kind === "shield") return COPY.ui.shellGuard;
  if (kind === "magnet") return COPY.ui.magnet;
  if (kind === "turbo") return COPY.ui.tailwind;
  if (kind === "flight") return COPY.ui.airplane;
  if (kind === "star") return COPY.ui.star;
  return COPY.ui.tool;
}

function getItemGainedText(kind) {
  return copyText(COPY.itemText.gained, { name: getManualItemName(kind) });
}

function getManualItemActiveSeconds(kind) {
  if (kind === "shield") return activeRun.shield;
  if (kind === "magnet") return activeRun.magnet;
  if (kind === "turbo") return activeRun.rush;
  if (kind === "flight") return activeRun.flight;
  return 0;
}

function grantManualItem(kind, amount = 1) {
  activeRun.manualItems[kind] = (activeRun.manualItems[kind] ?? 0) + amount;
  updateManualItems();
}

function countItemPickup(kind, amount = 1) {
  const key = Object.prototype.hasOwnProperty.call(activeRun.itemPickups, kind) ? kind : "star";
  activeRun.itemPickups[key] = (activeRun.itemPickups[key] ?? 0) + amount;
}

function useManualItem(kind) {
  if (activeRun.status !== "running" || (activeRun.manualItems?.[kind] ?? 0) <= 0) return;
  if (getManualItemActiveSeconds(kind) > 0) return;

  activeRun.manualItems[kind] -= 1;
  activeRun.manualUses += 1;
  const { x, y } = activeRun.player;

  if (kind === "clock") {
    activeRun.timeLeft = Math.min(BONUS_MAX_TIME, activeRun.timeLeft + MANUAL_CLOCK_SECONDS);
    addFloatText(x, y - 48, copyText(COPY.itemText.clockUse, { seconds: MANUAL_CLOCK_SECONDS.toFixed(1) }), "#12d8df");
    createBurst(x, y, "#12d8df", 12);
  } else if (kind === "shield") {
    activeRun.shield = Math.max(activeRun.shield, SHIELD_SECONDS);
    addFloatText(x, y - 48, getManualItemName(kind), "#8e6df0");
    createBurst(x, y, "#8e6df0", 14);
  } else if (kind === "magnet") {
    activeRun.magnet = Math.max(activeRun.magnet, MAGNET_SECONDS);
    addFloatText(x, y - 48, COPY.itemText.magnetOn, "#f0bf39");
    createBurst(x, y, "#f0bf39", 12);
  } else if (kind === "turbo") {
    activeRun.rush = Math.max(activeRun.rush, TURBO_ITEM_SECONDS);
    addFloatText(x, y - 48, getManualItemName(kind), "#12d8df");
    createBurst(x, y, "#12d8df", 12);
  } else if (kind === "flight") {
    activeRun.flight = Math.max(activeRun.flight, FLIGHT_SECONDS);
    activeRun.stunned = 0;
    addFloatText(x, y - 48, COPY.itemText.flightUse, "#4f9cff");
    createBurst(x, y, "#4f9cff", 16);
  }

  activeRun.flash = Math.max(activeRun.flash, 0.12);
  triggerShake(1.3, 0.14);
  vibrate([12, 18]);
  playCue("item");
  updateManualItems();
}

function updateManualItems(force = false) {
  const recommendedItems = getRecommendedManualItems();
  const signature = createManualItemsSignature(recommendedItems);
  const now = performance.now();
  if (!force && signature === manualItemsSignature && now - lastManualItemsRender < 140) return;
  manualItemsSignature = signature;
  lastManualItemsRender = now;

  manualItemButtons.forEach((button) => {
    const kind = button.dataset.manualItem;
    const count = activeRun.manualItems?.[kind] ?? 0;
    const activeSeconds = getManualItemActiveSeconds(kind);
    const countLabel = button.querySelector("[data-item-count]");
    if (countLabel) setTextIfChanged(countLabel, count);
    button.disabled = activeRun.status !== "running" || count <= 0 || activeSeconds > 0;
    button.classList.toggle("is-active", activeSeconds > 0);
    button.classList.toggle("is-empty", count <= 0 && activeSeconds <= 0);
    button.classList.toggle("is-ready", activeRun.status === "running" && count > 0 && activeSeconds <= 0);
    button.classList.toggle("is-recommended", recommendedItems.has(kind) && count > 0 && activeSeconds <= 0);
  });
  itemBar.classList.toggle("is-running", activeRun.status === "running");
}

function createManualItemsSignature(recommendedItems) {
  return manualItemButtons
    .map((button) => {
      const kind = button.dataset.manualItem;
      const count = activeRun.manualItems?.[kind] ?? 0;
      const active = getManualItemActiveSeconds(kind) > 0 ? 1 : 0;
      const ready = activeRun.status === "running" && count > 0 && !active ? 1 : 0;
      const recommended = recommendedItems.has(kind) ? 1 : 0;
      return `${kind}:${count}:${active}:${ready}:${recommended}`;
    })
    .join("|");
}

function getRecommendedManualItems() {
  const recommendations = new Set();
  if (activeRun.status !== "running") return recommendations;

  if ((activeRun.manualItems?.clock ?? 0) > 0 && activeRun.timeLeft <= 10) {
    recommendations.add("clock");
  }

  if ((activeRun.manualItems?.shield ?? 0) > 0 && activeRun.shield <= 0 && isShieldRecommended()) {
    recommendations.add("shield");
  }

  if ((activeRun.manualItems?.magnet ?? 0) > 0 && activeRun.magnet <= 0 && isMagnetRecommended()) {
    recommendations.add("magnet");
  }

  if ((activeRun.manualItems?.turbo ?? 0) > 0 && activeRun.rush <= 0 && isTurboRecommended()) {
    recommendations.add("turbo");
  }

  if ((activeRun.manualItems?.flight ?? 0) > 0 && activeRun.flight <= 0 && isFlightRecommended()) {
    recommendations.add("flight");
  }

  return recommendations;
}

function isShieldRecommended() {
  const player = activeRun.player;
  const movingDanger = hazards.some((hazard) => {
    const alertDistance = getHazardRadius(hazard) + 52;
    return Math.hypot(player.x - hazard.x, player.y - hazard.y) <= alertDistance;
  });
  if (movingDanger) return true;

  const shieldedEvents = roadEvents.filter((event) => {
    if (event.kind === "roadwork" || event.kind === "electric") return true;
    return event.kind === "rail" && isRailClosed(event);
  });

  return shieldedEvents.some((event) => distanceToCell(player, event.cell) <= event.radius + 44);
}

function isMagnetRecommended() {
  const player = activeRun.player;
  const pickupNearBy = canPickMorePackages() &&
    getAvailablePickupChoices(currentJob).some((choice) => {
      const distance = distanceToCell(player, choice.cell);
      return distance > getPickupRadius() + 8 && distance <= 112;
    });
  if (pickupNearBy) return true;

  const itemNearby = supportItems.some((item) => {
    if (item.collected) return false;
    const distance = distanceToCell(player, item.cell);
    return distance > getItemPickupRadius() + 8 && distance <= 108;
  });
  if (itemNearby) return true;

  return activeRun.carrying && distanceToCell(player, currentJob.destination) <= 116 && distanceToCell(player, currentJob.destination) > getDestinationRadius() + 8;
}

function isTurboRecommended() {
  const target = getCurrentTarget();
  const distance = distanceToCell(activeRun.player, target);
  if (distance < TILE * 5) return false;

  const cell = getPlayerCell(activeRun.player);
  if (!isRoadCell(cell)) return false;
  return !isIntersectionCell(map, cell) && !isNearIntersectionCell(map, cell);
}

function isFlightRecommended() {
  const player = activeRun.player;
  if (!isRoadCell(getPlayerCell(player))) return true;

  const riskyGroundEvent = roadEvents.some((event) => {
    if (!["roadwork", "electric", "rail", "oil"].includes(event.kind)) return false;
    if (event.kind === "rail" && !isRailClosed(event)) return false;
    return distanceToCell(player, event.cell) <= event.radius + 54;
  });
  if (riskyGroundEvent) return true;

  return hazards.some((hazard) => {
    const distance = Math.hypot(player.x - hazard.x, player.y - hazard.y);
    return distance <= getHazardRadius(hazard) + 44;
  });
}

function updateBonus(dt) {
  if (!activeRun.bonus) return;

  activeRun.bonus.ttl -= dt;
  if (activeRun.bonus.ttl <= 0) {
    activeRun.bonus = null;
  }
}

function checkBonusPickup() {
  if (!activeRun.bonus) return;

  const bonus = activeRun.bonus;
  if (distanceToCell(activeRun.player, bonus.cell) >= getItemPickupRadius()) return;

  const point = toCanvasPoint(bonus.cell);
  activeRun.bonuses += 1;
  countItemPickup("clock");
  awardScore(BONUS_SCORE, "bonus");
  activeRun.timeLeft = Math.min(BONUS_MAX_TIME, activeRun.timeLeft + BONUS_SECONDS);
  activeRun.flash = Math.max(activeRun.flash, 0.12);
  activeRun.bonus = null;
  addFloatText(
    point.x,
    point.y - 28,
    copyText(COPY.itemText.clockBonus, { score: BONUS_SCORE, seconds: BONUS_SECONDS.toFixed(1) }),
    "#12d8df",
  );
  if (shouldShowItemPickupDescription("clock")) {
    addItemPickupScreenText("clock");
  }
  createBurst(point.x, point.y, "#12d8df", 12);
  triggerShake(1.2, 0.14);
  vibrate([12, 18]);
}

function checkSupportItemPickup() {
  const item = supportItems.find((candidate) => !candidate.collected && distanceToCell(activeRun.player, candidate.cell) < getItemPickupRadius());
  if (!item) return;

  item.collected = true;
  activeRun.supportPickups += 1;
  countItemPickup(item.kind);
  const point = toCanvasPoint(item.cell);

  if (item.kind === "clock") {
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    activeRun.timeLeft = Math.min(BONUS_MAX_TIME, activeRun.timeLeft + MANUAL_CLOCK_SECONDS);
    addFloatText(
      point.x,
      point.y - 28,
      copyText(COPY.itemText.clockActivated, { seconds: MANUAL_CLOCK_SECONDS.toFixed(1) }),
      "#12d8df",
      0.95,
      -32,
      13,
    );
  } else if (item.kind === "shield") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, getItemGainedText(item.kind), "#8e6df0", 0.9, -30, 13);
  } else if (item.kind === "magnet") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, getItemGainedText(item.kind), "#f0bf39", 0.9, -30, 13);
  } else if (item.kind === "turbo") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, getItemGainedText(item.kind), "#12d8df", 0.9, -30, 13);
  } else if (item.kind === "flight") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, getItemGainedText(item.kind), "#4f9cff", 0.9, -30, 13);
  } else {
    awardScore(120, "bonus");
    addFloatText(point.x, point.y - 28, copyText(COPY.itemText.starBonus, { score: 120 }), "#f0bf39");
  }

  const description = getSupportItemDescription(item.kind);
  if (shouldShowItemPickupDescription(item.kind)) {
    addFloatText(point.x, point.y - 46, description, "#ffffff", 0.55, -18, 10);
    addItemPickupScreenText(item.kind, description);
  }

  checkDailyMissionProgress(point);
  activeRun.flash = Math.max(activeRun.flash, 0.12);
  createBurst(point.x, point.y, getSupportItemColor(item.kind), 12);
  triggerShake(1.1, 0.12);
  vibrate([10, 18]);
}

function shouldShowItemPickupDescription(kind) {
  if (!activeRun.itemDescriptionSeen) activeRun.itemDescriptionSeen = {};
  if (activeRun.itemDescriptionSeen[kind]) return false;

  const description = getSupportItemDescription(kind);
  if (!description) return false;

  activeRun.itemDescriptionSeen[kind] = true;
  return true;
}

function addItemPickupScreenText(kind, description = getSupportItemDescription(kind)) {
  if (!description) return;

  addScreenText(
    copyText(COPY.itemText.itemNotice, {
      name: getManualItemName(kind),
      description,
    }),
    "item",
    0.72,
    0.48,
  );
}

function updateRoadEvents(dt) {
  Object.keys(activeRun.eventCooldowns).forEach((key) => {
    activeRun.eventCooldowns[key] = Math.max(0, activeRun.eventCooldowns[key] - dt);
  });

  roadEvents.forEach((event) => {
    event.cooldown = Math.max(0, (event.cooldown ?? 0) - dt);
  });
}

function checkRoadEvents() {
  if (activeRun.status !== "running") return;

  roadEvents.forEach((event) => {
    const distance = distanceToCell(activeRun.player, event.cell);
    if (distance > event.radius) return;

    const isGroundTrap = ["puddle", "crowd", "oil", "rail", "signal", "roadwork", "electric", "festival", "slope"].includes(event.kind);
    if (activeRun.flight > 0 && isGroundTrap) return;

    if (event.kind === "puddle" || event.kind === "crowd") {
      triggerSlowZone(event);
      return;
    }

    if (event.kind === "tailwind") {
      triggerTailwind(event);
      return;
    }

    if (event.kind === "slope") {
      triggerSlope(event);
      return;
    }

    if (event.kind === "shortcut") {
      triggerShortcut(event);
      return;
    }

    if (event.kind === "post") {
      triggerDeliveryPost(event);
      return;
    }

    if (event.kind === "heli") {
      triggerHeliDelivery(event);
      return;
    }

    if (event.kind === "stand") {
      triggerSurpriseStand(event);
      return;
    }

    if (event.kind === "oil") {
      triggerOilSlick(event);
      return;
    }

    if (event.kind === "electric") {
      triggerElectricTrap(event);
      return;
    }

    if (event.kind === "rail" && isRailClosed(event)) {
      triggerRailPenalty(event);
      return;
    }

    if (event.kind === "signal" && isSignalRed(event)) {
      triggerSignalPenalty(event);
      return;
    }

    if (event.kind === "festival" && isFestivalBusy(event)) {
      triggerFestivalSlowdown(event);
      return;
    }

    if (event.kind === "roadwork") {
      triggerRoadworkPenalty(event);
    }
  });
}

function triggerSlowZone(event) {
  activeRun.slow = Math.max(activeRun.slow, SLOW_ZONE_SECONDS);
  if (event.cooldown > 0 || activeRun.eventCooldowns.slow > 0) return;

  const point = toCanvasPoint(event.cell);
  const label = event.kind === "crowd" ? "人混み" : "水たまり";
  event.cooldown = 1.25;
  activeRun.eventCooldowns.slow = 0.65;
  addFloatText(point.x, point.y - 24, `${label} 減速`, "#f0bf39", 0.72, -24);
  vibrate(8);
}

function triggerTailwind(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.tailwind > 0) return;

  const point = toCanvasPoint(event.cell);
  event.cooldown = 9.5;
  activeRun.eventCooldowns.tailwind = 0.9;
  activeRun.rush = Math.max(activeRun.rush, TAILWIND_SECONDS);
  awardScore(45, "event");
  addFloatText(point.x, point.y - 30, "追い風 +45", "#12d8df");
  createBurst(point.x, point.y, "#12d8df", 12);
  triggerShake(1.2, 0.13);
  vibrate([10, 18]);
}

function triggerSlope(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.slope > 0) return;

  const input = getInputVector();
  const moveX = input.active ? input.x : Math.cos(activeRun.player.facing || event.angle || 0);
  const moveY = input.active ? input.y : Math.sin(activeRun.player.facing || event.angle || 0);
  const downX = Math.cos(event.angle ?? 0);
  const downY = Math.sin(event.angle ?? 0);
  const dot = moveX * downX + moveY * downY;
  const point = toCanvasPoint(event.cell);

  event.cooldown = 1.35;
  activeRun.eventCooldowns.slope = 0.5;

  if (dot >= -0.1) {
    activeRun.rush = Math.max(activeRun.rush, SLOPE_BOOST_SECONDS);
    awardScore(28, "event");
    addFloatText(point.x, point.y - 28, "下り坂 +28", "#12d8df", 0.74, -24);
    createBurst(point.x, point.y, "#12d8df", 8);
    vibrate(8);
    return;
  }

  activeRun.slow = Math.max(activeRun.slow, SLOPE_SLOW_SECONDS);
  addFloatText(point.x, point.y - 28, "上り坂", "#f0bf39", 0.72, -22);
  vibrate(6);
}

function triggerShortcut(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.shortcut > 0 || !event.targetCell) return;

  const point = toCanvasPoint(event.cell);
  const target = toCanvasPoint(event.targetCell);
  const from = { x: activeRun.player.x, y: activeRun.player.y };
  const pair = roadEvents.filter((item) => item.kind === "shortcut" && item.pairId === event.pairId);
  pair.forEach((item) => {
    item.cooldown = SHORTCUT_COOLDOWN_SECONDS;
  });
  activeRun.eventCooldowns.shortcut = 0.85;
  activeRun.warp = {
    from,
    to: target,
    elapsed: 0,
    duration: WARP_SECONDS,
    color: event.color ?? "#8e6df0",
  };
  activeRun.flash = Math.max(activeRun.flash, 0.14);
  awardScore(SHORTCUT_SCORE, "event");
  addFloatText(point.x, point.y - 30, "ワープ", "#8e6df0", 0.82, -28);
  addFloatText(target.x, target.y - 30, `+${SHORTCUT_SCORE}`, "#12d8df", 0.82, -30);
  createBurst(point.x, point.y, "#8e6df0", 10);
  createBurst(target.x, target.y, "#12d8df", 12);
  triggerShake(2.1, 0.18);
  vibrate([12, 14, 12]);
}

function triggerDeliveryPost(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.post > 0) return;

  const point = toCanvasPoint(event.cell);
  if (!activeRun.carrying || getCarriedCount() <= 0) {
    event.cooldown = 1.6;
    activeRun.eventCooldowns.post = 0.6;
    addFloatText(point.x, point.y - 28, COPY.itemText.bagNeeded, "#ffffff", 0.72, -22);
    return;
  }

  event.cooldown = 7.5;
  activeRun.eventCooldowns.post = 0.85;
  deliverSinglePackageByEvent({
    baseScore: DELIVERY_POST_SCORE,
    label: COPY.itemText.postDelivery,
    color: "#f0bf39",
    point,
    bonusScale: 0.55,
  });
}

function triggerHeliDelivery(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.heli > 0) return;

  const point = toCanvasPoint(event.cell);
  if (!activeRun.carrying || getCarriedCount() <= 0) {
    event.cooldown = 1.8;
    activeRun.eventCooldowns.heli = 0.8;
    addFloatText(point.x, point.y - 32, "バッグがあればヘリ便", "#dffcff", 0.78, -24);
    return;
  }

  const destination = toCanvasPoint(currentJob.destination);
  event.cooldown = 10.5;
  activeRun.eventCooldowns.heli = 1.1;
  activeRun.heliDelivery = {
    from: { x: point.x, y: point.y },
    to: { x: destination.x, y: destination.y },
    elapsed: 0,
    duration: HELI_DELIVERY_SECONDS,
  };
  deliverSinglePackageByEvent({
    baseScore: HELI_DELIVERY_SCORE,
    label: COPY.itemText.heliDelivery,
    color: "#5e96df",
    point,
    bonusScale: 0.7,
  });
  addFloatText(destination.x, destination.y - 34, COPY.itemText.heliHome, "#dffcff", 0.95, -28);
  createBurst(destination.x, destination.y, "#5e96df", 14);
}

function deliverSinglePackageByEvent({ baseScore, label, color, point, bonusScale }) {
  const deliveredPackage = activeRun.carriedPackages.shift();
  const comboBefore = activeRun.combo;
  const distance = deliveredPackage?.distance ?? cellDistance(deliveredPackage?.cell ?? getPlayerCell(activeRun.player), currentJob.destination);
  const distanceBonus = Math.round(distance * 6 * bonusScale);
  const comboBonus = comboBefore * 24;
  const total = baseScore + distanceBonus + comboBonus;

  activeRun.deliveries += 1;
  activeRun.combo += 1;
  activeRun.maxCombo = Math.max(activeRun.maxCombo, activeRun.combo);
  activeRun.carrying = getCarriedCount() > 0;
  currentJob.distance = getCarriedDistanceTotal();
  if (!activeRun.carrying) {
    currentJob.pickupAt = null;
  }

  awardScoreParts([
    { bucket: "delivery", points: baseScore },
    { bucket: "distance", points: distanceBonus },
    { bucket: "combo", points: comboBonus },
  ]);
  activeRun.flash = Math.max(activeRun.flash, 0.16);
  const eventLabel = copyText(label, { score: total });
  addFloatText(point.x, point.y - 30, eventLabel, color, 0.9, -28);
  addScreenText(eventLabel, "delivery", 0.9, 0.22);
  createBurst(point.x, point.y, color, 13);
  triggerShake(1.7, 0.15);
  vibrate([12, 18, 12]);
  playCue("delivery");

  announceComboProgress(comboBefore);
  checkDailyMissionProgress(point);
}

function updateWarp(dt) {
  if (!activeRun.warp) return false;

  const warp = activeRun.warp;
  warp.elapsed += dt;
  const ratio = clamp(warp.elapsed / warp.duration, 0, 1);
  const eased = easeInOutCubic(ratio);
  const lift = Math.sin(ratio * Math.PI) * 24;
  activeRun.player.x = warp.from.x + (warp.to.x - warp.from.x) * eased;
  activeRun.player.y = warp.from.y + (warp.to.y - warp.from.y) * eased - lift;
  activeRun.flash = Math.max(activeRun.flash, 0.05);

  if (ratio >= 1) {
    activeRun.player.x = warp.to.x;
    activeRun.player.y = warp.to.y;
    activeRun.warp = null;
    createBurst(warp.to.x, warp.to.y, "#12d8df", 14);
    return false;
  }

  return true;
}

function triggerSurpriseStand(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.stand > 0) return;

  const kinds = ["clock", "shield", "magnet", "turbo", "flight"];
  const kind = kinds[Math.floor(activeRun.rng() * kinds.length)];
  const point = toCanvasPoint(event.cell);
  event.cooldown = 7.5;
  activeRun.eventCooldowns.stand = 0.8;
  if (kind === "clock") {
    activeRun.timeLeft = Math.min(BONUS_MAX_TIME, activeRun.timeLeft + MANUAL_CLOCK_SECONDS);
    countItemPickup("clock");
  } else {
    grantManualItem(kind);
    countItemPickup(kind);
  }
  awardScore(SURPRISE_STAND_SCORE, "event");
  addFloatText(
    point.x,
    point.y - 32,
    kind === "clock"
      ? copyText(COPY.itemText.clockActivated, { seconds: MANUAL_CLOCK_SECONDS.toFixed(1) })
      : getItemGainedText(kind),
    getSupportItemColor(kind),
  );
  addFloatText(point.x, point.y - 50, `屋台 +${SURPRISE_STAND_SCORE}`, "#f0bf39", 0.75, -28);
  const description = getSupportItemDescription(kind);
  if (shouldShowItemPickupDescription(kind)) {
    addFloatText(point.x, point.y - 68, description, "#ffffff", 0.55, -18, 10);
    addItemPickupScreenText(kind, description);
  }
  checkDailyMissionProgress(point);
  createBurst(point.x, point.y, "#f0bf39", 12);
  triggerShake(1.2, 0.14);
  vibrate([10, 16, 10]);
}

function triggerOilSlick(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.oil > 0) return;

  const input = getInputVector();
  const slideX = input.active ? input.x : Math.cos(activeRun.player.facing || -Math.PI / 2);
  const slideY = input.active ? input.y : Math.sin(activeRun.player.facing || -Math.PI / 2);
  const length = Math.hypot(slideX, slideY) || 1;
  const point = toCanvasPoint(event.cell);
  event.cooldown = 1.55;
  activeRun.eventCooldowns.oil = 0.55;
  activeRun.slip = OIL_SLIP_SECONDS;
  activeRun.slide = { x: slideX / length, y: slideY / length };
  activeRun.combo = Math.max(0, activeRun.combo - 1);
  addFloatText(point.x, point.y - 25, "油ですべる", "#6658d3", 0.82, -24);
  triggerShake(1.6, 0.16);
  vibrate([10, 12]);
}

function triggerElectricTrap(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.electric > 0 || activeRun.invulnerable > 0) return;

  const point = toCanvasPoint(event.cell);
  if (consumeShield(point.x, point.y)) {
    event.cooldown = 1.4;
    activeRun.eventCooldowns.electric = 0.5;
    activeRun.invulnerable = Math.max(activeRun.invulnerable, 0.8);
    return;
  }

  event.cooldown = 2.4;
  activeRun.eventCooldowns.electric = 0.7;
  activeRun.stunned = Math.max(activeRun.stunned, ELECTRIC_STUN_SECONDS);
  activeRun.invulnerable = Math.max(activeRun.invulnerable, ELECTRIC_RECOVERY_SECONDS);
  activeRun.rush = 0;
  activeRun.combo = 0;
  activeRun.flash = Math.max(activeRun.flash, 0.26);
  awardScore(-55, "penalty");
  addFloatText(point.x, point.y - 30, "ビリビリ停止", "#4f9cff", 1.05, -24);
  createBurst(point.x, point.y, "#4f9cff", 18);
  triggerShake(3.8, 0.28);
  vibrate([32, 26, 32]);
  playCue("hit");
}

function triggerRailPenalty(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.rail > 0 || activeRun.invulnerable > 0) return;

  const point = toCanvasPoint(event.cell);
  if (consumeShield(point.x, point.y)) {
    event.cooldown = 1.2;
    activeRun.eventCooldowns.rail = 0.45;
    return;
  }

  event.cooldown = 1.8;
  activeRun.eventCooldowns.rail = 0.55;
  activeRun.collisions += 1;
  activeRun.combo = 0;
  activeRun.timeLeft = Math.max(0, activeRun.timeLeft - 0.65);
  activeRun.rush = 0;
  activeRun.invulnerable = Math.max(activeRun.invulnerable, 0.55);
  activeRun.flash = 0.24;
  awardScore(-50, "penalty");
  addFloatText(point.x, point.y - 31, "踏切 -50", "#e85d56");
  createBurst(point.x, point.y, "#e85d56", 12);
  triggerShake(4, 0.24);
  vibrate([36, 24, 36]);
  playCue("hit");
}

function triggerSignalPenalty(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.signal > 0) return;

  const point = toCanvasPoint(event.cell);
  event.cooldown = 1.65;
  activeRun.eventCooldowns.signal = 0.55;
  activeRun.combo = 0;
  activeRun.timeLeft = Math.max(0, activeRun.timeLeft - 0.45);
  activeRun.rush = 0;
  activeRun.slow = Math.max(activeRun.slow, 0.45);
  activeRun.flash = Math.max(activeRun.flash, 0.14);
  awardScore(-35, "penalty");
  addFloatText(point.x, point.y - 30, "赤信号 -35", "#e85d56");
  triggerShake(2.2, 0.16);
  vibrate([18, 22]);
  playCue("hit");
}

function triggerFestivalSlowdown(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.festival > 0) return;

  const point = toCanvasPoint(event.cell);
  event.cooldown = 1.8;
  activeRun.eventCooldowns.festival = 0.65;
  activeRun.slow = Math.max(activeRun.slow, 1.15);
  activeRun.rush = 0;
  activeRun.combo = Math.max(0, activeRun.combo - 1);
  awardScore(-25, "penalty");
  addFloatText(point.x, point.y - 30, "祭り列 -25", "#e85d56", 0.8, -24);
  triggerShake(2.1, 0.16);
  vibrate([16, 20]);
}

function triggerRoadworkPenalty(event) {
  if (event.cooldown > 0 || activeRun.eventCooldowns.roadwork > 0 || activeRun.invulnerable > 0) return;

  const point = toCanvasPoint(event.cell);
  if (consumeShield(point.x, point.y)) {
    event.cooldown = 1.1;
    activeRun.eventCooldowns.roadwork = 0.35;
    return;
  }

  event.cooldown = 1.55;
  activeRun.eventCooldowns.roadwork = 0.4;
  activeRun.collisions += 1;
  activeRun.combo = 0;
  activeRun.timeLeft = Math.max(0, activeRun.timeLeft - 0.55);
  activeRun.rush = 0;
  activeRun.invulnerable = Math.max(activeRun.invulnerable, 0.48);
  activeRun.flash = 0.22;
  awardScore(-45, "penalty");
  addFloatText(point.x, point.y - 30, "工事 -45", "#e85d56");
  createBurst(point.x, point.y, "#e85d56", 10);
  triggerShake(3.5, 0.22);
  vibrate([30, 22, 30]);
  playCue("hit");
}

function consumeShield(x, y) {
  if (activeRun.shield <= 0) return false;

  activeRun.shield = 0;
  activeRun.flash = Math.max(activeRun.flash, 0.16);
  addFloatText(x, y - 34, "甲羅で回避", "#8e6df0");
  createBurst(x, y, "#8e6df0", 14);
  triggerShake(1.8, 0.16);
  vibrate([12, 20, 12]);
  return true;
}

function checkHazardCollision() {
  if (activeRun.flight > 0) return;
  if (activeRun.invulnerable > 0) return;

  const player = activeRun.player;
  const hit = hazards.some((hazard) => {
    const radius = getHazardRadius(hazard);
    return Math.hypot(player.x - hazard.x, player.y - hazard.y) < radius;
  });

  if (!hit) return;

  if (consumeShield(player.x, player.y)) {
    activeRun.invulnerable = Math.max(activeRun.invulnerable, 0.35);
    return;
  }

  activeRun.collisions += 1;
  activeRun.combo = 0;
  awardScore(-60, "penalty");
  activeRun.timeLeft = Math.max(0, activeRun.timeLeft - 0.85);
  activeRun.rush = 0;
  activeRun.invulnerable = HIT_RECOVERY_SECONDS;
  activeRun.flash = 0.3;
  addFloatText(player.x, player.y - 34, "-60 / 時間-0.8秒", "#e85d56");
  createBurst(player.x, player.y, "#e85d56", 14);
  triggerShake(4.6, 0.28);
  vibrate([45, 30, 45]);
  playCue("hit");
}

function checkNearMissBonus() {
  if (activeRun.flight > 0) return;
  if (activeRun.invulnerable > 0) return;

  const player = activeRun.player;
  hazards.forEach((hazard) => {
    if (hazard.nearMissCooldown > 0) return;

    const radius = getHazardRadius(hazard);
    const distance = Math.hypot(player.x - hazard.x, player.y - hazard.y);
    if (distance <= radius + 4 || distance >= radius + NEAR_MISS_BAND) return;

    awardScore(NEAR_MISS_SCORE, "near");
    activeRun.nearMisses += 1;
    hazard.nearMissCooldown = 1.4;
    addFloatText(player.x, player.y - 44, `すれすれ +${NEAR_MISS_SCORE}`, "#f0bf39");
    vibrate(8);
  });
}

function finishRun() {
  if (activeRun.status === "finishing" || activeRun.status === "ended") return;

  const record = {
    dateKey: todayKey,
    randomName: activeRun.randomName,
    score: activeRun.score,
    deliveries: activeRun.deliveries,
    combo: activeRun.maxCombo,
    collisions: activeRun.collisions,
    bonuses: activeRun.bonuses,
    supportPickups: activeRun.supportPickups,
    itemPickups: { ...activeRun.itemPickups },
    dailyMissionCompleted: activeRun.dailyMissionRewarded,
    maxCarry: activeRun.maxCarry,
    nearMisses: activeRun.nearMisses,
    scoreBreakdown: { ...activeRun.scoreBreakdown },
    mapSeed: map.seed,
    createdAt: new Date().toISOString(),
  };

  const previousSessionBest = getSessionBestScore(record.dateKey);
  activeRun.status = "finishing";
  activeRun.timeLeft = 0;
  resetInput();
  startButton.disabled = true;
  startButton.textContent = COPY.buttons.todayDelivery;
  pauseOverlay.classList.add("is-hidden");
  startGuide.classList.add("is-hidden");
  countdownOverlay.textContent = COPY.result.finished;
  countdownOverlay.classList.remove("is-hidden");
  countdownOverlay.classList.add("is-finish");
  updateManualItems();
  document.body.classList.remove("is-rush");
  document.body.classList.remove("is-last-spurt");
  timeCard.classList.remove("is-danger");
  vibrate([34, 28, 34]);
  playCue("finish");

  window.setTimeout(() => completeFinishedRun(record, previousSessionBest), FINISH_ANNOUNCE_MS);
}

function completeFinishedRun(record, previousSessionBest) {
  if (activeRun.status !== "finishing") return;

  activeRun.status = "ended";
  startButton.disabled = false;
  startButton.textContent = COPY.buttons.retry;
  countdownOverlay.classList.add("is-hidden");
  countdownOverlay.classList.remove("is-finish");
  updateManualItems();
  saveSessionScore(record);
  const playerProfile = updatePlayerProfile(record);
  latestResultCreatedAt = record.createdAt;
  renderResult(record, previousSessionBest, playerProfile);
  renderRankings();
  void submitOnlineScore(record);
  vibrate([50, 40, 50]);
}

function renderResult(record, previousSessionBest, playerProfile = loadPlayerProfile()) {
  const grade = getResultGrade(record);
  const isTopGrade = grade.key === "ss" || grade.key === "s";
  resultGrade.innerHTML = `<span>${COPY.ui.rank}</span><b>${grade.label}</b>`;
  resultGrade.setAttribute("aria-label", `${COPY.ui.rank} ${grade.label}`);
  resultGrade.className = `result-grade grade-${grade.key}`;
  resultName.textContent = record.randomName;
  resultMissionLine.textContent = getResultMissionLine(record);
  resultScoreHero.textContent = formatNumber(record.score);
  resultDeliveries.textContent = record.deliveries;
  resultCombo.textContent = record.combo;
  renderResultItemCounts(record);
  if (resultMaxCarry) resultMaxCarry.textContent = `${record.maxCarry ?? 0}個`;
  resultCollisions.textContent = record.collisions;
  resultNearMisses.textContent = record.nearMisses ?? 0;
  if (resultTotalDeliveries) resultTotalDeliveries.textContent = formatNumber(playerProfile.totalDeliveries);
  if (resultTotalPlays) resultTotalPlays.textContent = formatNumber(playerProfile.totalPlays);
  const rankInfo = getRankInfo(record);
  resultRank.textContent = rankInfo.rankLabel;
  resultGap.textContent = rankInfo.gapLabel;
  resultTip.textContent = getResultTip(record);
  const sessionBest = Math.max(record.score, previousSessionBest);
  const bestStatus = getBestStatus(record.score, previousSessionBest);
  resultSessionBest.textContent = formatNumber(sessionBest);
  resultBestDeltaLabel.textContent = bestStatus.label;
  resultBestDelta.textContent = bestStatus.value;
  resultBestBadge.classList.toggle("is-hidden", !bestStatus.isNewBest);
  latestSharePayload = bestStatus.isNewBest ? createSharePayload(record, rankInfo) : null;
  updateResultShareBox(bestStatus.isNewBest);
  document.body.classList.toggle("is-result-best", bestStatus.isNewBest);
  document.body.classList.toggle("is-result-top-grade", isTopGrade);
  updateResultCelebration(bestStatus.isNewBest, isTopGrade);
  renderResultNextMoves(record, rankInfo, previousSessionBest);
  renderResultHighlights(record);
  renderResultMedals(record);
  renderResultBreakdown(record);
  setResultDetailExpanded(false);
  activateResultTab("summary");
  document.body.classList.add("show-results");
  window.scrollTo(0, 0);
  gameSetScreen.classList.remove("is-hidden");
  if (bestStatus.isNewBest || isTopGrade) {
    playCue(bestStatus.isNewBest ? "resultBest" : "resultRank");
    vibrate(bestStatus.isNewBest ? [32, 44, 36] : [24, 34, 24]);
  }
}

function updateResultCelebration(isNewBest, isTopGrade) {
  const shouldShow = isNewBest || isTopGrade;
  if (!resultCelebration) return;
  resultCelebration.classList.toggle("is-hidden", !shouldShow);
  resultCelebration.innerHTML = shouldShow ? createResultCelebrationMarkup(isNewBest) : "";
}

function createResultCelebrationMarkup(isNewBest) {
  const colors = isNewBest
    ? ["#f0bf39", "#8bdc96", "#f07d4e", "#ffffff"]
    : ["#8bdc96", "#f0bf39", "#5ec2ca", "#ffffff"];
  return Array.from({ length: 14 }, (_, index) => {
    const x = 6 + ((index * 19) % 88);
    const delay = (index % 5) * 0.08;
    const rotate = -22 + ((index * 17) % 46);
    const color = colors[index % colors.length];
    return `<i style="--x:${x}%;--d:${delay}s;--r:${rotate}deg;--c:${color}"></i>`;
  }).join("");
}

function renderResultItemCounts(record) {
  const itemPickups = getRecordItemPickups(record);
  Object.entries(resultItemCounts).forEach(([kind, element]) => {
    if (element) element.textContent = itemPickups[kind] ?? 0;
  });
}

function getRecordItemPickups(record) {
  const itemPickups = { ...createEmptyItemPickups(), ...(record.itemPickups ?? {}) };
  if (!record.itemPickups) {
    itemPickups.clock = record.bonuses ?? 0;
  }
  return itemPickups;
}

function getResultMissionLine(record) {
  const done = record.dailyMissionCompleted || isDailyMissionCompletedBy(record);
  const status = done
    ? COPY.result.missionDone
    : getDailyMissionRemainingText(record);
  return copyText(COPY.result.missionLine, { summary: dailyMission.summary, status });
}

function setResultDetailExpanded(isExpanded) {
  resultDetailPanel.hidden = !isExpanded;
  resultDetailToggle.setAttribute("aria-expanded", String(isExpanded));
  resultDetailToggle.textContent = isExpanded ? COPY.ui.detailClose : COPY.ui.detailOpen;
  document.body.classList.toggle("is-result-detail-open", isExpanded);
}

function activateResultTab(tabName) {
  if (tabName !== "summary" && !resultDetailPanel.hidden) {
    setResultDetailExpanded(false);
  }

  Object.entries(resultTabPanels).forEach(([name, panel]) => {
    const isActive = name === tabName;
    panel.hidden = !isActive;
  });

  resultTabButtons.forEach((button) => {
    const isActive = button.dataset.resultTab === tabName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function getRankInfo(record) {
  const records = getTodayScores(record.dateKey);
  const index = records.findIndex((item) => isSameScoreSubmission(item, record));
  const fallbackIndex = records.findIndex((item) => item.score <= record.score);
  const rank = index >= 0 ? index + 1 : fallbackIndex >= 0 ? fallbackIndex + 1 : records.length + 1;

  if (rank <= 1) {
    return {
      rank,
      gap: 0,
      topGap: 0,
      rankLabel: COPY.rankingText.firstPlace,
      gapLabel: "",
      topGapLabel: "",
    };
  }

  const previous = records[rank - 2];
  const top = records[0];
  const gap = Math.max(1, previous.score - record.score + 1);
  const topGap = Math.max(1, top.score - record.score + 1);
  return {
    rank,
    gap,
    topGap,
    rankLabel: copyText(COPY.rankingText.rank, { rank }),
    gapLabel: copyText(COPY.rankingText.rankGap, { score: formatNumber(gap), rank: rank - 1 }),
    topGapLabel: copyText(COPY.rankingText.topGap, { score: formatNumber(topGap) }),
  };
}

function getBestStatus(score, previousBest) {
  if (previousBest <= 0 && score <= 0) {
    return {
      label: COPY.result.bestTarget,
      value: "1配達",
      isNewBest: false,
    };
  }

  if (score > previousBest) {
    return {
      label: COPY.result.updated,
      value: `+${formatNumber(score - previousBest)}`,
      isNewBest: true,
    };
  }

  if (score === previousBest) {
    return {
      label: COPY.result.bestTie,
      value: COPY.result.oneMore,
      isNewBest: false,
    };
  }

  return {
    label: COPY.result.bestTarget,
    value: `あと${formatNumber(previousBest - score + 1)}`,
    isNewBest: false,
  };
}

function createSharePayload(record, rankInfo) {
  const text = [
    `${COPY.share.title}で${COPY.result.bestUpdated}`,
    `${COPY.terms.score} ${formatNumber(record.score)}`,
    `${COPY.ui.todayRanking} ${rankInfo.rankLabel}`,
    `${record.deliveries}件${COPY.terms.delivery} / ${record.combo}${COPY.terms.combo}`,
    COPY.share.url,
  ].join("\n");

  return {
    title: COPY.share.title,
    text,
    url: COPY.share.url,
    record: {
      score: record.score,
      deliveries: record.deliveries,
      combo: record.combo,
      randomName: record.randomName,
      dateKey: record.dateKey,
    },
    rankInfo: {
      rankLabel: rankInfo.rankLabel,
      gapLabel: rankInfo.gapLabel,
      topGapLabel: rankInfo.topGapLabel,
    },
  };
}

function updateResultShareBox(shouldShow) {
  if (!resultShareBox) return;

  resultShareBox.classList.toggle("is-hidden", !shouldShow);
  if (resultShareButton) resultShareButton.textContent = COPY.share.button;
  if (resultShareImageButton) resultShareImageButton.textContent = COPY.share.imageButton;
  if (resultShareStatus) resultShareStatus.textContent = "";
}

async function shareLatestResult() {
  if (!latestSharePayload) return;

  try {
    const shareData = {
      title: latestSharePayload.title,
      text: latestSharePayload.text,
      url: latestSharePayload.url,
    };
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    if (!navigator.clipboard?.writeText) throw new Error("Clipboard is unavailable");
    await navigator.clipboard.writeText(latestSharePayload.text);
    if (resultShareStatus) resultShareStatus.textContent = COPY.share.copied;
  } catch {
    if (resultShareStatus) resultShareStatus.textContent = COPY.share.failed;
  }
}

async function saveLatestResultImage() {
  if (!latestSharePayload) return;

  try {
    const canvas = createShareImageCanvas(latestSharePayload);
    const blob = await canvasToPngBlob(canvas);
    downloadBlob(blob, `kameposu-${latestSharePayload.record.dateKey}.png`);
    if (resultShareStatus) resultShareStatus.textContent = COPY.share.imageSaved;
  } catch {
    if (resultShareStatus) resultShareStatus.textContent = COPY.share.imageFailed;
  }
}

function createShareImageCanvas(payload) {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;
  const drawingContext = canvas.getContext("2d");
  const record = payload.record;

  const background = drawingContext.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#fff8ec");
  background.addColorStop(0.52, "#f3fff3");
  background.addColorStop(1, "#eaf8ff");
  drawingContext.fillStyle = background;
  drawingContext.fillRect(0, 0, width, height);

  drawShareSun(drawingContext, 880, 166);
  drawShareMapPreview(drawingContext, 92, 214, 896, 530);

  drawShareText(drawingContext, COPY.share.title, 92, 120, 700, 72, "#142233", 1000);
  drawShareText(drawingContext, COPY.result.bestUpdated, 94, 182, 520, 34, "#137b83", 900);
  drawShareTurtle(drawingContext, 846, 122, 2.1);

  drawSharePanel(drawingContext, 92, 812, 896, 330);
  drawShareText(drawingContext, COPY.terms.score, 146, 902, 250, 36, "#5d6b7d", 900);
  drawShareText(drawingContext, formatNumber(record.score), 146, 1038, 520, 118, "#142233", 1000);
  drawShareTag(drawingContext, record.randomName, 622, 882, 288, 64, "#e9fff0", "#137b5c");
  drawShareText(drawingContext, payload.rankInfo.rankLabel, 654, 1056, 260, 74, "#127a82", 1000, "center");

  drawShareStatCard(drawingContext, COPY.ui.ranking, payload.rankInfo.rankLabel, 92, 1194, 280, 180);
  drawShareStatCard(drawingContext, COPY.terms.delivery, `${record.deliveries}件`, 400, 1194, 280, 180);
  drawShareStatCard(drawingContext, COPY.terms.combo, `${record.combo}${COPY.terms.combo}`, 708, 1194, 280, 180);

  drawSharePanel(drawingContext, 92, 1454, 896, 248);
  drawShareText(drawingContext, COPY.ui.shareLead, 540, 1534, 720, 44, "#142233", 1000, "center");
  drawShareText(drawingContext, COPY.ui.shareSub, 540, 1602, 720, 34, "#5d6b7d", 900, "center");
  drawShareText(drawingContext, COPY.share.url.replace("https://", ""), 540, 1666, 720, 34, "#137b83", 1000, "center");

  drawShareText(drawingContext, COPY.ui.shareTagline, 540, 1812, 760, 42, "#142233", 1000, "center");
  return canvas;
}

function drawSharePanel(drawingContext, x, y, width, height) {
  drawingContext.save();
  drawingContext.shadowColor = "rgb(32 69 75 / 16%)";
  drawingContext.shadowBlur = 28;
  drawingContext.shadowOffsetY = 12;
  drawingContext.fillStyle = "rgb(255 255 255 / 92%)";
  roundedRect(x, y, width, height, 42, drawingContext);
  drawingContext.fill();
  drawingContext.shadowColor = "transparent";
  drawingContext.strokeStyle = "rgb(19 123 131 / 16%)";
  drawingContext.lineWidth = 4;
  drawingContext.stroke();
  drawingContext.restore();
}

function drawShareMapPreview(drawingContext, x, y, width, height) {
  drawingContext.save();
  drawSharePanel(drawingContext, x, y, width, height);
  roundedRect(x + 24, y + 24, width - 48, height - 48, 34, drawingContext);
  drawingContext.clip();
  drawingContext.fillStyle = "#9bdca4";
  drawingContext.fillRect(x + 24, y + 24, width - 48, height - 48);

  const houseColors = ["#ffdd70", "#f58b6e", "#9ccfe5", "#bba4e8", "#cce59f"];
  [
    [95, 72, 96, 82],
    [252, 78, 92, 78],
    [640, 76, 110, 82],
    [108, 318, 104, 86],
    [544, 312, 108, 90],
    [722, 306, 112, 86],
  ].forEach(([offsetX, offsetY, blockWidth, blockHeight], index) => {
    drawingContext.fillStyle = houseColors[index % houseColors.length];
    roundedRect(x + offsetX, y + offsetY, blockWidth, blockHeight, 14, drawingContext);
    drawingContext.fill();
    drawingContext.fillStyle = "rgb(20 34 51 / 12%)";
    roundedRect(x + offsetX + 28, y + offsetY + 24, blockWidth - 56, 24, 6, drawingContext);
    drawingContext.fill();
  });

  drawingContext.fillStyle = "#596777";
  roundedRect(x + 24, y + 220, width - 48, 118, 0, drawingContext);
  drawingContext.fill();
  drawingContext.fillStyle = "#647282";
  roundedRect(x + 384, y + 24, 116, height - 48, 0, drawingContext);
  drawingContext.fill();
  drawingContext.strokeStyle = "#f6d66a";
  drawingContext.lineWidth = 12;
  drawingContext.setLineDash([38, 38]);
  drawingContext.beginPath();
  drawingContext.moveTo(x + 66, y + 278);
  drawingContext.lineTo(x + width - 66, y + 278);
  drawingContext.moveTo(x + 442, y + 68);
  drawingContext.lineTo(x + 442, y + height - 68);
  drawingContext.stroke();
  drawingContext.setLineDash([]);

  drawingContext.lineCap = "round";
  drawingContext.strokeStyle = "#f0bf39";
  drawingContext.lineWidth = 18;
  drawingContext.beginPath();
  drawingContext.moveTo(x + 172, y + 278);
  drawingContext.lineTo(x + 424, y + 278);
  drawingContext.stroke();
  drawingContext.strokeStyle = "#ef5d58";
  drawingContext.beginPath();
  drawingContext.moveTo(x + 500, y + 278);
  drawingContext.lineTo(x + 752, y + 278);
  drawingContext.stroke();
  drawingContext.lineCap = "butt";

  drawShareBag(drawingContext, x + 442, y + 278, 2.4);
  drawShareHome(drawingContext, x + 790, y + 278, 2.4);
  drawShareTurtle(drawingContext, x + 230, y + 290, 1.9);
  drawingContext.restore();
}

function drawShareSun(drawingContext, x, y) {
  drawingContext.save();
  drawingContext.fillStyle = "rgb(255 217 106 / 45%)";
  drawingContext.beginPath();
  drawingContext.arc(x, y, 96, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.fillStyle = "#ffd96a";
  drawingContext.beginPath();
  drawingContext.arc(x, y, 58, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.restore();
}

function drawShareTurtle(drawingContext, x, y, scale = 1) {
  drawingContext.save();
  drawingContext.translate(x, y);
  drawingContext.scale(scale, scale);
  drawingContext.fillStyle = "#0f6d60";
  drawingContext.beginPath();
  drawingContext.ellipse(24, -2, 17, 15, 0, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.fillStyle = "#ffe7a2";
  drawingContext.beginPath();
  drawingContext.arc(31, -6, 2.2, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.strokeStyle = "#142233";
  drawingContext.lineWidth = 2.2;
  drawingContext.lineCap = "round";
  drawingContext.beginPath();
  drawingContext.moveTo(32, 4);
  drawingContext.quadraticCurveTo(26, 9, 20, 5);
  drawingContext.stroke();
  drawingContext.fillStyle = "#0f6d60";
  [-16, 16].forEach((footX) => {
    drawingContext.beginPath();
    drawingContext.ellipse(footX, 17, 10, 7, 0, 0, Math.PI * 2);
    drawingContext.fill();
  });
  drawingContext.fillStyle = "#56bd6f";
  drawingContext.beginPath();
  drawingContext.ellipse(0, 0, 29, 26, 0, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.strokeStyle = "#0f6d60";
  drawingContext.lineWidth = 4;
  drawingContext.stroke();
  drawingContext.strokeStyle = "rgb(255 255 255 / 44%)";
  drawingContext.lineWidth = 3;
  drawingContext.beginPath();
  drawingContext.moveTo(-18, -2);
  drawingContext.quadraticCurveTo(0, -16, 18, -2);
  drawingContext.moveTo(-12, 12);
  drawingContext.quadraticCurveTo(0, 1, 12, 12);
  drawingContext.stroke();
  drawingContext.restore();
}

function drawShareBag(drawingContext, x, y, scale = 1) {
  drawingContext.save();
  drawingContext.translate(x, y);
  drawingContext.scale(scale, scale);
  drawingContext.strokeStyle = "#9a6b12";
  drawingContext.lineWidth = 3.5;
  drawingContext.beginPath();
  drawingContext.arc(0, -10, 9, Math.PI, 0);
  drawingContext.stroke();
  drawingContext.fillStyle = "#f0bf39";
  roundedRect(-18, -10, 36, 28, 7, drawingContext);
  drawingContext.fill();
  drawingContext.strokeStyle = "#9a6b12";
  drawingContext.lineWidth = 2.5;
  drawingContext.stroke();
  drawingContext.fillStyle = "rgb(255 255 255 / 35%)";
  roundedRect(-11, -3, 22, 6, 3, drawingContext);
  drawingContext.fill();
  drawingContext.restore();
}

function drawShareHome(drawingContext, x, y, scale = 1) {
  drawingContext.save();
  drawingContext.translate(x, y);
  drawingContext.scale(scale, scale);
  drawingContext.fillStyle = "#ef5d58";
  drawingContext.beginPath();
  drawingContext.moveTo(0, -24);
  drawingContext.lineTo(27, -1);
  drawingContext.lineTo(-27, -1);
  drawingContext.closePath();
  drawingContext.fill();
  drawingContext.fillStyle = "#fff8ec";
  roundedRect(-22, -1, 44, 32, 7, drawingContext);
  drawingContext.fill();
  drawingContext.fillStyle = "#137b83";
  roundedRect(-5, 13, 10, 18, 4, drawingContext);
  drawingContext.fill();
  drawingContext.fillStyle = "#f0bf39";
  roundedRect(9, 8, 9, 8, 3, drawingContext);
  drawingContext.fill();
  drawingContext.restore();
}

function drawShareStatCard(drawingContext, label, value, x, y, width, height) {
  drawSharePanel(drawingContext, x, y, width, height);
  drawShareText(drawingContext, label, x + width / 2, y + 58, width - 52, 30, "#5d6b7d", 900, "center");
  drawShareText(drawingContext, value, x + width / 2, y + 126, width - 52, 56, "#142233", 1000, "center");
}

function drawShareTag(drawingContext, text, x, y, width, height, background, color) {
  drawingContext.save();
  drawingContext.fillStyle = background;
  roundedRect(x, y, width, height, height / 2, drawingContext);
  drawingContext.fill();
  drawingContext.strokeStyle = "rgb(19 123 131 / 20%)";
  drawingContext.lineWidth = 3;
  drawingContext.stroke();
  drawingContext.restore();
  drawShareText(drawingContext, text, x + width / 2, y + height / 2 + 13, width - 44, 28, color, 1000, "center");
}

function drawShareText(drawingContext, text, x, y, maxWidth, size, color, weight = 900, align = "left") {
  let fontSize = size;
  drawingContext.save();
  drawingContext.textAlign = align;
  drawingContext.textBaseline = "alphabetic";
  drawingContext.fillStyle = color;
  drawingContext.font = canvasFont(weight, fontSize);
  while (fontSize > 20 && drawingContext.measureText(text).width > maxWidth) {
    fontSize -= 2;
    drawingContext.font = canvasFont(weight, fontSize);
  }
  drawingContext.fillText(text, x, y);
  drawingContext.restore();
}

function canvasFont(weight, size) {
  return `${weight} ${size}px ${ROUNDED_FONT_FAMILY}`;
}

function canvasToPngBlob(canvas) {
  if (canvas.toBlob) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas export failed"));
      }, "image/png");
    });
  }

  return Promise.resolve(dataUrlToBlob(canvas.toDataURL("image/png")));
}

function dataUrlToBlob(dataUrl) {
  const [header, data] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] ?? "image/png";
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], { type: mime });
}

function downloadBlob(blob, filename) {
  const imageUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1200);
}

function renderResultMedals(record) {
  const medals = [];

  if (record.collisions === 0 && record.deliveries > 0) {
    medals.push({
      label: COPY.medals.noCollision,
      value: COPY.medals.noCollisionDescription,
      tone: "gold",
    });
  }

  resultMedals.innerHTML = medals
    .map(
      (medal) => `
        <span class="is-${medal.tone}">
          <b>${COPY.medals.heading}</b>
          <strong>${medal.label}</strong>
          <small>${medal.value}</small>
        </span>
      `,
    )
    .join("");
  resultMedals.classList.toggle("is-hidden", medals.length === 0);
}

function renderResultBreakdown(record) {
  const items = getResultBreakdownItems(record);
  resultBreakdown.innerHTML = items
    .map(
      (item) => `
        <span class="${item.value < 0 ? "is-negative" : ""}">
          <small>${item.label}</small>
          <b>${formatSignedNumber(item.value)}</b>
        </span>
      `,
    )
    .join("");
}

function getResultBreakdownItems(record) {
  const breakdown = { ...createEmptyScoreBreakdown(), ...(record.scoreBreakdown ?? {}) };
  const items = [
    {
      label: COPY.scoreBreakdown.delivery,
      value: breakdown.pickup + breakdown.delivery + breakdown.distance,
    },
    {
      label: COPY.scoreBreakdown.fastMulti,
      value: breakdown.fast + breakdown.combo + breakdown.multi,
    },
    {
      label: COPY.scoreBreakdown.bonus,
      value: breakdown.bonus + breakdown.event + breakdown.near,
    },
    {
      label: COPY.scoreBreakdown.penalty,
      value: breakdown.penalty,
    },
  ].filter((item) => item.value !== 0);

  if (items.length === 0) {
    return [{ label: COPY.scoreBreakdown.next, value: 0 }];
  }

  return items.slice(0, 4);
}

function renderResultNextMoves(record, rankInfo, previousSessionBest) {
  const moves = getResultNextMoves(record, rankInfo, previousSessionBest);
  resultNextMoves.innerHTML = moves
    .map(
      (move, index) => `
        <span class="${index === 0 ? "is-primary" : ""}">
          <small>${move.label}</small>
          <b>${move.value}</b>
        </span>
      `,
    )
    .join("");
}

function getResultNextMoves(record, rankInfo, previousSessionBest) {
  const moves = [];

  if (record.deliveries === 0) {
    moves.push({ label: COPY.nextMoves.firstLabel, value: COPY.nextMoves.firstValue });
    return moves;
  }

  if (rankInfo.gap > 0) {
    moves.push({
      label: copyText(COPY.rankingText.rankTarget, { rank: rankInfo.rank - 1 }),
      value: `あと${formatNumber(rankInfo.gap)}`,
    });
  }
  if (record.score < previousSessionBest && previousSessionBest > 0) {
    moves.push({ label: COPY.result.bestTarget, value: `あと${formatNumber(previousSessionBest - record.score + 1)}` });
  }
  if (record.deliveries < 12) moves.push({ label: COPY.nextMoves.deliveryCount, value: `あと${12 - record.deliveries}件で12件` });
  if (record.collisions > 0) moves.push({ label: COPY.ui.shellGuard, value: COPY.nextMoves.shellGuardValue });
  if ((record.maxCarry ?? 0) < 2) moves.push({ label: COPY.nextMoves.multiDelivery, value: COPY.nextMoves.multiDeliveryValue });
  if ((record.supportPickups ?? 0) < 2) moves.push({ label: COPY.nextMoves.toolPickup, value: COPY.nextMoves.toolPickupValue });
  if ((record.bonuses ?? 0) === 0) moves.push({ label: COPY.ui.clock, value: COPY.nextMoves.clockValue });
  if (record.combo < 3) moves.push({ label: COPY.terms.combo, value: `あと${Math.max(1, 3 - record.combo)}件` });
  if ((record.nearMisses ?? 0) === 0 && record.deliveries >= 5) moves.push({ label: COPY.nextMoves.nearMiss, value: COPY.nextMoves.nearMissValue });
  if (record.deliveries < 8) moves.push({ label: COPY.terms.delivery, value: `あと${8 - record.deliveries}件` });

  moves.push({ label: COPY.buttons.retry, value: COPY.nextMoves.retryValue });
  return moves.slice(0, 2);
}

function renderResultHighlights(record) {
  const highlights = getResultHighlights(record);
  resultHighlights.innerHTML = highlights
    .map(
      (item, index) => `
        <span class="${index === 0 ? "is-hot" : ""}">
          <small>${item.label}</small>
          <b>${item.value}</b>
        </span>
      `,
    )
    .join("");
}

function getResultHighlights(record) {
  const delivery = record.deliveries > 0 ? `${record.deliveries}件` : "0件";
  const combo = record.combo > 0 ? `${record.combo}${COPY.terms.combo}` : "0連便";
  const collisions = `${record.collisions}回`;

  return [
    { label: COPY.ui.deliveryCount, value: delivery },
    { label: COPY.ui.maxCombo, value: combo },
    { label: COPY.ui.collisionCount, value: collisions },
  ];
}

function getResultTip(record) {
  const itemPickups = getRecordItemPickups(record);
  if (record.deliveries === 0) return COPY.resultTips.firstBag;
  if (record.collisions >= 3) return COPY.resultTips.shield;
  if ((record.maxCarry ?? 0) < 2) return COPY.resultTips.multiDelivery;
  if ((record.supportPickups ?? 0) < 2) return COPY.resultTips.toolPickup;
  if ((itemPickups.clock ?? 0) === 0) return COPY.resultTips.clock;
  if (record.combo < 3) return COPY.resultTips.combo;
  if (record.collisions >= 2) return COPY.resultTips.flight;
  if (record.deliveries < 8) return COPY.resultTips.shortcut;
  if ((record.nearMisses ?? 0) === 0) return COPY.resultTips.nearMiss;
  return COPY.resultTips.toolUse;
}

function getResultGrade(record) {
  if (record.deliveries >= 12 && record.collisions === 0) return { key: "ss", label: "SS" };
  if (record.score >= 6800 || record.deliveries >= 11) return { key: "s", label: "S" };
  if (record.score >= 4800 || record.deliveries >= 8) return { key: "a", label: "A" };
  if (record.score >= 2800 || record.deliveries >= 5) return { key: "b", label: "B" };
  if (record.deliveries >= 1) return { key: "c", label: "C" };
  return { key: "d", label: "D" };
}

function updateHud() {
  const isLastSpurt = isLastSpurtActive();
  gameColumn.dataset.runStatus = activeRun.status;
  startButton.classList.toggle("is-guide-hidden", activeRun.status === "idle" && !startGuide.classList.contains("is-hidden"));
  setTextIfChanged(timeValue, activeRun.timeLeft.toFixed(1));
  const timeProgress = clamp(activeRun.timeLeft / GAME_SECONDS, 0, 1);
  setStyleIfChanged(timeGaugeFill, "transform", `scaleX(${timeProgress})`);
  setTextIfChanged(scoreValue, formatNumber(activeRun.score));
  scoreCard.classList.toggle("is-score-pop", activeRun.scorePulse > 0);
  setTextIfChanged(scoreGoal, getScoreGoalLabel());
  scoreCard.classList.toggle("is-best-ahead", activeRun.status === "running" && activeRun.bestTarget > 0 && activeRun.score > activeRun.bestTarget);
  setTextIfChanged(scoreDelta, getScoreDeltaLabel());
  scoreDelta.classList.toggle("is-negative", activeRun.scoreDelta < 0);
  setTextIfChanged(deliveryValue, activeRun.deliveries);
  setTextIfChanged(comboValue, activeRun.combo);
  updateComboMeter();
  updateManualItems();
  timeCard.classList.toggle("is-danger", activeRun.status === "running" && activeRun.timeLeft <= 6);
  timeCard.classList.toggle("is-warning", activeRun.status === "running" && activeRun.timeLeft <= 12);
  timeCard.classList.toggle("is-last-spurt", isLastSpurt);
  document.body.classList.toggle("is-rush", activeRun.status === "running" && activeRun.rush > 0);
  document.body.classList.toggle("is-last-spurt", isLastSpurt);
}

function setTextIfChanged(element, value) {
  const nextValue = String(value ?? "");
  if (element.textContent !== nextValue) {
    element.textContent = nextValue;
  }
}

function setStyleIfChanged(element, property, value) {
  if (element.style[property] !== value) {
    element.style[property] = value;
  }
}

function getScoreGoalLabel() {
  if (activeRun.bestTarget <= 0) {
    return "";
  }

  if (activeRun.status !== "running") {
    return `最高${formatShortNumber(activeRun.bestTarget)}`;
  }

  const remaining = activeRun.bestTarget - activeRun.score + 1;
  return remaining <= 0 ? COPY.result.highestUpdated : `あと${formatShortNumber(remaining)}`;
}

function updateTargetDistance() {
  return;
}

function updateComboMeter() {
  const progress = activeRun.combo % 3 || (activeRun.combo > 0 ? 3 : 0);
  const isNearRush = activeRun.status === "running" && activeRun.rush <= 0 && activeRun.combo % 3 === 2;
  const isRushing = activeRun.status === "running" && activeRun.rush > 0;
  comboMeterDots.forEach((item, index) => {
    item.classList.toggle("is-filled", index < progress);
  });
  comboCard.classList.toggle("is-near-rush", isNearRush);
  comboCard.classList.toggle("is-rush", isRushing);
  comboMeter.classList.toggle("is-near-rush", isNearRush);
  comboMeter.classList.toggle("is-rush", isRushing);
}

function updateChainHint() {
  return;
}

function drawScene() {
  syncCanvasSize();
  ctx.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  const camera = getCamera();
  const shake = getScreenShake();

  ctx.save();
  ctx.translate(shake.x, shake.y);
  ctx.scale(camera.scale, camera.scale);
  ctx.translate(-camera.x, -camera.y);
  drawMap(camera);
  if (activeRun.status === "idle") {
    drawTargetRoute();
    drawJob();
    drawPlayer();
  } else {
    drawRoadEvents();
    drawTargetRoute();
    drawJob();
    drawBonus();
    drawSupportItems();
    drawHazards();
    drawInputDirectionIndicator();
    drawComboFocusRing();
    drawMovementTrail();
    drawWarpTrail();
    drawPlayer();
    drawEffects();
  }
  ctx.restore();

  if (activeRun.flash > 0) {
    ctx.fillStyle = "rgb(255 255 255 / 20%)";
    ctx.fillRect(0, 0, viewport.width, viewport.height);
  }

  drawLastSpurtVignette();
  drawEdgeHint(camera);
  drawBonusEdgeHint(camera);
  drawStatusText();
  drawScreenTexts();
  drawTouchControl();
}

function triggerShake(power, duration) {
  const safePower = Math.min(power, MAX_SHAKE_PIXELS);
  if (activeRun.shake > 0 && activeRun.shakePower > safePower) return;

  activeRun.shake = duration;
  activeRun.shakeDuration = duration;
  activeRun.shakePower = safePower;
}

function getScreenShake() {
  if (activeRun.shake <= 0 || activeRun.shakeDuration <= 0) {
    return { x: 0, y: 0 };
  }

  const ratio = activeRun.shake / activeRun.shakeDuration;
  const power = activeRun.shakePower * ratio * ratio;
  const t = performance.now();

  return {
    x: Math.sin(t * 0.08) * power,
    y: Math.cos(t * 0.11) * power * 0.75,
  };
}

function drawLastSpurtVignette() {
  if (!isLastSpurtActive()) return;

  const pulse = (Math.sin(performance.now() * 0.018) + 1) * 0.5;
  ctx.save();
  ctx.strokeStyle = `rgb(232 93 86 / ${0.42 + pulse * 0.28})`;
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, viewport.width - 10, viewport.height - 10);
  ctx.fillStyle = `rgb(232 93 86 / ${0.06 + pulse * 0.06})`;
  ctx.fillRect(0, 0, viewport.width, viewport.height);
  ctx.restore();
}

function syncCanvasSize() {
  if (!canvasSizeDirty && canvas.width > 0 && canvas.height > 0) return;

  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width || canvas.clientWidth || canvas.width));
  const height = Math.max(1, Math.round(rect.height || canvas.clientHeight || canvas.height));
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
  const backingWidth = Math.round(width * dpr);
  const backingHeight = Math.round(height * dpr);

  viewport.width = width;
  viewport.height = height;
  viewport.dpr = dpr;

  if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
    canvas.width = backingWidth;
    canvas.height = backingHeight;
  }

  canvasSizeDirty = false;
}

function getCamera() {
  const scale = 1.28;
  const visibleWidth = viewport.width / scale;
  const visibleHeight = viewport.height / scale;
  const player = activeRun.player;
  const anchor = getCameraAnchor();
  const x = clamp(player.x - visibleWidth * anchor.x, 0, WORLD_WIDTH - visibleWidth);
  const y = clamp(player.y - visibleHeight * anchor.y, 0, WORLD_HEIGHT - visibleHeight);

  return {
    x,
    y,
    scale,
    visibleWidth,
    visibleHeight,
  };
}

function getCameraAnchor() {
  if (activeRun.status === "idle") {
    return { x: 0.5, y: CAMERA_IDLE_Y_ANCHOR };
  }

  return { x: 0.5, y: CAMERA_DEFAULT_Y_ANCHOR };
}

function drawMap(camera) {
  ctx.fillStyle = "#82b88a";
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  const bounds = getVisibleTileBounds(camera);

  for (let row = bounds.minRow; row <= bounds.maxRow; row += 1) {
    for (let col = bounds.minCol; col <= bounds.maxCol; col += 1) {
      const x = col * TILE;
      const y = row * TILE;

      if (isRiverCell({ col, row }) && !isBridgeCell({ col, row })) {
        drawRiverTile(col, row, x, y);
      } else if (map.road[row][col]) {
        if (isBridgeCell({ col, row })) {
          drawRiverTile(col, row, x, y);
          drawBridgeTile(col, row, x, y);
        } else {
          drawRoadTile(col, row, x, y);
        }
        drawRoadMarking(col, row, x, y);
      } else {
        drawBuilding(col, row, x, y);
      }
    }
  }

  drawDiagonalAlleys();

  ctx.strokeStyle = "rgb(22 33 47 / 12%)";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
}

function getVisibleTileBounds(camera) {
  if (!camera) {
    return {
      minCol: 0,
      maxCol: COLS - 1,
      minRow: 0,
      maxRow: ROWS - 1,
    };
  }

  return {
    minCol: clamp(Math.floor(camera.x / TILE) - MAP_CULL_PADDING_TILES, 0, COLS - 1),
    maxCol: clamp(Math.ceil((camera.x + camera.visibleWidth) / TILE) + MAP_CULL_PADDING_TILES, 0, COLS - 1),
    minRow: clamp(Math.floor(camera.y / TILE) - MAP_CULL_PADDING_TILES, 0, ROWS - 1),
    maxRow: clamp(Math.ceil((camera.y + camera.visibleHeight) / TILE) + MAP_CULL_PADDING_TILES, 0, ROWS - 1),
  };
}

function drawRoadTile(col, row, x, y) {
  const hasLeft = map.road[row]?.[col - 1];
  const hasRight = map.road[row]?.[col + 1];
  const hasUp = map.road[row - 1]?.[col];
  const hasDown = map.road[row + 1]?.[col];
  const texture = Math.abs(hashString(`road:${map.seed}:${col}:${row}`)) % 4;

  ctx.fillStyle = "#56616a";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = texture % 2 === 0 ? "rgb(255 255 255 / 2%)" : "rgb(0 0 0 / 2%)";
  ctx.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);

  ctx.fillStyle = "#d5ceb9";
  if (!hasLeft) ctx.fillRect(x, y, 4, TILE);
  if (!hasRight) ctx.fillRect(x + TILE - 4, y, 4, TILE);
  if (!hasUp) ctx.fillRect(x, y, TILE, 4);
  if (!hasDown) ctx.fillRect(x, y + TILE - 4, TILE, 4);
}

function drawRiverTile(col, row, x, y) {
  const texture = Math.abs(hashString(`river:${map.seed}:${col}:${row}`)) % 4;
  ctx.fillStyle = "#49aebd";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = texture % 2 === 0 ? "rgb(255 255 255 / 10%)" : "rgb(10 76 94 / 10%)";
  ctx.fillRect(x, y, TILE, TILE);

  ctx.strokeStyle = "rgb(223 252 255 / 42%)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.setLineDash([8, 12]);
  const offset = ((performance.now() / 140) + texture * 5) % 20;
  if (map.riverOrientation === "horizontal") {
    for (let line = 9; line < TILE; line += 16) {
      ctx.beginPath();
      ctx.moveTo(x - offset, y + line);
      ctx.lineTo(x + TILE + 8, y + line - 3);
      ctx.stroke();
    }
  } else {
    for (let line = 9; line < TILE; line += 16) {
      ctx.beginPath();
      ctx.moveTo(x + line, y - offset);
      ctx.lineTo(x + line + 3, y + TILE + 8);
      ctx.stroke();
    }
  }
  ctx.setLineDash([]);
}

function drawBridgeTile(col, row, x, y) {
  const isHorizontalBridge = map.road[row]?.[col - 1] || map.road[row]?.[col + 1];

  ctx.fillStyle = "#645c50";
  roundedRect(x + 2, y + 2, TILE - 4, TILE - 4, 5);
  ctx.fill();
  ctx.fillStyle = "#b8955e";
  roundedRect(x + 5, y + 5, TILE - 10, TILE - 10, 5);
  ctx.fill();

  ctx.strokeStyle = "rgb(74 55 36 / 32%)";
  ctx.lineWidth = 2;
  if (isHorizontalBridge) {
    for (let line = y + 10; line < y + TILE - 4; line += 10) {
      ctx.beginPath();
      ctx.moveTo(x + 6, line);
      ctx.lineTo(x + TILE - 6, line);
      ctx.stroke();
    }
  } else {
    for (let line = x + 10; line < x + TILE - 4; line += 10) {
      ctx.beginPath();
      ctx.moveTo(line, y + 6);
      ctx.lineTo(line, y + TILE - 6);
      ctx.stroke();
    }
  }

  ctx.strokeStyle = "rgb(255 255 255 / 28%)";
  ctx.lineWidth = 2;
  roundedRect(x + 5, y + 5, TILE - 10, TILE - 10, 5);
  ctx.stroke();
}

function drawRoadMarking(col, row, x, y) {
  const hasLeft = map.road[row]?.[col - 1];
  const hasRight = map.road[row]?.[col + 1];
  const hasUp = map.road[row - 1]?.[col];
  const hasDown = map.road[row + 1]?.[col];
  const isHorizontalStraight = hasLeft && hasRight && !hasUp && !hasDown;
  const isVerticalStraight = hasUp && hasDown && !hasLeft && !hasRight;

  ctx.strokeStyle = "rgb(238 213 111 / 84%)";
  ctx.lineWidth = 2.3;
  ctx.setLineDash([9, 15]);

  if (isHorizontalStraight) {
    ctx.beginPath();
    ctx.moveTo(x + 4, y + TILE / 2);
    ctx.lineTo(x + TILE - 4, y + TILE / 2);
    ctx.stroke();
  }

  if (isVerticalStraight) {
    ctx.beginPath();
    ctx.moveTo(x + TILE / 2, y + 4);
    ctx.lineTo(x + TILE / 2, y + TILE - 4);
    ctx.stroke();
  }

  ctx.setLineDash([]);
}

function drawDiagonalAlleys() {
  (map.diagonalAlleys ?? []).forEach((alley) => {
    const from = toCanvasPoint(alley.from);
    const to = toCanvasPoint(alley.to);
    const pulse = (Math.sin(performance.now() * 0.008 + alley.cutCell.col) + 1) * 0.5;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgb(20 32 50 / 20%)";
    ctx.lineWidth = 31;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = "#65717b";
    ctx.lineWidth = 26;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = `rgb(241 215 109 / ${0.48 + pulse * 0.2})`;
    ctx.lineWidth = 3;
    ctx.setLineDash([7, 9]);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  });
}

function drawBuilding(col, row, x, y) {
  const palette = ["#d9c476", "#c98d7a", "#8fb3c0", "#a5bf8b", "#b2a7ca"];
  const pick = Math.abs(hashString(`${map.seed}:${col}:${row}`)) % palette.length;
  const inset = 8 + (Math.abs(hashString(`inset:${col}:${row}`)) % 3);
  const roofX = x + inset;
  const roofY = y + inset;
  const roofWidth = TILE - inset * 2;
  const roofHeight = TILE - inset * 2;
  const cornerRadii = getBuildingCornerRadii(col, row, BUILDING_CORNER_RADIUS);

  ctx.fillStyle = "#56616a";
  ctx.fillRect(x, y, TILE, TILE);

  ctx.fillStyle = "#76ad7d";
  roundedRectCorners(x, y, TILE, TILE, cornerRadii);
  ctx.fill();

  ctx.fillStyle = "rgb(255 255 255 / 10%)";
  roundedRectCorners(
    x + 4,
    y + 4,
    TILE - 8,
    TILE - 8,
    {
      topLeft: Math.max(0, cornerRadii.topLeft - 4),
      topRight: Math.max(0, cornerRadii.topRight - 4),
      bottomRight: Math.max(0, cornerRadii.bottomRight - 4),
      bottomLeft: Math.max(0, cornerRadii.bottomLeft - 4),
    },
  );
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 10%)";
  roundedRect(roofX + 2, roofY + 2, roofWidth, roofHeight, 6);
  ctx.fill();

  ctx.fillStyle = palette[pick];
  roundedRect(roofX, roofY, roofWidth, roofHeight, 6);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 24%)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "rgb(20 32 50 / 9%)";
  roundedRect(roofX + 6, roofY + 7, 8, 6, 2);
  ctx.fill();
  ctx.fillStyle = "rgb(255 255 255 / 11%)";
  ctx.fillRect(roofX + 4, roofY + 4, Math.max(8, roofWidth - 8), 2);
}

function getBuildingCornerRadii(col, row, radius) {
  const openLeft = isRoadOrOutside(row, col - 1);
  const openRight = isRoadOrOutside(row, col + 1);
  const openUp = isRoadOrOutside(row - 1, col);
  const openDown = isRoadOrOutside(row + 1, col);

  return {
    topLeft: openLeft && openUp ? radius : 0,
    topRight: openRight && openUp ? radius : 0,
    bottomRight: openRight && openDown ? radius : 0,
    bottomLeft: openLeft && openDown ? radius : 0,
  };
}

function isRoadOrOutside(row, col) {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return true;
  return map.road[row][col] || map.river?.[row]?.[col];
}

function drawTargetRoute() {
  if (activeRun.status === "ended") return;

  const playerCell = getPlayerCell(activeRun.player);
  const carriedCount = getCarriedCount();
  const canShowPickupRoute = carriedCount < MAX_CARRY_PACKAGES;
  const canShowDestinationRoute = carriedCount > 0;
  const preferredPickup = canShowPickupRoute && getAvailablePickupChoices(currentJob).length > 0 ? getPreferredPickupChoice() : null;
  const dashOffset = (performance.now() / 70) % 16;
  const isPreview = activeRun.status !== "running";

  if (preferredPickup) {
    drawRoutePath({
      fromPoint: activeRun.player,
      route: findRoadRoute(playerCell, preferredPickup.cell),
      targetCell: preferredPickup.cell,
      routeColor: "240 191 57",
      dashOffset: dashOffset + (activeRun.carrying ? 5 : 0),
      isPreview: isPreview || activeRun.carrying,
      width: activeRun.carrying ? 4 : isPreview ? 5 : 6,
      alphaScale: activeRun.carrying ? 0.78 : 1,
    });
  }

  if (canShowDestinationRoute) {
    drawRoutePath({
      fromPoint: activeRun.player,
      route: findRoadRoute(playerCell, currentJob.destination),
      targetCell: currentJob.destination,
      routeColor: "232 93 86",
      dashOffset: dashOffset,
      isPreview,
      width: isPreview ? 5 : 6,
      alphaScale: 1,
    });
  }
}

function drawRoutePath({ fromPoint, route, targetCell, routeColor, dashOffset, isPreview, width, alphaScale = 1, skipFirstPoint = false }) {
  const routePoints = route.length > 1 ? route.map(toCanvasPoint) : [toCanvasPoint(targetCell)];
  const points = skipFirstPoint ? routePoints.slice(1) : routePoints;
  if (points.length === 0) return;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash(isPreview ? [5, 11] : [7, 9]);
  ctx.lineDashOffset = -dashOffset;

  ctx.strokeStyle = `rgb(255 255 255 / ${(isPreview ? 48 : 62) * alphaScale}%)`;
  ctx.lineWidth = width + 4;
  ctx.beginPath();
  ctx.moveTo(fromPoint.x, fromPoint.y);
  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  ctx.strokeStyle = `rgb(${routeColor} / ${(isPreview ? 64 : 86) * alphaScale}%)`;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(fromPoint.x, fromPoint.y);
  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  const arrowPoint = points.find((point) => Math.hypot(point.x - fromPoint.x, point.y - fromPoint.y) > 6);
  if (arrowPoint) {
    drawRouteArrow(fromPoint, arrowPoint, routeColor, isPreview, alphaScale);
  }

  ctx.restore();
}

function drawRouteArrow(fromPoint, point, routeColor, isPreview = false, alphaScale = 1) {
  const dx = point.x - fromPoint.x;
  const dy = point.y - fromPoint.y;
  const length = Math.hypot(dx, dy);
  if (length < 6) return;

  const x = fromPoint.x + (dx / length) * 42;
  const y = fromPoint.y + (dy / length) * 42;
  const angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = `rgb(${routeColor} / ${(isPreview ? 78 : 92) * alphaScale}%)`;
  ctx.strokeStyle = `rgb(255 255 255 / ${(isPreview ? 76 : 92) * alphaScale}%)`;
  ctx.lineWidth = isPreview ? 2.5 : 3;
  ctx.beginPath();
  ctx.moveTo(12, 0);
  ctx.lineTo(-7, -8);
  ctx.lineTo(-3, 0);
  ctx.lineTo(-7, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawJob() {
  const destination = toCanvasPoint(currentJob.destination);

  if (getAvailablePickupChoices(currentJob).length > 0) {
    const preferred = getPreferredPickupChoice();
    getAvailablePickupChoices(currentJob).forEach((choice, index) => {
      const pickup = toCanvasPoint(choice.cell);
      const isPreferred = preferred && cellKey(preferred.cell) === cellKey(choice.cell);
      drawPickupMarker(pickup.x, pickup.y, choice, index, isPreferred);
    });
  }

  if (activeRun.carrying) {
    const fastPreview = getFastDeliveryPreview();
    if (fastPreview.bonus > 0) {
      drawFastDeliveryHalo(destination.x, destination.y, fastPreview.bonus);
    }
  }

  drawDestinationMarker(destination.x, destination.y);
}

function drawPickupMarker(x, y, choice, index, isPreferred) {
  const badgeText = choice.bonus > 0 ? `+${choice.bonus}` : `${index + 1}`;
  const focus = getTargetFocusStrength("pickup", choice.cell);
  const pulse = isPreferred && activeRun.status === "running" ? 1.5 + Math.sin(performance.now() / 170) * 1.5 : 0;
  const focusPulse = focus > 0 ? 8 * focus + Math.sin(performance.now() / 90) * 2 : 0;

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgb(240 191 57 / ${isPreferred || focus > 0 ? 0.2 : 0.1})`;
  ctx.beginPath();
  ctx.arc(0, 0, 21 + pulse + focusPulse, 0, Math.PI * 2);
  ctx.fill();

  if (focus > 0) {
    ctx.strokeStyle = `rgb(255 255 255 / ${0.45 + focus * 0.38})`;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(0, 0, 30 + focusPulse * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "rgb(20 32 50 / 18%)";
  ctx.beginPath();
  ctx.ellipse(0, 14, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  drawPackageCanvasIcon(x, y, 0.94, isPreferred ? "#d79737" : "#c9a066");

  ctx.save();
  ctx.translate(x + 17, y - 17);
  ctx.fillStyle = isPreferred ? "rgb(20 32 50 / 88%)" : "rgb(20 32 50 / 66%)";
  roundedRect(-12, -8, 24, 16, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = canvasFont(1000, 9);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(badgeText, 0, 0);
  ctx.restore();
}

function drawDestinationMarker(x, y) {
  const focus = getTargetFocusStrength("destination", currentJob.destination);
  const pulse = activeRun.carrying && activeRun.status === "running" ? 1.5 + Math.sin(performance.now() / 170) * 1.5 : 0;
  const focusPulse = focus > 0 ? 8 * focus + Math.sin(performance.now() / 90) * 2 : 0;

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgb(232 93 86 / ${0.15 + (activeRun.carrying ? 0.08 : 0) + focus * 0.08})`;
  ctx.beginPath();
  ctx.arc(0, 0, 22 + pulse + focusPulse, 0, Math.PI * 2);
  ctx.fill();

  if (focus > 0) {
    ctx.strokeStyle = `rgb(255 255 255 / ${0.45 + focus * 0.38})`;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(0, 0, 32 + focusPulse * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "rgb(20 32 50 / 18%)";
  ctx.beginPath();
  ctx.ellipse(0, 16, 17, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  drawDestinationCanvasIcon(x, y, 0.94);
}

function drawFastDeliveryHalo(x, y, bonus) {
  const pulse = (Math.sin(performance.now() * 0.014) + 1) * 0.5;
  const radius = 24 + pulse * 6;

  ctx.save();
  ctx.strokeStyle = `rgb(18 216 223 / ${0.42 + pulse * 0.26})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#12d8df";
  ctx.strokeStyle = "rgb(20 32 50 / 62%)";
  ctx.lineWidth = 4;
  ctx.font = canvasFont(1000, 13);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText(`+${bonus}`, x, y - radius - 12);
  ctx.fillText(`+${bonus}`, x, y - radius - 12);
  ctx.restore();
}

function drawBonus() {
  if (!activeRun.bonus || activeRun.status === "ended") return;

  const point = toCanvasPoint(activeRun.bonus.cell);
  const timeRatio = getBonusTimeRatio(activeRun.bonus);
  const isWarning = activeRun.bonus.ttl <= BONUS_WARNING_TTL;
  const pulse = 1 + Math.sin(performance.now() / 130) * 2;
  const alpha = clamp(activeRun.bonus.ttl / 1.2, 0.35, 1);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = isWarning ? "rgb(232 93 86 / 24%)" : "rgb(18 216 223 / 22%)";
  ctx.beginPath();
  ctx.arc(point.x, point.y, 20 + pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = isWarning ? "#ff9a7a" : "#12d8df";
  ctx.beginPath();
  ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 92%)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "rgb(20 32 50 / 20%)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  drawBonusTimerArc(point.x, point.y, 22, timeRatio, isWarning, 4);

  drawClockCanvasIcon(point.x, point.y, 0.74, "#10313a");
  ctx.restore();
}

function drawBonusTimerArc(x, y, radius, ratio, isWarning, lineWidth) {
  const start = -Math.PI / 2;
  const end = start + Math.PI * 2 * ratio;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "rgb(20 32 50 / 18%)";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = isWarning ? "#e85d56" : "#ffffff";
  ctx.beginPath();
  ctx.arc(x, y, radius, start, end);
  ctx.stroke();
  ctx.restore();
}

function drawSupportItems() {
  supportItems.forEach((item) => {
    if (item.collected) return;

    const point = toCanvasPoint(item.cell);
    const pulse = activeRun.status === "running" ? (Math.sin(performance.now() / 150 + item.phase) + 1) * 0.5 : 0.35;
    const color = getSupportItemColor(item.kind);

    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.fillStyle = `rgb(255 255 255 / ${0.08 + pulse * 0.04})`;
    ctx.beginPath();
    ctx.arc(0, 0, 19 + pulse * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 13.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgb(255 255 255 / 82%)";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.strokeStyle = "rgb(20 32 50 / 16%)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    drawSupportItemCanvasIcon(item.kind, 0, 0, 0.63);
    ctx.restore();
  });
}

function getSupportItemColor(kind) {
  if (kind === "clock") return "#21b9c5";
  if (kind === "shield") return "#7770c8";
  if (kind === "magnet") return "#e3b842";
  if (kind === "turbo") return "#38b978";
  if (kind === "flight") return "#5e96df";
  return "#e5c85f";
}

function getSupportItemDescription(kind) {
  return COPY.itemDescriptions[kind] ?? "";
}

function drawSupportItemCanvasIcon(kind, x, y, scale = 1) {
  if (kind === "clock") {
    drawClockCanvasIcon(x, y, scale, "#172330");
    return;
  }

  if (kind === "shield") {
    drawShieldCanvasIcon(x, y, scale, "#ffffff");
    return;
  }

  if (kind === "magnet") {
    drawMagnetCanvasIcon(x, y, scale, "#172330");
    return;
  }

  if (kind === "turbo") {
    drawBoltCanvasIcon(x, y, scale, "#172330");
    return;
  }

  if (kind === "flight") {
    drawFlightCanvasIcon(x, y, scale, "#172330");
    return;
  }

  drawStarCanvasIcon(x, y, scale, "#172330");
}

function renderGuideIcons() {
  guideIconCanvases.forEach((iconCanvas) => {
    const iconCtx = iconCanvas.getContext("2d");
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
    const cssSize = 46;

    iconCanvas.width = cssSize * dpr;
    iconCanvas.height = cssSize * dpr;
    iconCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    iconCtx.clearRect(0, 0, cssSize, cssSize);

    if (iconCanvas.dataset.guideIcon === "destination") {
      drawDestinationCanvasIcon(23, 24, 0.9, iconCtx);
      return;
    }

    drawPackageCanvasIcon(23, 22, 0.9, "#d9962e", iconCtx);
  });
}

function drawPackageCanvasIcon(x, y, scale = 1, fill = "#d9962e", drawingContext = ctx) {
  drawingContext.save();
  drawingContext.translate(x, y);
  drawingContext.scale(scale, scale);
  drawingContext.strokeStyle = "#79501a";
  drawingContext.lineWidth = 2.6;
  drawingContext.lineCap = "round";
  drawingContext.beginPath();
  drawingContext.arc(0, -7, 9, Math.PI, 0, false);
  drawingContext.stroke();
  drawingContext.fillStyle = "rgb(20 32 50 / 14%)";
  drawingContext.beginPath();
  drawingContext.ellipse(0, 14, 16, 5, 0, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.fillStyle = fill;
  roundedRect(-16, -5, 32, 25, 7, drawingContext);
  drawingContext.fill();
  drawingContext.fillStyle = "#efd07a";
  roundedRect(-12, -2, 24, 8, 4, drawingContext);
  drawingContext.fill();
  drawingContext.strokeStyle = "#79501a";
  drawingContext.lineWidth = 1.8;
  drawingContext.stroke();
  drawingContext.fillStyle = "rgb(255 255 255 / 22%)";
  roundedRect(-11, 1, 22, 4, 2, drawingContext);
  drawingContext.fill();
  drawingContext.restore();
}

function drawDestinationCanvasIcon(x, y, scale = 1, drawingContext = ctx) {
  drawingContext.save();
  drawingContext.translate(x, y);
  drawingContext.scale(scale, scale);
  drawingContext.fillStyle = "rgb(20 32 50 / 14%)";
  drawingContext.beginPath();
  drawingContext.ellipse(0, 17, 18, 5, 0, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.fillStyle = "#fff9f0";
  roundedRect(-15, -4, 30, 23, 5, drawingContext);
  drawingContext.fill();
  drawingContext.strokeStyle = "rgb(255 255 255 / 86%)";
  drawingContext.lineWidth = 2.2;
  drawingContext.stroke();
  drawingContext.fillStyle = "#e4625c";
  drawingContext.beginPath();
  drawingContext.moveTo(-18, -4);
  drawingContext.lineTo(0, -20);
  drawingContext.lineTo(18, -4);
  drawingContext.closePath();
  drawingContext.fill();
  drawingContext.strokeStyle = "rgb(20 32 50 / 18%)";
  drawingContext.lineWidth = 1.3;
  drawingContext.stroke();
  drawingContext.fillStyle = "#167f86";
  roundedRect(-4, 6, 8, 13, 2, drawingContext);
  drawingContext.fill();
  drawingContext.fillStyle = "#dfb43d";
  roundedRect(6, 1, 6, 6, 2, drawingContext);
  drawingContext.fill();
  drawingContext.restore();
}

function drawClockCanvasIcon(x, y, scale = 1, color = "#172330") {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "rgb(20 32 50 / 16%)";
  ctx.beginPath();
  ctx.ellipse(0, 16, 15, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#12d8df";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(-9, -14, 5.8, Math.PI * 0.82, Math.PI * 1.95);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(9, -14, 5.8, Math.PI * 1.05, Math.PI * 2.18);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-7, 12);
  ctx.lineTo(-10, 16);
  ctx.moveTo(7, 12);
  ctx.lineTo(10, 16);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgb(18 216 223 / 18%)";
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgb(16 32 51 / 28%)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(0, -8);
  ctx.moveTo(10, 0);
  ctx.lineTo(8, 0);
  ctx.moveTo(0, 10);
  ctx.lineTo(0, 8);
  ctx.moveTo(-10, 0);
  ctx.lineTo(-8, 0);
  ctx.stroke();

  ctx.strokeStyle = color;
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -8);
  ctx.moveTo(0, 0);
  ctx.lineTo(7, 4.5);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, 2.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawShieldCanvasIcon(x, y, scale = 1, color = "#ffffff") {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -13);
  ctx.lineTo(11, -8);
  ctx.lineTo(9, 4);
  ctx.quadraticCurveTo(5, 13, 0, 16);
  ctx.quadraticCurveTo(-5, 13, -9, 4);
  ctx.lineTo(-11, -8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMagnetCanvasIcon(x, y, scale = 1, color = "#172330") {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "rgb(255 255 255 / 92%)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(0, -2, 12, Math.PI * 0.12, Math.PI * 0.88, false);
  ctx.stroke();

  ctx.strokeStyle = color;
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(0, -2, 12, Math.PI * 0.12, Math.PI * 0.88, false);
  ctx.stroke();

  ctx.fillStyle = "#d76f66";
  roundedRect(-16, 5, 8, 10, 3);
  ctx.fill();
  ctx.fillStyle = "#4f9cff";
  roundedRect(8, 5, 8, 10, 3);
  ctx.fill();

  ctx.strokeStyle = "rgb(20 32 50 / 46%)";
  ctx.lineWidth = 1.8;
  roundedRect(-16, 5, 8, 10, 3);
  ctx.stroke();
  roundedRect(8, 5, 8, 10, 3);
  ctx.stroke();

  ctx.fillStyle = "rgb(255 255 255 / 78%)";
  ctx.fillRect(-15, 7, 6, 2);
  ctx.fillRect(9, 7, 6, 2);
  ctx.restore();
}

function drawBoltCanvasIcon(x, y, scale = 1, color = "#172330") {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = "rgb(255 255 255 / 50%)";
  ctx.beginPath();
  ctx.moveTo(4, -12);
  ctx.lineTo(18, 0);
  ctx.lineTo(4, 12);
  ctx.lineTo(8, 3);
  ctx.lineTo(-2, 3);
  ctx.lineTo(-2, -3);
  ctx.lineTo(8, -3);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = 3.4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-21, -9);
  ctx.lineTo(-9, -9);
  ctx.moveTo(-23, 0);
  ctx.lineTo(-12, 0);
  ctx.moveTo(-21, 9);
  ctx.lineTo(-9, 9);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-4, -15);
  ctx.lineTo(18, 0);
  ctx.lineTo(-4, 15);
  ctx.lineTo(2, 4);
  ctx.lineTo(-9, 4);
  ctx.lineTo(-9, -4);
  ctx.lineTo(2, -4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgb(255 255 255 / 54%)";
  ctx.beginPath();
  ctx.moveTo(1, -6);
  ctx.lineTo(9, 0);
  ctx.lineTo(1, 6);
  ctx.lineTo(3, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawFlightCanvasIcon(x, y, scale = 1, color = "#172330") {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(-0.31);

  ctx.strokeStyle = "rgb(255 255 255 / 58%)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-23, 10);
  ctx.lineTo(-15, 7);
  ctx.moveTo(-21, -2);
  ctx.lineTo(-13, 1);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(19, -16);
  ctx.lineTo(7, 17);
  ctx.lineTo(0, 4);
  ctx.lineTo(-11, 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgb(79 156 255 / 88%)";
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.lineTo(19, -16);
  ctx.lineTo(7, 16);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgb(20 32 50 / 42%)";
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(0, 4);
  ctx.lineTo(7, 16);
  ctx.stroke();
  ctx.restore();
}

function drawStarCanvasIcon(x, y, scale = 1, color = "#172330") {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let index = 0; index < 10; index += 1) {
    const radius = index % 2 === 0 ? 13 : 6;
    const angle = -Math.PI / 2 + (index * Math.PI) / 5;
    const pointX = Math.cos(angle) * radius;
    const pointY = Math.sin(angle) * radius;
    if (index === 0) ctx.moveTo(pointX, pointY);
    else ctx.lineTo(pointX, pointY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMarker(x, y, fill, textColor, label) {
  const pulse = activeRun.status === "running" ? 2 + Math.sin(performance.now() / 150) * 2 : 0;
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, 21 + pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 88%)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "rgb(22 33 47 / 22%)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = textColor;
  ctx.font = canvasFont(900, 16);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y + 1);
}

function drawRoadEvents() {
  roadEvents.forEach((event) => {
    if (event.kind === "rail") {
      drawRailEvent(event);
      return;
    }

    if (event.kind === "signal") {
      drawSignalEvent(event);
      return;
    }

    if (event.kind === "festival") {
      drawFestivalEvent(event);
      return;
    }

    if (event.kind === "roadwork") {
      drawRoadworkEvent(event);
      return;
    }

    if (event.kind === "tailwind") {
      drawTailwindEvent(event);
      return;
    }

    if (event.kind === "slope") {
      drawSlopeEvent(event);
      return;
    }

    if (event.kind === "shortcut") {
      drawShortcutEvent(event);
      return;
    }

    if (event.kind === "oil") {
      drawOilEvent(event);
      return;
    }

    if (event.kind === "electric") {
      drawElectricEvent(event);
      return;
    }

    if (event.kind === "stand") {
      drawStandEvent(event);
      return;
    }

    if (event.kind === "post") {
      drawDeliveryPostEvent(event);
      return;
    }

    if (event.kind === "heli") {
      drawHeliPadEvent(event);
      return;
    }

    drawSlowZoneEvent(event);
  });
}

function drawRailEvent(event) {
  const point = toCanvasPoint(event.cell);
  const closed = isRailClosed(event);
  const pulse = closed && activeRun.status === "running" ? (Math.sin(performance.now() / 100) + 1) * 0.5 : 0;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(event.angle);
  ctx.fillStyle = `rgb(232 93 86 / ${closed ? 0.08 + pulse * 0.06 : 0.03})`;
  ctx.beginPath();
  ctx.arc(0, 0, 28 + pulse * 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 16%)";
  ctx.beginPath();
  ctx.ellipse(0, 13, 27, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-23, -12);
  ctx.lineTo(-23, 14);
  ctx.moveTo(23, -12);
  ctx.lineTo(23, 14);
  ctx.stroke();

  ctx.save();
  ctx.rotate(closed ? 0 : -0.55);
  ctx.fillStyle = "#ffffff";
  roundedRect(-28, -5, 56, 10, 3);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  roundedRect(-28, -5, 56, 10, 3);
  ctx.clip();
  ctx.fillStyle = "#d76f66";
  for (let x = -35; x < 35; x += 14) {
    ctx.fillRect(x, -8, 6, 16);
  }
  ctx.restore();
  ctx.restore();

  ctx.restore();
}

function drawSignalEvent(event) {
  const point = toCanvasPoint(event.cell);
  const red = isSignalRed(event);
  const pulse = red && activeRun.status === "running" ? (Math.sin(performance.now() / 115) + 1) * 0.5 : 0;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.fillStyle = `rgb(232 93 86 / ${red ? 0.09 + pulse * 0.06 : 0.03})`;
  ctx.beginPath();
  ctx.arc(0, 0, 25 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 18%)";
  ctx.beginPath();
  ctx.ellipse(0, 15, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#334155";
  roundedRect(-9, -18, 18, 28, 5);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 52%)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = red ? "#d76f66" : "rgb(255 255 255 / 24%)";
  ctx.beginPath();
  ctx.arc(0, -9, 5.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = red ? "rgb(255 255 255 / 24%)" : "#4aa873";
  ctx.beginPath();
  ctx.arc(0, 1.8, 5.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawRoadworkEvent(event) {
  const point = toCanvasPoint(event.cell);
  const pulse = activeRun.status === "running" ? (Math.sin(performance.now() / 180) + 1) * 0.5 : 0;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.fillStyle = `rgb(232 93 86 / ${0.06 + pulse * 0.035})`;
  ctx.beginPath();
  ctx.arc(0, 0, 23 + pulse * 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 16%)";
  ctx.beginPath();
  ctx.ellipse(0, 14, 20, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d76f66";
  roundedRect(-18, -7, 36, 13, 4);
  ctx.fill();
  ctx.fillStyle = "#edc66b";
  ctx.save();
  ctx.beginPath();
  roundedRect(-18, -7, 36, 13, 4);
  ctx.clip();
  for (let x = -28; x <= 24; x += 13) {
    ctx.fillRect(x, -11, 5, 22);
  }
  ctx.restore();

  drawCone(-13, 11, 0.72);
  drawCone(13, 11, 0.72);
  ctx.restore();
}

function drawFestivalEvent(event) {
  const point = toCanvasPoint(event.cell);
  const busy = isFestivalBusy(event);
  const pulse = busy && activeRun.status === "running" ? (Math.sin(performance.now() / 110) + 1) * 0.5 : 0;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(event.angle ?? 0);
  ctx.fillStyle = `rgb(232 93 86 / ${busy ? 0.12 + pulse * 0.07 : 0.04})`;
  ctx.beginPath();
  ctx.arc(0, 0, 27 + pulse * 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 16%)";
  ctx.beginPath();
  ctx.ellipse(0, 15, 25, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = busy ? "#e85d56" : "#b8955e";
  roundedRect(-24, -8, 48, 16, 5);
  ctx.fill();
  ctx.fillStyle = "#fff2b8";
  roundedRect(-19, -5, 12, 10, 3);
  roundedRect(7, -5, 12, 10, 3);
  ctx.fill();
  ctx.strokeStyle = "#7c4a00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-28, 8);
  ctx.lineTo(28, 8);
  ctx.stroke();

  drawFestivalLantern(-16, -18, busy);
  drawFestivalLantern(16, -18, busy);
  ctx.restore();
}

function drawFestivalLantern(x, y, busy) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = busy ? "#f0bf39" : "#fff2b8";
  ctx.beginPath();
  ctx.ellipse(0, 0, 7, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#7c4a00";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.restore();
}

function drawCone(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#e85d56";
  ctx.beginPath();
  ctx.moveTo(0, -17);
  ctx.lineTo(10, 7);
  ctx.lineTo(-10, 7);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-5, -5, 10, 3);
  ctx.fillStyle = "#7c4a00";
  roundedRect(-12, 6, 24, 5, 2);
  ctx.fill();
  ctx.restore();
}

function drawSlowZoneEvent(event) {
  const point = toCanvasPoint(event.cell);
  const isCrowd = event.kind === "crowd";
  const alpha = isCrowd ? 0.9 : 0.82;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = alpha;

  if (!isCrowd) {
    ctx.fillStyle = "rgb(82 176 209 / 30%)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 24, 13, -0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgb(255 255 255 / 42%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(-5, 1, 9, 4, -0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }

  drawCrowdPerson(-11, 3, "#7770b8");
  drawCrowdPerson(1, -2, "#4f8990");
  drawCrowdPerson(12, 5, "#c89b38");
  ctx.restore();
}

function drawCrowdPerson(x, y, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgb(20 32 50 / 13%)";
  ctx.beginPath();
  ctx.ellipse(0, 10, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  roundedRect(-6, -2, 12, 14, 5);
  ctx.fill();
  ctx.fillStyle = "#f1c27d";
  ctx.beginPath();
  ctx.arc(0, -8, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawTailwindEvent(event) {
  const point = toCanvasPoint(event.cell);
  const unavailable = event.cooldown > 0;
  const pulse = (Math.sin(performance.now() / 130) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(event.angle);
  ctx.globalAlpha = unavailable ? 0.24 : 1;

  ctx.fillStyle = `rgb(18 216 223 / ${0.08 + pulse * 0.055})`;
  ctx.beginPath();
  ctx.arc(0, 0, 23 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  for (let index = -1; index <= 1; index += 1) {
    const y = index * 8;
    ctx.strokeStyle = "#40a6b0";
    ctx.lineWidth = 4.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-17, y);
    ctx.lineTo(11, y);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(19, y);
    ctx.lineTo(6, y - 7);
    ctx.lineTo(9, y);
    ctx.lineTo(6, y + 7);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawSlopeEvent(event) {
  const point = toCanvasPoint(event.cell);
  const pulse = (Math.sin(performance.now() / 135) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(event.angle ?? 0);
  ctx.globalAlpha = event.cooldown > 0 ? 0.45 : 1;

  ctx.fillStyle = `rgb(18 216 223 / ${0.08 + pulse * 0.045})`;
  ctx.beginPath();
  ctx.arc(0, 0, 23 + pulse * 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#5d6b57";
  roundedRect(-22, -15, 44, 30, 7);
  ctx.fill();
  ctx.fillStyle = "#9fbd73";
  roundedRect(-18, -11, 36, 22, 6);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  for (let index = -1; index <= 1; index += 1) {
    const x = index * 9;
    ctx.beginPath();
    ctx.moveTo(x + 8, 0);
    ctx.lineTo(x - 3, -7);
    ctx.lineTo(x - 1, 0);
    ctx.lineTo(x - 3, 7);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawOilEvent(event) {
  const point = toCanvasPoint(event.cell);
  const shimmer = (Math.sin(performance.now() / 180 + point.x) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = event.cooldown > 0 ? 0.38 : 0.76;
  ctx.fillStyle = "rgb(45 42 76 / 50%)";
  ctx.beginPath();
  ctx.ellipse(0, 5, 23, 12, 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgb(18 216 223 / ${0.34 + shimmer * 0.24})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(-5, 2, 10, 4, -0.18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = `rgb(240 191 57 / ${0.22 + shimmer * 0.22})`;
  ctx.beginPath();
  ctx.ellipse(8, 8, 7, 3, 0.26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawElectricEvent(event) {
  const point = toCanvasPoint(event.cell);
  const pulse = (Math.sin(performance.now() / 105 + point.x) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = event.cooldown > 0 ? 0.42 : 1;
  ctx.fillStyle = `rgb(79 156 255 / ${0.08 + pulse * 0.07})`;
  ctx.beginPath();
  ctx.arc(0, 0, 25 + pulse * 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 16%)";
  ctx.beginPath();
  ctx.ellipse(0, 15, 20, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#334155";
  roundedRect(-17, -9, 34, 20, 5);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 60%)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = "#5e96df";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(-10, -15);
  ctx.lineTo(0, -2);
  ctx.lineTo(-5, -2);
  ctx.lineTo(7, 15);
  ctx.lineTo(3, 2);
  ctx.lineTo(11, 2);
  ctx.stroke();

  ctx.strokeStyle = `rgb(255 255 255 / ${0.48 + pulse * 0.32})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 20 + pulse * 3, -Math.PI * 0.15, Math.PI * 1.18);
  ctx.stroke();
  ctx.restore();
}

function drawStandEvent(event) {
  const point = toCanvasPoint(event.cell);
  const unavailable = event.cooldown > 0;
  const pulse = (Math.sin(performance.now() / 170 + point.y) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = unavailable ? 0.4 : 1;
  ctx.fillStyle = `rgb(240 191 57 / ${0.09 + pulse * 0.06})`;
  ctx.beginPath();
  ctx.arc(0, 0, 25 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 15%)";
  ctx.beginPath();
  ctx.ellipse(0, 17, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  roundedRect(-18, -4, 36, 20, 5);
  ctx.fill();
  ctx.strokeStyle = "rgb(20 32 50 / 22%)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#d76f66";
  ctx.beginPath();
  roundedRect(-20, -15, 40, 13, 4);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  roundedRect(-20, -15, 40, 13, 4);
  ctx.clip();
  ctx.fillStyle = "#e3b842";
  for (let x = -18; x < 20; x += 12) {
    ctx.fillRect(x, -16, 6, 15);
  }
  ctx.restore();

  ctx.fillStyle = "#4f8990";
  roundedRect(-8, 3, 16, 9, 3);
  ctx.fill();
  drawStarCanvasIcon(0, -25, 0.36, "#e3b842");
  ctx.restore();
}

function drawDeliveryPostEvent(event) {
  const point = toCanvasPoint(event.cell);
  const unavailable = event.cooldown > 0;
  const pulse = (Math.sin(performance.now() / 160 + point.x) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = unavailable ? 0.42 : 1;
  ctx.fillStyle = `rgb(240 191 57 / ${0.1 + pulse * 0.06})`;
  ctx.beginPath();
  ctx.arc(0, 0, 25 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 16%)";
  ctx.beginPath();
  ctx.ellipse(0, 17, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e85d56";
  roundedRect(-17, -11, 34, 28, 7);
  ctx.fill();
  ctx.fillStyle = "#fff8ec";
  roundedRect(-12, -5, 24, 7, 3);
  ctx.fill();
  ctx.fillStyle = "#172330";
  roundedRect(-10, 6, 20, 3, 2);
  ctx.fill();
  drawPackageCanvasIcon(0, -20, 0.42, "#d9962e");
  ctx.restore();
}

function drawHeliPadEvent(event) {
  const point = toCanvasPoint(event.cell);
  const unavailable = event.cooldown > 0;
  const pulse = (Math.sin(performance.now() / 145 + point.y) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = unavailable ? 0.36 : 1;
  ctx.fillStyle = `rgb(94 150 223 / ${0.12 + pulse * 0.08})`;
  ctx.beginPath();
  ctx.arc(0, 0, 29 + pulse * 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f7faf8";
  ctx.strokeStyle = "#5e96df";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#172330";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-9, -10);
  ctx.lineTo(-9, 10);
  ctx.moveTo(9, -10);
  ctx.lineTo(9, 10);
  ctx.moveTo(-8, 0);
  ctx.lineTo(8, 0);
  ctx.stroke();

  ctx.strokeStyle = "rgb(94 150 223 / 72%)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-26, -24);
  ctx.lineTo(-11, -18);
  ctx.moveTo(26, 24);
  ctx.lineTo(11, 18);
  ctx.stroke();
  ctx.restore();
}

function drawShortcutEvent(event) {
  const point = toCanvasPoint(event.cell);
  const unavailable = event.cooldown > 0;
  const pulse = (Math.sin(performance.now() / 150 + event.pairId) + 1) * 0.5;
  const color = event.pairId % 2 === 0 ? "#8177d3" : "#40a6b0";
  const glow = event.pairId % 2 === 0 ? "129 119 211" : "64 166 176";
  const spin = performance.now() / 520 + event.pairId;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = unavailable ? 0.34 : 0.98;
  ctx.fillStyle = `rgb(${glow} / ${0.09 + pulse * 0.075})`;
  ctx.beginPath();
  ctx.arc(0, 0, 28 + pulse * 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 20%)";
  ctx.beginPath();
  ctx.ellipse(0, 15, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#172330";
  ctx.beginPath();
  ctx.ellipse(0, 0, 14, 20, spin * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgb(255 255 255 / 90%)";
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 16, 22, spin * 0.08, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = color;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.ellipse(0, 0, 20, 12, spin, -Math.PI * 0.12, Math.PI * 1.24);
  ctx.stroke();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, 8, 17, -spin * 0.8, Math.PI * 0.15, Math.PI * 1.35);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.globalAlpha *= 0.9;
  ctx.beginPath();
  ctx.arc(0, 0, 5 + pulse * 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = unavailable ? 0.22 : 0.76;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-25, -19);
  ctx.quadraticCurveTo(-11, -29, 6, -23);
  ctx.moveTo(17, 21);
  ctx.quadraticCurveTo(26, 8, 20, -8);
  ctx.stroke();
  ctx.restore();
}

function drawHazards() {
  hazards.forEach((hazard) => {
    drawHazardWarning(hazard);

    if (hazard.kind === "bus") {
      ctx.save();
      ctx.translate(hazard.x, hazard.y);
      ctx.fillStyle = "rgb(20 32 50 / 24%)";
      ctx.beginPath();
      ctx.ellipse(0, 17, 34, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hazard.color;
      roundedRect(-34, -14, 68, 29, 8);
      ctx.fill();
      ctx.fillStyle = "#eef9ff";
      for (let x = -24; x <= 15; x += 13) {
        roundedRect(x, -9, 10, 8, 3);
        ctx.fill();
      }
      ctx.fillStyle = "#f0bf39";
      roundedRect(-31, 5, 8, 5, 2);
      roundedRect(23, 5, 8, 5, 2);
      ctx.fill();
      ctx.fillStyle = "#172330";
      roundedRect(-26, 12, 10, 6, 3);
      roundedRect(16, 12, 10, 6, 3);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (hazard.kind === "scooter") {
      ctx.save();
      ctx.translate(hazard.x, hazard.y);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = "rgb(20 32 50 / 20%)";
      ctx.beginPath();
      ctx.ellipse(0, 10, 17, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#172330";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-15, 7);
      ctx.lineTo(14, 1);
      ctx.stroke();
      ctx.fillStyle = hazard.color;
      roundedRect(-9, -9, 21, 14, 6);
      ctx.fill();
      ctx.fillStyle = "#f1c27d";
      ctx.beginPath();
      ctx.arc(-6, -13, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (hazard.kind === "car") {
      ctx.save();
      ctx.translate(hazard.x, hazard.y);
      if (hazard.axis === "y") {
        ctx.rotate(Math.PI / 2);
      }

      ctx.fillStyle = "rgb(20 32 50 / 22%)";
      ctx.beginPath();
      ctx.ellipse(0, 14, 25, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hazard.color;
      roundedRect(-23, -12, 46, 24, 7);
      ctx.fill();
      ctx.fillStyle = "#eef9ff";
      roundedRect(-7, -9, 15, 8, 3);
      ctx.fill();
      ctx.fillStyle = "#172330";
      roundedRect(-18, -15, 9, 5, 2);
      ctx.fill();
      roundedRect(9, -15, 9, 5, 2);
      ctx.fill();
      roundedRect(-18, 10, 9, 5, 2);
      ctx.fill();
      roundedRect(9, 10, 9, 5, 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (hazard.kind === "skater") {
      ctx.save();
      ctx.translate(hazard.x, hazard.y);
      ctx.fillStyle = "rgb(20 32 50 / 18%)";
      ctx.beginPath();
      ctx.ellipse(0, 15, 20, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#172330";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-16, 13);
      ctx.lineTo(18, 13);
      ctx.stroke();
      ctx.fillStyle = hazard.color;
      roundedRect(-8, -5, 16, 19, 7);
      ctx.fill();
      ctx.strokeStyle = "#172330";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-5, 10);
      ctx.lineTo(-13, 17);
      ctx.moveTo(5, 10);
      ctx.lineTo(14, 17);
      ctx.stroke();
      ctx.fillStyle = "#f1c27d";
      ctx.beginPath();
      ctx.arc(0, -14, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    ctx.fillStyle = "rgb(20 32 50 / 18%)";
    ctx.beginPath();
    ctx.ellipse(hazard.x, hazard.y + 6, 11, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#26364a";
    roundedRect(hazard.x - 7, hazard.y - 3, 14, 18, 6);
    ctx.fill();
    ctx.fillStyle = "#f1c27d";
    ctx.beginPath();
    ctx.arc(hazard.x, hazard.y - 12, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172330";
    ctx.beginPath();
    ctx.arc(hazard.x - 2, hazard.y - 13, 1, 0, Math.PI * 2);
    ctx.arc(hazard.x + 2, hazard.y - 13, 1, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawHazardWarning(hazard) {
  if (activeRun.status !== "running" || activeRun.invulnerable > 0) return;

  const radius = getHazardRadius(hazard);
  const alertDistance = radius + HAZARD_ALERT_EXTRA;
  const distance = Math.hypot(activeRun.player.x - hazard.x, activeRun.player.y - hazard.y);
  if (distance > alertDistance) return;

  const danger = clamp((alertDistance - distance) / HAZARD_ALERT_EXTRA, 0, 1);
  const isNearMissZone = distance > radius + 4 && distance < radius + NEAR_MISS_BAND + 6;
  const fill = distance <= radius + 7 ? "232 93 86" : isNearMissZone ? "240 191 57" : "255 255 255";
  const pulse = 1 + Math.sin(performance.now() / 95) * 1.5 * danger;

  ctx.save();
  ctx.translate(hazard.x, hazard.y);
  ctx.fillStyle = `rgb(${fill} / ${0.07 + danger * 0.12})`;
  ctx.beginPath();
  ctx.arc(0, 0, radius + 18 + pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgb(${fill} / ${0.42 + danger * 0.38})`;
  ctx.lineWidth = 2.5 + danger * 1.5;
  ctx.setLineDash(isNearMissZone ? [5, 6] : []);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 10 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  if (danger > 0.72) {
    ctx.fillStyle = "rgb(255 255 255 / 92%)";
    ctx.font = canvasFont(1000, 16);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("!", 0, -radius - 19);
  }

  ctx.restore();
}

function getHazardRadius(hazard) {
  if (hazard.kind === "bus") return 32;
  if (hazard.kind === "car") return 24;
  if (hazard.kind === "scooter") return 17;
  if (hazard.kind === "skater") return 20;
  return 18;
}

function drawPlayer() {
  const { x, y } = activeRun.player;
  const blinking = activeRun.invulnerable > 0 && Math.floor(activeRun.invulnerable * 12) % 2 === 0;

  ctx.save();
  ctx.translate(x, y);
  drawPlayerRecoveryRing();
  drawPlayerPowerRings();
  ctx.globalAlpha = blinking ? 0.58 : 1;

  ctx.fillStyle = "rgb(20 32 50 / 24%)";
  ctx.beginPath();
  ctx.ellipse(0, 19, 18, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  if (activeRun.flight > 0) {
    drawPlayerFlightWings();
  }

  ctx.strokeStyle = "rgb(18 216 223 / 82%)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, Math.PI * 2);
  ctx.stroke();

  const wiggle = getInputVector().active ? Math.sin(performance.now() * 0.026) * 2.2 : 0;
  const facing = Number.isFinite(activeRun.player.facing) ? activeRun.player.facing : 0;

  ctx.save();
  ctx.rotate(facing);
  ctx.translate(0, wiggle * 0.16);

  ctx.strokeStyle = "#145343";
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.fillStyle = "#8be09b";
  ctx.beginPath();
  ctx.ellipse(-20, 0, 5.5, 3.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#99e7a4";
  ctx.beginPath();
  ctx.ellipse(-11, -16, 7.6, 5.2, -0.72 + wiggle * 0.035, 0, Math.PI * 2);
  ctx.ellipse(-11, 16, 7.6, 5.2, 0.72 - wiggle * 0.035, 0, Math.PI * 2);
  ctx.ellipse(6, -17, 8.6, 5.6, 0.58 - wiggle * 0.035, 0, Math.PI * 2);
  ctx.ellipse(6, 17, 8.6, 5.6, -0.58 + wiggle * 0.035, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#8fe09b";
  ctx.beginPath();
  ctx.ellipse(15, 0, 8, 8.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#9deca5";
  ctx.beginPath();
  ctx.ellipse(24, 0, 14, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#35b96d";
  ctx.beginPath();
  ctx.ellipse(-4, 0, 19, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#0d473a";
  ctx.lineWidth = 2.7;
  ctx.stroke();

  ctx.fillStyle = "rgb(255 255 255 / 16%)";
  ctx.beginPath();
  ctx.ellipse(-9, -7, 7, 4.2, -0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgb(255 255 255 / 50%)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(-4, 0, 12, 9.5, 0, 0, Math.PI * 2);
  ctx.moveTo(-4, -9);
  ctx.lineTo(-4, 9);
  ctx.moveTo(-15, 0);
  ctx.quadraticCurveTo(-4, 4, 7, 0);
  ctx.moveTo(-13, -5);
  ctx.quadraticCurveTo(-4, -1, 6, -5);
  ctx.moveTo(-13, 5);
  ctx.quadraticCurveTo(-4, 1, 6, 5);
  ctx.stroke();

  ctx.fillStyle = "#172330";
  ctx.beginPath();
  ctx.arc(28, -4.5, 2.5, 0, Math.PI * 2);
  ctx.arc(28, 4.5, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(28.8, -5.2, 0.75, 0, Math.PI * 2);
  ctx.arc(28.8, 3.8, 0.75, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff9a9a";
  ctx.globalAlpha *= 0.72;
  ctx.beginPath();
  ctx.arc(21, -8.4, 2.7, 0, Math.PI * 2);
  ctx.arc(21, 8.4, 2.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = blinking ? 0.58 : 1;

  ctx.strokeStyle = "#172330";
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(31, 0, 3.2, Math.PI * 0.34, Math.PI * 1.66);
  ctx.stroke();

  if (activeRun.carrying) {
    const count = getCarriedCount();
    for (let index = 0; index < count; index += 1) {
      const offsetY = (index - (count - 1) / 2) * 8;
      drawPackageCanvasIcon(-13, offsetY, 0.26, index === 0 ? "#d9962e" : "#f0bf39");
    }

    if (count > 1) {
      ctx.fillStyle = "#172330";
      roundedRect(-24, -25, 17, 15, 8);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = canvasFont(1000, 10);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${count}`, -15.5, -17.5);
    }
  }

  ctx.restore();
  ctx.restore();
}

function drawPlayerRecoveryRing() {
  if (activeRun.invulnerable <= 0) return;

  const ratio = clamp(activeRun.invulnerable / HIT_RECOVERY_SECONDS, 0, 1);
  const pulse = (Math.sin(performance.now() * 0.02) + 1) * 0.5;
  ctx.save();
  ctx.lineCap = "round";
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgb(18 216 223 / 16%)";
  ctx.beginPath();
  ctx.arc(0, 0, 42 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgb(255 255 255 / 72%)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, 36 + pulse * 3, -Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();

  ctx.strokeStyle = "#12d8df";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 36 + pulse * 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ratio);
  ctx.stroke();
  ctx.restore();
}

function drawPlayerFlightWings() {
  const flap = Math.sin(performance.now() * 0.024) * 5;

  ctx.save();
  ctx.fillStyle = "rgb(255 255 255 / 82%)";
  ctx.strokeStyle = "rgb(79 156 255 / 72%)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-13, -4);
  ctx.quadraticCurveTo(-35, -20 - flap, -34, 4);
  ctx.quadraticCurveTo(-24, 11, -13, 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(13, -4);
  ctx.quadraticCurveTo(35, -20 + flap, 34, 4);
  ctx.quadraticCurveTo(24, 11, 13, 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPlayerPowerRings() {
  if (activeRun.shield <= 0 && activeRun.magnet <= 0 && activeRun.flight <= 0 && activeRun.stunned <= 0) return;

  const pulse = (Math.sin(performance.now() * 0.018) + 1) * 0.5;
  ctx.save();
  ctx.lineCap = "round";

  if (activeRun.magnet > 0) {
    ctx.strokeStyle = `rgb(240 191 57 / ${0.42 + pulse * 0.22})`;
    ctx.lineWidth = 4;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, 88 + pulse * 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (activeRun.shield > 0) {
    ctx.strokeStyle = `rgb(102 88 211 / ${0.5 + pulse * 0.24})`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 34 + pulse * 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (activeRun.flight > 0) {
    ctx.strokeStyle = `rgb(79 156 255 / ${0.48 + pulse * 0.24})`;
    ctx.lineWidth = 5;
    ctx.setLineDash([10, 7]);
    ctx.beginPath();
    ctx.arc(0, 0, 39 + pulse * 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (activeRun.stunned > 0) {
    ctx.strokeStyle = `rgb(79 156 255 / ${0.58 + pulse * 0.24})`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 28 + pulse * 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawComboFocusRing() {
  if (activeRun.status !== "running") return;

  const isNearRush = activeRun.rush <= 0 && activeRun.combo % 3 === 2;
  const isRushing = activeRun.rush > 0;
  if (!isNearRush && !isRushing) return;

  const { x, y } = activeRun.player;
  const pulse = (Math.sin(performance.now() * 0.012) + 1) * 0.5;
  const radius = isRushing ? 42 + pulse * 8 : 38 + pulse * 5;
  const color = isRushing ? "18 216 223" : "240 191 57";
  const label = isRushing ? COPY.ui.tailwind : COPY.hudText.oneMore;

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = `rgb(${color} / ${0.42 + pulse * 0.24})`;
  ctx.lineWidth = isRushing ? 7 : 5;
  ctx.setLineDash(isRushing ? [] : [8, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = `rgb(${color} / 88%)`;
  ctx.strokeStyle = "rgb(20 32 50 / 58%)";
  ctx.lineWidth = 4;
  ctx.font = canvasFont(1000, 13);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText(label, 0, -radius - 13);
  ctx.fillText(label, 0, -radius - 13);
  ctx.restore();
}

function drawInputDirectionIndicator() {
  if (activeRun.status !== "running") return;

  const input = getInputVector();
  if (!input.active) return;

  const { x, y } = activeRun.player;
  const angle = Math.atan2(input.y, input.x);
  const start = 34;
  const end = 64 + input.strength * 14;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.lineCap = "round";
  ctx.shadowColor = "rgb(18 216 223 / 42%)";
  ctx.shadowBlur = 12;
  ctx.strokeStyle = "rgb(18 216 223 / 76%)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(start, 0);
  ctx.lineTo(end, 0);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#12d8df";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(end + 13, 0);
  ctx.lineTo(end - 5, -10);
  ctx.lineTo(end - 1, 0);
  ctx.lineTo(end - 5, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgb(255 255 255 / 62%)";
  ctx.beginPath();
  ctx.arc(start - 9, 0, 3, 0, Math.PI * 2);
  ctx.arc(start - 19, 0, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMovementTrail() {
  if (activeRun.status !== "running") return;

  const input = getInputVector();
  if (!input.active) return;

  const { x, y } = activeRun.player;
  const pulse = (Math.sin(performance.now() * 0.024) + 1) * 0.5;
  const speedGlow = activeRun.rush > 0 ? 1.35 : isLastSpurtActive() ? 1.18 : 1;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.atan2(input.y, input.x));

  for (let index = 0; index < 4; index += 1) {
    const distance = 24 + index * 13 + pulse * 5;
    const alpha = (0.34 - index * 0.065) * input.strength;
    const width = (18 - index * 2) * speedGlow;
    const height = 5.5 - index * 0.5;
    ctx.fillStyle = `rgb(255 255 255 / ${alpha})`;
    ctx.beginPath();
    ctx.ellipse(-distance, 0, width, height, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = `rgb(18 216 223 / ${0.16 + pulse * 0.1})`;
  ctx.beginPath();
  ctx.ellipse(-26, 0, 28 * speedGlow, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWarpTrail() {
  if (!activeRun.warp) return;

  const warp = activeRun.warp;
  const ratio = clamp(warp.elapsed / warp.duration, 0, 1);
  const pulse = (Math.sin(performance.now() * 0.04) + 1) * 0.5;
  const color = warp.color === "#12d8df" ? "18 216 223" : "142 109 240";

  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgb(${color} / ${0.35 + pulse * 0.22})`;
  ctx.lineWidth = 8;
  ctx.setLineDash([10, 12]);
  ctx.lineDashOffset = -performance.now() / 18;
  ctx.beginPath();
  ctx.moveTo(warp.from.x, warp.from.y);
  ctx.quadraticCurveTo(
    (warp.from.x + warp.to.x) / 2,
    (warp.from.y + warp.to.y) / 2 - 58,
    warp.to.x,
    warp.to.y,
  );
  ctx.stroke();
  ctx.setLineDash([]);

  [warp.from, warp.to].forEach((point, index) => {
    const radius = 22 + pulse * 6 + (index === 0 ? ratio * 8 : (1 - ratio) * 8);
    ctx.strokeStyle = `rgb(${color} / 72%)`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, radius, radius * 0.55, performance.now() * 0.004, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgb(255 255 255 / 72%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, radius * 0.72, radius * 0.36, -performance.now() * 0.004, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function updateEffects(dt) {
  if (activeRun.heliDelivery) {
    activeRun.heliDelivery.elapsed += dt;
    if (activeRun.heliDelivery.elapsed >= activeRun.heliDelivery.duration) {
      activeRun.heliDelivery = null;
    }
  }

  updateFloatTexts(dt);
  updateScreenTexts(dt);
  updateParticles(dt);
}

function updateFloatTexts(dt) {
  let writeIndex = 0;
  for (let index = 0; index < activeRun.floatTexts.length; index += 1) {
    const item = activeRun.floatTexts[index];
    item.y += item.vy * dt;
    item.ttl -= dt;
    if (item.ttl > 0) {
      activeRun.floatTexts[writeIndex] = item;
      writeIndex += 1;
    }
  }
  activeRun.floatTexts.length = writeIndex;
}

function updateScreenTexts(dt) {
  const texts = activeRun.screenTexts ?? [];
  let writeIndex = 0;
  for (let index = 0; index < texts.length; index += 1) {
    const item = texts[index];
    item.ttl -= dt;
    if (item.ttl > 0) {
      texts[writeIndex] = item;
      writeIndex += 1;
    }
  }
  texts.length = writeIndex;
  activeRun.screenTexts = texts;
}

function updateParticles(dt) {
  let writeIndex = 0;
  for (let index = 0; index < activeRun.particles.length; index += 1) {
    const particle = activeRun.particles[index];
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.ttl -= dt;
    if (particle.ttl > 0) {
      activeRun.particles[writeIndex] = particle;
      writeIndex += 1;
    }
  }
  activeRun.particles.length = writeIndex;
}

function addFloatText(x, y, text, color, ttl = 0.9, vy = -32, size = 12) {
  activeRun.floatTexts.push({
    x,
    y,
    text,
    color,
    ttl,
    initialTtl: ttl,
    vy,
    size,
  });
  activeRun.floatTexts = activeRun.floatTexts.slice(-MAX_FLOAT_TEXTS);
}

function addScreenText(text, tone = "delivery", ttl = 0.9, yRatio = 0.26) {
  activeRun.screenTexts = [
    ...(activeRun.screenTexts ?? []),
    {
      text,
      tone,
      ttl,
      initialTtl: ttl,
      yRatio,
    },
  ].slice(-MAX_SCREEN_TEXTS);
}

function createBurst(x, y, color, count) {
  const room = MAX_PARTICLES - activeRun.particles.length;
  const safeCount = Math.max(0, Math.min(room, Math.ceil(count * PARTICLE_QUALITY)));
  if (safeCount <= 0) return;

  for (let index = 0; index < safeCount; index += 1) {
    const angle = (Math.PI * 2 * index) / safeCount + activeRun.rng() * 0.7;
    const speed = 34 + activeRun.rng() * 58;
    activeRun.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      ttl: 0.45 + activeRun.rng() * 0.25,
      radius: 2 + activeRun.rng() * 2.5,
    });
  }

  if (activeRun.particles.length > MAX_PARTICLES) {
    activeRun.particles.splice(0, activeRun.particles.length - MAX_PARTICLES);
  }
}

function drawScreenTexts() {
  const texts = activeRun.screenTexts ?? [];
  if (texts.length === 0) return;

  texts.forEach((item) => {
    const initialTtl = item.initialTtl ?? 0.9;
    const age = initialTtl - item.ttl;
    const alpha = Math.min(clamp(age / 0.12, 0, 1), clamp(item.ttl / 0.24, 0, 1));
    if (alpha <= 0) return;

    const tone = getScreenTextTone(item.tone);
    const maxWidth = Math.max(180, viewport.width - 34);
    const fontSize = getScreenTextFontSize(item.text, maxWidth);
    const paddingX = 15;
    const paddingY = 8;
    const textWidth = Math.min(ctx.measureText(item.text).width, maxWidth);
    const width = Math.min(maxWidth, textWidth + paddingX * 2);
    const height = fontSize + paddingY * 2;
    const x = viewport.width / 2 - width / 2;
    const y = viewport.height * item.yRatio - height / 2 - age * 10;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = tone.shadow;
    roundedRect(x + 2, y + 5, width, height, 12);
    ctx.fill();
    ctx.fillStyle = tone.background;
    roundedRect(x, y, width, height, 12);
    ctx.fill();
    ctx.strokeStyle = tone.border;
    ctx.lineWidth = 2;
    roundedRect(x + 1, y + 1, width - 2, height - 2, 11);
    ctx.stroke();

    if (item.tone === "comboSpecial") {
      ctx.fillStyle = "rgba(255, 255, 255, 0.84)";
      ctx.beginPath();
      ctx.arc(x + 18, y + height / 2, 3.5, 0, Math.PI * 2);
      ctx.arc(x + width - 18, y + height / 2, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = canvasFont(1000, fontSize);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
    ctx.strokeStyle = tone.stroke;
    ctx.strokeText(item.text, viewport.width / 2, y + height / 2);
    ctx.fillStyle = tone.text;
    ctx.fillText(item.text, viewport.width / 2, y + height / 2);
    ctx.restore();
  });
}

function getScreenTextTone(tone) {
  if (tone === "comboSpecial") {
    return {
      background: "rgba(240, 125, 78, 0.94)",
      border: "rgba(255, 248, 223, 0.9)",
      text: "#ffffff",
      stroke: "rgba(90, 59, 0, 0.42)",
      shadow: "rgba(240, 125, 78, 0.22)",
    };
  }

  if (tone === "combo" || tone === "multi") {
    return {
      background: "rgba(240, 191, 57, 0.94)",
      border: "rgba(255, 255, 255, 0.86)",
      text: "#172330",
      stroke: "rgba(255, 255, 255, 0.64)",
      shadow: "rgba(240, 191, 57, 0.24)",
    };
  }

  if (tone === "boost") {
    return {
      background: "rgba(232, 251, 248, 0.95)",
      border: "rgba(21, 127, 135, 0.28)",
      text: "#0f6268",
      stroke: "rgba(255, 255, 255, 0.78)",
      shadow: "rgba(21, 127, 135, 0.18)",
    };
  }

  if (tone === "item") {
    return {
      background: "rgba(255, 248, 223, 0.95)",
      border: "rgba(240, 191, 57, 0.5)",
      text: "#5a3b00",
      stroke: "rgba(255, 255, 255, 0.72)",
      shadow: "rgba(240, 191, 57, 0.2)",
    };
  }

  if (tone === "lastSpurt") {
    return {
      background: "rgba(232, 93, 86, 0.94)",
      border: "rgba(255, 248, 223, 0.88)",
      text: "#ffffff",
      stroke: "rgba(90, 36, 20, 0.45)",
      shadow: "rgba(232, 93, 86, 0.24)",
    };
  }

  return {
    background: "rgba(21, 127, 135, 0.9)",
    border: "rgba(255, 255, 255, 0.82)",
    text: "#ffffff",
    stroke: "rgba(20, 32, 50, 0.42)",
    shadow: "rgba(21, 127, 135, 0.22)",
  };
}

function getScreenTextFontSize(text, maxWidth) {
  for (let size = 22; size >= 15; size -= 1) {
    ctx.font = canvasFont(1000, size);
    if (ctx.measureText(text).width <= maxWidth - 30) return size;
  }
  return 15;
}

function drawEffects() {
  drawHeliDeliveryEffect();

  activeRun.particles.forEach((particle) => {
    const alpha = clamp(particle.ttl / 0.7, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  activeRun.floatTexts.forEach((item) => {
    const alpha = clamp(item.ttl / (item.initialTtl ?? 0.9), 0, 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = canvasFont(1000, item.size ?? 12);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(20 32 50 / 78%)";
    ctx.strokeText(item.text, item.x, item.y);
    ctx.fillStyle = item.color;
    ctx.fillText(item.text, item.x, item.y);
    ctx.restore();
  });
}

function drawHeliDeliveryEffect() {
  const heli = activeRun.heliDelivery;
  if (!heli) return;

  const ratio = clamp(heli.elapsed / heli.duration, 0, 1);
  const eased = easeInOutCubic(ratio);
  const x = heli.from.x + (heli.to.x - heli.from.x) * eased;
  const y = heli.from.y + (heli.to.y - heli.from.y) * eased - Math.sin(ratio * Math.PI) * 52;
  const angle = Math.atan2(heli.to.y - heli.from.y, heli.to.x - heli.from.x);
  const rotor = performance.now() * 0.05;

  ctx.save();
  ctx.strokeStyle = "rgb(94 150 223 / 52%)";
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 9]);
  ctx.beginPath();
  ctx.moveTo(heli.from.x, heli.from.y);
  ctx.quadraticCurveTo((heli.from.x + heli.to.x) / 2, Math.min(heli.from.y, heli.to.y) - 76, heli.to.x, heli.to.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "rgb(20 32 50 / 22%)";
  ctx.beginPath();
  ctx.ellipse(0, 20, 24, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#5e96df";
  roundedRect(-18, -10, 36, 20, 9);
  ctx.fill();
  ctx.fillStyle = "#dffcff";
  roundedRect(4, -7, 12, 9, 4);
  ctx.fill();
  ctx.strokeStyle = "#172330";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(-30, -6);
  ctx.moveTo(18, 1);
  ctx.lineTo(31, 6);
  ctx.stroke();

  ctx.save();
  ctx.rotate(rotor);
  ctx.strokeStyle = "rgb(255 255 255 / 90%)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-28, -15);
  ctx.lineTo(28, -15);
  ctx.moveTo(0, -37);
  ctx.lineTo(0, 7);
  ctx.stroke();
  ctx.restore();

  drawPackageCanvasIcon(-4, 16, 0.35, "#d9962e");
  ctx.restore();
}

function drawStatusText() {
  return;
}

function drawTouchControl() {
  if (!touchControl.active) return;

  const dx = touchControl.currentX - touchControl.originX;
  const dy = touchControl.currentY - touchControl.originY;
  const distance = Math.hypot(dx, dy);
  const maxDistance = 42;
  const ratio = distance > 0 ? Math.min(distance, maxDistance) / distance : 0;
  const strength = clamp(distance / maxDistance, 0, 1);
  const stickX = touchControl.originX + dx * ratio;
  const stickY = touchControl.originY + dy * ratio;

  ctx.save();
  ctx.fillStyle = "rgb(20 32 50 / 26%)";
  ctx.beginPath();
  ctx.arc(touchControl.originX, touchControl.originY, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 70%)";
  ctx.lineWidth = 2;
  ctx.stroke();

  if (distance >= 10) {
    const angle = Math.atan2(dy, dx);
    ctx.strokeStyle = `rgb(18 216 223 / ${0.34 + strength * 0.5})`;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(touchControl.originX, touchControl.originY);
    ctx.lineTo(stickX, stickY);
    ctx.stroke();

    ctx.translate(stickX, stickY);
    ctx.rotate(angle);
    ctx.fillStyle = `rgb(255 255 255 / ${0.74 + strength * 0.2})`;
    ctx.beginPath();
    ctx.moveTo(18, 0);
    ctx.lineTo(1, -8);
    ctx.lineTo(5, 0);
    ctx.lineTo(1, 8);
    ctx.closePath();
    ctx.fill();
    ctx.rotate(-angle);
    ctx.translate(-stickX, -stickY);
  }

  ctx.fillStyle = "rgb(21 127 135 / 88%)";
  ctx.beginPath();
  ctx.arc(stickX, stickY, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 90%)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}

function drawEdgeHint(camera) {
  if (activeRun.status === "idle") return;

  const cell = getCurrentTarget();
  const point = toCanvasPoint(cell);
  const screenX = (point.x - camera.x) * camera.scale;
  const screenY = (point.y - camera.y) * camera.scale;
  const margin = 58;

  if (
    screenX >= margin &&
    screenX <= viewport.width - margin &&
    screenY >= margin &&
    screenY <= viewport.height - margin
  ) {
    return;
  }

  const x = clamp(screenX, margin, viewport.width - margin);
  const y = clamp(screenY, margin, viewport.height - margin);
  const isDestinationTarget = activeRun.carrying && cellKey(cell) === cellKey(currentJob.destination);
  const fill = isDestinationTarget ? "#e85d56" : "#f0b42c";
  const blocks = Math.max(1, Math.ceil(distanceToCell(activeRun.player, cell) / TILE));
  drawEdgeBadge(x, y, isDestinationTarget ? "destination" : "package", fill, `${isDestinationTarget ? COPY.terms.home : COPY.terms.bag} ${blocks}マス`);
}

function drawBonusEdgeHint(camera) {
  if (!activeRun.bonus || activeRun.status === "idle") return;

  const point = toCanvasPoint(activeRun.bonus.cell);
  const isWarning = activeRun.bonus.ttl <= BONUS_WARNING_TTL;
  const screenX = (point.x - camera.x) * camera.scale;
  const screenY = (point.y - camera.y) * camera.scale;
  const margin = 56;

  if (
    screenX >= margin &&
    screenX <= viewport.width - margin &&
    screenY >= margin &&
    screenY <= viewport.height - margin
  ) {
    return;
  }

  const x = clamp(screenX, margin, viewport.width - margin);
  const y = clamp(screenY, margin, viewport.height - margin);
  const blocks = Math.max(1, Math.ceil(distanceToCell(activeRun.player, activeRun.bonus.cell) / TILE));
  const fill = isWarning ? "#ff9a7a" : "#12d8df";
  drawEdgeBadge(x, y, "clock", fill, `時計 ${blocks}マス`);
}

function drawEdgeBadge(x, y, icon, fill, badgeText) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgb(20 32 50 / 28%)";
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.fill();
  drawEdgeBadgeIcon(icon);

  ctx.font = canvasFont(1000, 12);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const badgeWidth = Math.max(58, Math.min(94, ctx.measureText(badgeText).width + 18));
  ctx.fillStyle = "rgb(20 32 50 / 82%)";
  roundedRect(-badgeWidth / 2, 30, badgeWidth, 20, 10);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(badgeText, 0, 40);
  ctx.restore();
}

function drawEdgeBadgeIcon(icon) {
  if (icon === "destination") {
    drawDestinationCanvasIcon(0, 0, 0.66);
    return;
  }

  if (icon === "clock") {
    drawClockCanvasIcon(0, 0, 0.78, "#10313a");
    return;
  }

  drawPackageCanvasIcon(0, 1, 0.62, "#d9962e");
}

function createDailyMap(dateKey) {
  const seed = hashString(dateKey);
  const rng = mulberry32(seed);
  const road = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const verticalChoices = createLaneChoices(COLS, 3);
  const horizontalChoices = createLaneChoices(ROWS, 3);
  const verticals = pickUnique(verticalChoices, 8, rng).sort((a, b) => a - b);
  const horizontals = pickUnique(horizontalChoices, 7, rng).sort((a, b) => a - b);

  verticals.forEach((col) => {
    for (let row = 0; row < ROWS; row += 1) {
      road[row][col] = true;
    }
  });

  horizontals.forEach((row) => {
    for (let col = 0; col < COLS; col += 1) {
      road[row][col] = true;
    }
  });

  for (let i = 0; i < 26; i += 1) {
    carveBranchRoad(road, verticals, horizontals, rng);
  }

  for (let i = 0; i < 8; i += 1) {
    carveBlockLoop(road, verticals, horizontals, rng);
  }

  const riverFeature = createRiverFeature(road, verticals, horizontals, rng);
  const diagonalAlleys = createDiagonalAlleys(road, rng, 10);
  const candidates = [];

  for (let row = 1; row < ROWS - 1; row += 1) {
    for (let col = 1; col < COLS - 1; col += 1) {
      if (road[row][col]) {
        candidates.push({ col, row });
      }
    }
  }

  const startCell = candidates[Math.floor(candidates.length / 2)];

  return {
    seed,
    road,
    river: riverFeature.river,
    bridges: riverFeature.bridges,
    riverOrientation: riverFeature.orientation,
    diagonalAlleys,
    verticals,
    horizontals,
    candidates,
    startCell,
  };
}

function createLaneChoices(size, step) {
  const choices = [];
  for (let index = 2; index < size - 2; index += step) {
    choices.push(index);
  }
  if (!choices.includes(size - 3)) choices.push(size - 3);
  return choices;
}

function createEmptyCellGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(false));
}

function createRiverFeature(road, verticals, horizontals, rng) {
  const river = createEmptyCellGrid();
  const bridges = createEmptyCellGrid();
  const orientation = rng() < 0.5 ? "horizontal" : "vertical";

  if (orientation === "horizontal") {
    const usableRows = Array.from({ length: ROWS - 6 }, (_item, index) => index + 3).filter((row) => !horizontals.includes(row));
    const row = usableRows[Math.floor(rng() * usableRows.length)] ?? Math.floor(ROWS / 2);
    for (let col = 0; col < COLS; col += 1) {
      river[row][col] = true;
      if (road[row][col]) bridges[row][col] = true;
    }
  } else {
    const usableCols = Array.from({ length: COLS - 6 }, (_item, index) => index + 3).filter((col) => !verticals.includes(col));
    const col = usableCols[Math.floor(rng() * usableCols.length)] ?? Math.floor(COLS / 2);
    for (let row = 0; row < ROWS; row += 1) {
      river[row][col] = true;
      if (road[row][col]) bridges[row][col] = true;
    }
  }

  return { river, bridges, orientation };
}

function createDiagonalAlleys(road, rng, count) {
  const candidates = [];
  const cornerPairs = [
    {
      corner: "topRight",
      from: (col, row) => ({ col, row: row - 1 }),
      to: (col, row) => ({ col: col + 1, row }),
    },
    {
      corner: "bottomRight",
      from: (col, row) => ({ col: col + 1, row }),
      to: (col, row) => ({ col, row: row + 1 }),
    },
    {
      corner: "bottomLeft",
      from: (col, row) => ({ col, row: row + 1 }),
      to: (col, row) => ({ col: col - 1, row }),
    },
    {
      corner: "topLeft",
      from: (col, row) => ({ col: col - 1, row }),
      to: (col, row) => ({ col, row: row - 1 }),
    },
  ];

  for (let row = 1; row < ROWS - 1; row += 1) {
    for (let col = 1; col < COLS - 1; col += 1) {
      if (road[row][col]) continue;

      cornerPairs.forEach((pair) => {
        const from = pair.from(col, row);
        const to = pair.to(col, row);
        if (!road[from.row]?.[from.col] || !road[to.row]?.[to.col]) return;
        candidates.push({
          id: `alley-${col}-${row}-${pair.corner}`,
          from,
          to,
          cutCell: { col, row },
          corner: pair.corner,
        });
      });
    }
  }

  const selected = [];
  const shuffled = [...candidates].sort(() => rng() - 0.5);
  shuffled.forEach((alley) => {
    if (selected.length >= count) return;
    if (selected.some((item) => cellDistance(item.cutCell, alley.cutCell) < 4)) return;
    selected.push(alley);
  });

  return selected;
}

function carveBranchRoad(road, verticals, horizontals, rng) {
  const horizontal = rng() < 0.58;

  if (horizontal) {
    const row = 1 + Math.floor(rng() * (ROWS - 2));
    const anchorCol = verticals[Math.floor(rng() * verticals.length)];
    const nearestRow = findNearestNumber(horizontals, row);
    const direction = rng() < 0.5 ? -1 : 1;
    const length = 3 + Math.floor(rng() * 7);

    for (let nextRow = Math.min(row, nearestRow); nextRow <= Math.max(row, nearestRow); nextRow += 1) {
      road[nextRow][anchorCol] = true;
    }

    for (let step = 0; step <= length; step += 1) {
      const col = clamp(anchorCol + direction * step, 1, COLS - 2);
      road[row][col] = true;
    }
    return;
  }

  const col = 1 + Math.floor(rng() * (COLS - 2));
  const anchorRow = horizontals[Math.floor(rng() * horizontals.length)];
  const nearestCol = findNearestNumber(verticals, col);
  const direction = rng() < 0.5 ? -1 : 1;
  const length = 3 + Math.floor(rng() * 6);

  for (let nextCol = Math.min(col, nearestCol); nextCol <= Math.max(col, nearestCol); nextCol += 1) {
    road[anchorRow][nextCol] = true;
  }

  for (let step = 0; step <= length; step += 1) {
    const row = clamp(anchorRow + direction * step, 1, ROWS - 2);
    road[row][col] = true;
  }
}

function carveBlockLoop(road, verticals, horizontals, rng) {
  const left = 2 + Math.floor(rng() * (COLS - 10));
  const top = 2 + Math.floor(rng() * (ROWS - 8));
  const width = 4 + Math.floor(rng() * 5);
  const height = 3 + Math.floor(rng() * 4);
  const right = Math.min(COLS - 2, left + width);
  const bottom = Math.min(ROWS - 2, top + height);

  for (let col = left; col <= right; col += 1) {
    road[top][col] = true;
    road[bottom][col] = true;
  }

  for (let row = top; row <= bottom; row += 1) {
    road[row][left] = true;
    road[row][right] = true;
  }

  const connectorCol = findNearestNumber(verticals, left);
  const connectorRow = findNearestNumber(horizontals, top);
  for (let col = Math.min(connectorCol, left); col <= Math.max(connectorCol, left); col += 1) {
    road[connectorRow][col] = true;
  }
  for (let row = Math.min(connectorRow, top); row <= Math.max(connectorRow, top); row += 1) {
    road[row][left] = true;
  }
}

function findNearestNumber(items, target) {
  return items.reduce((nearest, item) => (Math.abs(item - target) < Math.abs(nearest - target) ? item : nearest), items[0]);
}

function createSupportItems(dailyMap, rng, job, player, events = []) {
  const playerCell = {
    col: Math.floor(player.x / TILE),
    row: Math.floor(player.y / TILE),
  };
  const pickupChoices = getPickupChoices(job);
  const avoidCells = [dailyMap.startCell, playerCell, job.destination, ...pickupChoices.map((choice) => choice.cell), ...events.map((event) => event.cell)];
  const kinds = getSupportItemKindsForDay();
  const selected = [];
  const items = [];

  kinds.slice(0, SUPPORT_ITEM_COUNT).forEach((kind, index) => {
    const cell = chooseRoadEventCell(dailyMap.candidates, rng, selected, avoidCells, 3);
    if (!cell) return;
    selected.push(cell);
    items.push({
      id: `support-${kind}-${index}`,
      kind,
      cell,
      collected: false,
      phase: rng() * Math.PI * 2,
    });
  });

  return items;
}

function getSupportItemKindsForDay() {
  const extraKinds = {
    clock: ["clock", "clock", "clock"],
    shield: ["shield", "shield", "clock"],
    magnet: ["magnet", "magnet", "clock"],
    turbo: ["turbo", "turbo", "magnet"],
    flight: ["flight", "flight", "shield"],
  }[dailyModifier.key] ?? [];

  return [
    ...extraKinds,
    "clock",
    "clock",
    "clock",
    "shield",
    "shield",
    "magnet",
    "magnet",
    "turbo",
    "turbo",
    "flight",
    "flight",
    "star",
    "star",
    "star",
    "clock",
    "magnet",
    "turbo",
    "flight",
  ];
}

function createRoadEvents(dailyMap, rng, job) {
  const list = [];
  const selected = [];
  const avoidCells = [dailyMap.startCell, job.destination, ...getPickupChoices(job).map((choice) => choice.cell)];
  const candidates = dailyMap.candidates.filter((cell) => avoidCells.every((avoidCell) => cellDistance(cell, avoidCell) >= 2));
  const dryCandidates = candidates.filter((cell) => !dailyMap.river?.[cell.row]?.[cell.col]);
  const intersections = candidates.filter((cell) => isIntersectionCell(dailyMap, cell));
  const dryIntersections = intersections.filter((cell) => !dailyMap.river?.[cell.row]?.[cell.col]);
  const straightLanes = dryCandidates.filter((cell) => isComfortableStraightCell(dailyMap, cell) && !isNearIntersectionCell(dailyMap, cell));
  const trapLanes = straightLanes.length > 0 ? straightLanes : dryCandidates.filter((cell) => isStraightRoadCell(dailyMap, cell));
  const easyLanes = trapLanes.length > 0 ? trapLanes : dryCandidates.length > 0 ? dryCandidates : candidates;
  const tailwindCount = dailyModifier.key === "turbo" ? 5 : 3;
  const electricCount = dailyModifier.key === "shield" ? 3 : 4;
  const roadworkCount = dailyModifier.key === "shield" ? 4 : 5;

  addRoadEvents(list, selected, dryIntersections, rng, avoidCells, "signal", 4, {
    radius: 23,
    minSpacing: 4,
    extra: () => ({
      phase: rng() * SIGNAL_CYCLE_SECONDS,
    }),
  });
  addRoadEvents(list, selected, dryIntersections, rng, avoidCells, "rail", 2, {
    radius: 24,
    minSpacing: 5,
    extra: (cell) => ({
      angle: getRoadAxisAngle(dailyMap, cell, rng),
      phase: rng() * RAIL_CYCLE_SECONDS,
    }),
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "roadwork", roadworkCount, {
    radius: 24,
    minSpacing: 5,
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "oil", 4, {
    radius: 27,
    minSpacing: 3,
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "electric", electricCount, {
    radius: 28,
    minSpacing: 5,
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "puddle", 4, {
    radius: 28,
    minSpacing: 3,
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "crowd", 3, {
    radius: 28,
    minSpacing: 3,
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "tailwind", tailwindCount, {
    radius: 27,
    minSpacing: 4,
    extra: (cell) => ({
      angle: getRoadEventAngle(dailyMap, cell, rng),
    }),
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "slope", 4, {
    radius: 30,
    minSpacing: 4,
    extra: (cell) => ({
      angle: getRoadEventAngle(dailyMap, cell, rng),
    }),
  });
  addRoadEvents(list, selected, easyLanes, rng, avoidCells, "festival", 2, {
    radius: 29,
    minSpacing: 5,
    extra: (cell) => ({
      angle: getRoadAxisAngle(dailyMap, cell, rng),
      phase: rng() * FESTIVAL_CYCLE_SECONDS,
    }),
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "stand", 2, {
    radius: 28,
    minSpacing: 5,
  });
  addRoadEvents(list, selected, dryCandidates, rng, avoidCells, "post", 2, {
    radius: 27,
    minSpacing: 6,
  });
  addRoadEvents(list, selected, dryCandidates, rng, avoidCells, "heli", 1, {
    radius: 30,
    minSpacing: 7,
  });
  addShortcutPairs(list, selected, dryCandidates.length > 0 ? dryCandidates : candidates, rng, avoidCells, 2);
  ensureRoadEventCount(list, selected, easyLanes, rng, avoidCells, "tailwind", Math.min(3, tailwindCount), {
    radius: 27,
    minSpacing: 2,
    extra: (cell) => ({
      angle: getRoadEventAngle(dailyMap, cell, rng),
    }),
  });
  ensureRoadEventCount(list, selected, easyLanes, rng, avoidCells, "slope", 3, {
    radius: 30,
    minSpacing: 2,
    extra: (cell) => ({
      angle: getRoadEventAngle(dailyMap, cell, rng),
    }),
  });
  ensureRoadEventCount(list, selected, easyLanes, rng, avoidCells, "festival", 2, {
    radius: 29,
    minSpacing: 2,
    extra: (cell) => ({
      angle: getRoadAxisAngle(dailyMap, cell, rng),
      phase: rng() * FESTIVAL_CYCLE_SECONDS,
    }),
  });

  return list;
}

function addRoadEvents(list, selected, pool, rng, avoidCells, kind, count, options) {
  const source = pool.length > 0 ? pool : map.candidates;

  for (let index = 0; index < count; index += 1) {
    const cell = chooseRoadEventCell(source, rng, selected, avoidCells, options.minSpacing ?? 3);
    if (!cell) return;

    selected.push(cell);
    list.push({
      id: `${kind}-${index}`,
      kind,
      cell,
      radius: options.radius,
      cooldown: 0,
      ...(options.extra?.(cell, index) ?? {}),
    });
  }
}

function ensureRoadEventCount(list, selected, pool, rng, avoidCells, kind, count, options) {
  const source = pool.length > 0 ? pool : map.candidates;
  let currentCount = list.filter((event) => event.kind === kind).length;

  while (currentCount < count) {
    const cell = chooseRoadEventCell(source, rng, selected, avoidCells, options.minSpacing ?? 2) ??
      chooseRelaxedRoadEventCell(source, rng, selected, avoidCells);
    if (!cell) return;

    selected.push(cell);
    list.push({
      id: `${kind}-${currentCount}`,
      kind,
      cell,
      radius: options.radius,
      cooldown: 0,
      ...(options.extra?.(cell, currentCount) ?? {}),
    });
    currentCount += 1;
  }
}

function chooseRoadEventCell(cells, rng, selected, avoidCells, minSpacing) {
  const shuffled = [...cells].sort(() => rng() - 0.5);
  const isUsable = (cell, spacing, avoidDistance) =>
    selected.every((selectedCell) => cellKey(selectedCell) !== cellKey(cell) && cellDistance(selectedCell, cell) >= spacing) &&
    avoidCells.every((avoidCell) => cellDistance(cell, avoidCell) >= avoidDistance);

  return (
    shuffled.find((cell) => isUsable(cell, minSpacing, 2)) ??
    shuffled.find((cell) => isUsable(cell, Math.max(2, minSpacing - 1), 1)) ??
    null
  );
}

function chooseRelaxedRoadEventCell(cells, rng, selected, avoidCells) {
  const shuffled = [...cells].sort(() => rng() - 0.5);
  return shuffled.find((cell) =>
    selected.every((selectedCell) => cellKey(selectedCell) !== cellKey(cell)) &&
    avoidCells.every((avoidCell) => cellDistance(cell, avoidCell) >= 1),
  ) ?? null;
}

function addShortcutPairs(list, selected, cells, rng, avoidCells, count) {
  const colors = ["#8e6df0", "#12d8df"];

  for (let index = 0; index < count; index += 1) {
    const entry = chooseRoadEventCell(cells, rng, selected, avoidCells, 4);
    if (!entry) return;

    selected.push(entry);
    const target = chooseShortcutTarget(cells, rng, selected, avoidCells, entry);
    if (!target) {
      selected.pop();
      return;
    }

    selected.push(target);
    const pairId = index;
    const color = colors[index % colors.length];
    list.push(
      {
        id: `shortcut-${index}-a`,
        kind: "shortcut",
        cell: entry,
        targetCell: target,
        pairId,
        color,
        radius: 25,
        cooldown: 0,
      },
      {
        id: `shortcut-${index}-b`,
        kind: "shortcut",
        cell: target,
        targetCell: entry,
        pairId,
        color,
        radius: 25,
        cooldown: 0,
      },
    );
  }
}

function chooseShortcutTarget(cells, rng, selected, avoidCells, entry) {
  const shuffled = [...cells].sort(() => rng() - 0.5);
  return (
    shuffled.find(
      (cell) =>
        cellDistance(cell, entry) >= 9 &&
        selected.every((selectedCell) => cellKey(selectedCell) !== cellKey(cell) && cellDistance(selectedCell, cell) >= 4) &&
        avoidCells.every((avoidCell) => cellDistance(cell, avoidCell) >= 2),
    ) ??
    shuffled.find(
      (cell) =>
        cellDistance(cell, entry) >= 6 &&
        selected.every((selectedCell) => cellKey(selectedCell) !== cellKey(cell)) &&
        avoidCells.every((avoidCell) => cellDistance(cell, avoidCell) >= 1),
    ) ??
    null
  );
}

function isIntersectionCell(dailyMap, cell) {
  const horizontal = dailyMap.road[cell.row]?.[cell.col - 1] || dailyMap.road[cell.row]?.[cell.col + 1];
  const vertical = dailyMap.road[cell.row - 1]?.[cell.col] || dailyMap.road[cell.row + 1]?.[cell.col];
  return horizontal && vertical;
}

function isStraightRoadCell(dailyMap, cell) {
  const left = dailyMap.road[cell.row]?.[cell.col - 1];
  const right = dailyMap.road[cell.row]?.[cell.col + 1];
  const up = dailyMap.road[cell.row - 1]?.[cell.col];
  const down = dailyMap.road[cell.row + 1]?.[cell.col];

  return (left && right && !up && !down) || (up && down && !left && !right);
}

function isComfortableStraightCell(dailyMap, cell) {
  if (!isStraightRoadCell(dailyMap, cell)) return false;

  const left = dailyMap.road[cell.row]?.[cell.col - 1];
  const right = dailyMap.road[cell.row]?.[cell.col + 1];
  const axisCells = left && right
    ? [
        { col: cell.col - 1, row: cell.row },
        { col: cell.col + 1, row: cell.row },
      ]
    : [
        { col: cell.col, row: cell.row - 1 },
        { col: cell.col, row: cell.row + 1 },
      ];

  return axisCells.every((axisCell) => isStraightRoadCell(dailyMap, axisCell));
}

function isNearIntersectionCell(dailyMap, cell) {
  return getRoadNeighborsFromMap(dailyMap, cell).some((neighbor) => isIntersectionCell(dailyMap, neighbor));
}

function getRoadNeighborsFromMap(dailyMap, cell) {
  return [
    { col: cell.col + 1, row: cell.row },
    { col: cell.col - 1, row: cell.row },
    { col: cell.col, row: cell.row + 1 },
    { col: cell.col, row: cell.row - 1 },
  ].filter((neighbor) => dailyMap.road[neighbor.row]?.[neighbor.col]);
}

function getRoadEventAngle(dailyMap, cell, rng) {
  const directions = [];
  if (dailyMap.road[cell.row]?.[cell.col - 1]) directions.push(Math.PI);
  if (dailyMap.road[cell.row]?.[cell.col + 1]) directions.push(0);
  if (dailyMap.road[cell.row - 1]?.[cell.col]) directions.push(-Math.PI / 2);
  if (dailyMap.road[cell.row + 1]?.[cell.col]) directions.push(Math.PI / 2);
  return directions[Math.floor(rng() * directions.length)] ?? 0;
}

function getRoadAxisAngle(dailyMap, cell, rng) {
  const hasHorizontal = dailyMap.road[cell.row]?.[cell.col - 1] || dailyMap.road[cell.row]?.[cell.col + 1];
  const hasVertical = dailyMap.road[cell.row - 1]?.[cell.col] || dailyMap.road[cell.row + 1]?.[cell.col];

  if (hasHorizontal && hasVertical) return rng() < 0.5 ? 0 : Math.PI / 2;
  if (hasVertical) return Math.PI / 2;
  return 0;
}

function isSignalRed(event) {
  return getSignalProgress(event) < SIGNAL_RED_SECONDS;
}

function getSignalProgress(event) {
  return (performance.now() / 1000 + (event.phase ?? 0)) % SIGNAL_CYCLE_SECONDS;
}

function isRailClosed(event) {
  return getRailProgress(event) < RAIL_CLOSED_SECONDS;
}

function getRailProgress(event) {
  return (performance.now() / 1000 + (event.phase ?? 0)) % RAIL_CYCLE_SECONDS;
}

function isFestivalBusy(event) {
  return getFestivalProgress(event) < FESTIVAL_BUSY_SECONDS;
}

function getFestivalProgress(event) {
  return (performance.now() / 1000 + (event.phase ?? 0)) % FESTIVAL_CYCLE_SECONDS;
}

function createHazards(dailyMap) {
  const rng = mulberry32(hashString(`${todayKey}:hazards`));
  const colors = ["#c86f66", "#4f8990", "#7970b6", "#c89b38"];
  const list = [];

  dailyMap.horizontals.slice(0, 4).forEach((row, index) => {
    list.push({
      id: `car-${index}`,
      kind: "car",
      axis: "x",
      x: rng() * WORLD_WIDTH,
      y: centerOf(row),
      speed: (68 + rng() * 58) * (index % 2 === 0 ? 1 : -1),
      color: colors[index % colors.length],
      nearMissCooldown: 0,
    });
  });

  dailyMap.horizontals.slice(4, 5).forEach((row, index) => {
    list.push({
      id: `bus-${index}`,
      kind: "bus",
      axis: "x",
      x: rng() * WORLD_WIDTH,
      y: centerOf(row),
      speed: (44 + rng() * 28) * (index % 2 === 0 ? -1 : 1),
      color: "#334155",
      nearMissCooldown: 0,
    });
  });

  dailyMap.verticals.slice(3, 5).forEach((col, index) => {
    list.push({
      id: `scooter-${index}`,
      kind: "scooter",
      axis: "y",
      x: centerOf(col),
      y: rng() * WORLD_HEIGHT,
      speed: (82 + rng() * 50) * (index % 2 === 0 ? 1 : -1),
      color: index % 2 === 0 ? "#c89b38" : "#40a6b0",
      nearMissCooldown: 0,
    });
  });

  dailyMap.horizontals.slice(1, 2).forEach((row, index) => {
    list.push({
      id: `skater-${index}`,
      kind: "skater",
      axis: "x",
      x: rng() * WORLD_WIDTH,
      y: centerOf(row),
      speed: (92 + rng() * 42) * (index % 2 === 0 ? -1 : 1),
      color: "#4aa873",
      nearMissCooldown: 0,
    });
  });

  dailyMap.verticals.slice(0, 3).forEach((col, index) => {
    list.push({
      id: `walker-${index}`,
      kind: "walker",
      axis: "y",
      x: centerOf(col),
      y: rng() * WORLD_HEIGHT,
      speed: (42 + rng() * 34) * (index % 2 === 0 ? 1 : -1),
      nearMissCooldown: 0,
    });
  });

  return list;
}

function updateHazards(dt) {
  hazards.forEach((hazard) => {
    hazard.nearMissCooldown = Math.max(0, hazard.nearMissCooldown - dt);

    if (hazard.axis === "x") {
      hazard.x += hazard.speed * dt;
      if (hazard.x < -36) hazard.x = WORLD_WIDTH + 36;
      if (hazard.x > WORLD_WIDTH + 36) hazard.x = -36;
      return;
    }

    hazard.y += hazard.speed * dt;
    if (hazard.y < -36) hazard.y = WORLD_HEIGHT + 36;
    if (hazard.y > WORLD_HEIGHT + 36) hazard.y = -36;
  });
}

function findRoadRoute(start, goal) {
  if (!isRouteCell(start) || !isRouteCell(goal)) return [];

  const startKey = cellKey(start);
  const goalKey = cellKey(goal);
  const queue = [start];
  const cameFrom = new Map([[startKey, null]]);

  for (let index = 0; index < queue.length; index += 1) {
    const cell = queue[index];
    if (cellKey(cell) === goalKey) break;

    getRouteNeighbors(cell).forEach((neighbor) => {
      const key = cellKey(neighbor);
      if (cameFrom.has(key)) return;
      cameFrom.set(key, cell);
      queue.push(neighbor);
    });
  }

  if (!cameFrom.has(goalKey)) return [];

  const route = [];
  let current = goal;
  while (current) {
    route.push(current);
    current = cameFrom.get(cellKey(current));
  }

  return route.reverse();
}

function getRouteNeighbors(cell) {
  return [
    ...getRoadNeighbors(cell),
    ...getDiagonalAlleyNeighbors(cell),
  ];
}

function getRoadNeighbors(cell) {
  if (isDiagonalAlleyCell(cell)) return [];

  return [
    { col: cell.col + 1, row: cell.row },
    { col: cell.col - 1, row: cell.row },
    { col: cell.col, row: cell.row + 1 },
    { col: cell.col, row: cell.row - 1 },
  ].filter(isBaseRouteCell);
}

function isRoadCell(cell) {
  return cell.row >= 0 && cell.row < ROWS && cell.col >= 0 && cell.col < COLS && map.road[cell.row][cell.col];
}

function isRouteCell(cell) {
  return isBaseRouteCell(cell) || isDiagonalAlleyCell(cell);
}

function isBaseRouteCell(cell) {
  return isInMap(cell) && (map.road[cell.row][cell.col] || map.river?.[cell.row]?.[cell.col]);
}

function isRiverCell(cell) {
  return isInMap(cell) && map.river?.[cell.row]?.[cell.col];
}

function isBridgeCell(cell) {
  return isInMap(cell) && map.bridges?.[cell.row]?.[cell.col];
}

function isSlowRiverCell(cell) {
  return isRiverCell(cell) && !isBridgeCell(cell);
}

function isInMap(cell) {
  return cell && cell.row >= 0 && cell.row < ROWS && cell.col >= 0 && cell.col < COLS;
}

function isDiagonalAlleyCell(cell) {
  return (map.diagonalAlleys ?? []).some((alley) => cellKey(alley.cutCell) === cellKey(cell));
}

function getDiagonalAlleyNeighbors(cell) {
  return (map.diagonalAlleys ?? []).flatMap((alley) => {
    if (cellKey(alley.cutCell) === cellKey(cell)) return [alley.from, alley.to];
    if (cellKey(alley.from) === cellKey(cell)) return [alley.to];
    if (cellKey(alley.to) === cellKey(cell)) return [alley.from];
    return [];
  });
}

function getCurrentTarget() {
  if (activeRun.carrying) return currentJob.destination;
  if (canPickMorePackages()) return getPreferredPickupChoice()?.cell ?? currentJob.pickup;
  return getPreferredPickupChoice()?.cell ?? currentJob.pickup;
}

function getPickupChoices(job) {
  return job.pickupOptions?.length ? job.pickupOptions : [{ cell: job.pickup, label: COPY.terms.bag, bonus: 0 }];
}

function getAvailablePickupChoices(job) {
  const pickedKeys = new Set(job.pickedKeys ?? []);
  return getPickupChoices(job).filter((choice) => !pickedKeys.has(cellKey(choice.cell)));
}

function getPreferredPickupChoice() {
  const playerCell = getPlayerCell(activeRun.player);
  return getAvailablePickupChoices(currentJob)
    .map((choice) => {
      const route = findRoadRoute(playerCell, choice.cell);
      const routeDistance = route.length > 1 ? route.length - 1 : cellDistance(playerCell, choice.cell);
      return { ...choice, routeDistance };
    })
    .sort((a, b) => a.routeDistance - b.routeDistance || b.bonus - a.bonus)[0];
}

function getDirectionLabel(from, to) {
  if (to.col > from.col) return "右";
  if (to.col < from.col) return "左";
  if (to.row > from.row) return "下";
  if (to.row < from.row) return "上";
  return "";
}

function createBonus(rng, job, player) {
  const playerCell = {
    col: Math.floor(player.x / TILE),
    row: Math.floor(player.y / TILE),
  };
  const shuffled = [...map.candidates].sort(() => rng() - 0.5);
  const pickupChoices = getPickupChoices(job);
  const cell =
    shuffled.find(
      (candidate) =>
        pickupChoices.every((choice) => cellDistance(candidate, choice.cell) >= 3) &&
        cellDistance(candidate, job.destination) >= 3 &&
        cellDistance(candidate, playerCell) >= 3,
    ) ?? shuffled[0];

  return {
    cell,
    ttl: BONUS_TTL,
    maxTtl: BONUS_TTL,
  };
}

function getBonusTimeRatio(bonus) {
  return clamp(bonus.ttl / (bonus.maxTtl ?? BONUS_TTL), 0, 1);
}

function createJob(rng, previousDestination = null) {
  const destination = chooseCell(map.candidates, rng, previousDestination, 8);
  const pickupOptions = choosePickupChoices(rng, previousDestination ?? map.startCell, destination, getPickupChoiceCount());
  const pickup = pickupOptions[0].cell;
  const distance = Math.abs(pickup.col - destination.col) + Math.abs(pickup.row - destination.row);

  return {
    pickup,
    pickupOptions,
    destination,
    distance,
  };
}

function getPickupChoiceCount() {
  const deliveries = activeRun?.deliveries ?? 0;
  const score = activeRun?.score ?? 0;
  const baseCount = MIN_VISIBLE_PACKAGES + MAX_CARRY_PACKAGES;
  if (deliveries >= 10 || score >= 5200) return baseCount + 3;
  if (deliveries >= 7 || score >= 3200) return baseCount + 2;
  if (deliveries >= 3 || score >= 1200) return baseCount + 1;
  return baseCount;
}

function choosePickupChoices(rng, avoidCell, destination, count) {
  const shuffled = [...map.candidates].sort(() => rng() - 0.5);
  const minimumDistance = Math.min(12, 5 + Math.floor((activeRun?.deliveries ?? 0) / 2));
  const selected = [];

  shuffled.forEach((cell) => {
    if (selected.length >= count) return;
    if (avoidCell && cellDistance(cell, avoidCell) < 3) return;
    if (cellDistance(cell, destination) < minimumDistance) return;
    if (selected.some((choice) => cellDistance(choice.cell, cell) < 3)) return;
    const distance = cellDistance(cell, destination);
    selected.push({
      cell,
      distance,
      bonus: Math.max(0, Math.round((distance - minimumDistance) * 4)),
    });
  });

  if (selected.length < count) {
    shuffled.forEach((cell) => {
      if (selected.length >= count) return;
      if (selected.some((choice) => cellKey(choice.cell) === cellKey(cell))) return;
      const distance = cellDistance(cell, destination);
      selected.push({
        cell,
        distance,
        bonus: Math.max(0, Math.round((distance - 5) * 3)),
      });
    });
  }

  return selected
    .sort((a, b) => a.distance - b.distance)
    .map((choice, index) => ({
      ...choice,
      label: `バッグ${index + 1}`,
    }));
}

function getPickupOptionBonus(choice) {
  return Math.min(60, Math.max(0, choice.bonus ?? 0));
}

function createTimedJob(rng, previousDestination = null) {
  return {
    ...createJob(rng, previousDestination),
    startedAt: elapsedRunTime(),
    pickupAt: null,
    pickedKeys: [],
  };
}

function elapsedRunTime() {
  return GAME_SECONDS - activeRun.timeLeft;
}

function chooseCell(cells, rng, avoidCell, minDistance) {
  const shuffled = [...cells].sort(() => rng() - 0.5);
  const found = shuffled.find((cell) => {
    if (!avoidCell) return true;
    const distance = Math.abs(cell.col - avoidCell.col) + Math.abs(cell.row - avoidCell.row);
    return distance >= minDistance;
  });

  return found ?? cells[Math.floor(rng() * cells.length)];
}

function isWalkable(x, y, radius) {
  if (activeRun.flight > 0) {
    return x >= radius && x <= WORLD_WIDTH - radius && y >= radius && y <= WORLD_HEIGHT - radius;
  }

  return isGroundWalkable(x, y, radius);
}

function isGroundWalkable(x, y, radius) {
  if (!isRoadAtPoint(x, y)) return false;

  const hitRadius = radius * getCollisionRadiusScale();
  const points = [
    [x - hitRadius, y],
    [x + hitRadius, y],
    [x, y - hitRadius],
    [x, y + hitRadius],
  ];

  const blocked = points.filter(([pointX, pointY]) => !isRoadAtPoint(pointX, pointY)).length;
  return blocked <= 2;
}

function getCollisionRadiusScale() {
  if (activeRun?.rush > 0 || activeRun?.flight > 0) return RUSH_COLLISION_RADIUS_SCALE;
  return COLLISION_RADIUS_SCALE;
}

function resolveFlightLanding() {
  const player = activeRun.player;
  if (isGroundWalkable(player.x, player.y, PLAYER_RADIUS)) return;

  const landing = findNearestLandingPoint(player);
  if (!landing) return;

  player.x = landing.x;
  player.y = landing.y;
  activeRun.slip = 0;
  activeRun.flash = Math.max(activeRun.flash, 0.13);
  activeRun.invulnerable = Math.max(activeRun.invulnerable, 0.38);
  addFloatText(player.x, player.y - 38, "道へ着地", "#4f9cff", 0.95, -28);
  createBurst(player.x, player.y, "#4f9cff", 12);
  triggerShake(1.4, 0.13);
}

function findNearestLandingPoint(point) {
  const usableCells = map.candidates.filter((cell) => {
    const centerX = centerOf(cell.col);
    const centerY = centerOf(cell.row);
    return isGroundWalkable(centerX, centerY, PLAYER_RADIUS);
  });

  const nearest = usableCells.reduce((best, cell) => {
    const centerX = centerOf(cell.col);
    const centerY = centerOf(cell.row);
    const distance = Math.hypot(centerX - point.x, centerY - point.y);
    return !best || distance < best.distance ? { cell, distance } : best;
  }, null);

  return nearest ? toCanvasPoint(nearest.cell) : null;
}

function isRoadAtPoint(pointX, pointY) {
  const col = Math.floor(pointX / TILE);
  const row = Math.floor(pointY / TILE);
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false;
  if (map.road[row][col]) return true;
  if (map.river?.[row]?.[col]) return true;
  if (isInsideDiagonalAlley(pointX, pointY)) return true;
  return isInsideRoundedBuildingCutout(pointX, pointY, col, row);
}

function isInsideDiagonalAlley(pointX, pointY) {
  return (map.diagonalAlleys ?? []).some((alley) => {
    const from = toCanvasPoint(alley.from);
    const to = toCanvasPoint(alley.to);
    return distanceToSegment(pointX, pointY, from.x, from.y, to.x, to.y) <= 15;
  });
}

function isInsideRoundedBuildingCutout(pointX, pointY, col, row) {
  const localX = pointX - col * TILE;
  const localY = pointY - row * TILE;
  const radii = getBuildingCornerRadii(col, row, BUILDING_CORNER_RADIUS);

  return (
    isOutsideCorner(localX, localY, "topLeft", radii.topLeft) ||
    isOutsideCorner(localX, localY, "topRight", radii.topRight) ||
    isOutsideCorner(localX, localY, "bottomRight", radii.bottomRight) ||
    isOutsideCorner(localX, localY, "bottomLeft", radii.bottomLeft)
  );
}

function isOutsideCorner(localX, localY, corner, radius) {
  if (radius <= 0) return false;

  const centers = {
    topLeft: [radius, radius],
    topRight: [TILE - radius, radius],
    bottomRight: [TILE - radius, TILE - radius],
    bottomLeft: [radius, TILE - radius],
  };
  const [centerX, centerY] = centers[corner];
  const isCornerSquare =
    (corner === "topLeft" && localX < radius && localY < radius) ||
    (corner === "topRight" && localX > TILE - radius && localY < radius) ||
    (corner === "bottomRight" && localX > TILE - radius && localY > TILE - radius) ||
    (corner === "bottomLeft" && localX < radius && localY > TILE - radius);

  if (!isCornerSquare) return false;
  return Math.hypot(localX - centerX, localY - centerY) > radius;
}

function centerOf(index) {
  return index * TILE + TILE / 2;
}

function toCanvasPoint(cell) {
  return {
    x: centerOf(cell.col),
    y: centerOf(cell.row),
  };
}

function getPlayerCell(player) {
  return {
    col: clamp(Math.floor(player.x / TILE), 0, COLS - 1),
    row: clamp(Math.floor(player.y / TILE), 0, ROWS - 1),
  };
}

function distanceToCell(player, cell) {
  const point = toCanvasPoint(cell);
  return Math.hypot(player.x - point.x, player.y - point.y);
}

function cellKey(cell) {
  return `${cell.col}:${cell.row}`;
}

function cellDistance(a, b) {
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
}

function distanceToSegment(pointX, pointY, startX, startY, endX, endY) {
  const dx = endX - startX;
  const dy = endY - startY;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return Math.hypot(pointX - startX, pointY - startY);

  const t = clamp(((pointX - startX) * dx + (pointY - startY) * dy) / lengthSquared, 0, 1);
  const projectionX = startX + dx * t;
  const projectionY = startY + dy * t;
  return Math.hypot(pointX - projectionX, pointY - projectionY);
}

function renderRankings() {
  const records = getTodayScores(todayKey);
  const latestRecord = getLatestResultRecord();
  const ownRecord = getOwnRankingRecord(todayKey);
  const todayMarkup = renderTodayRankingMarkup(records, {
    highlightRecord: latestRecord,
    highlightPrefix: COPY.rankingText.currentPrefix,
  });
  const homeRecords = mergeRankingDisplayRecords(records, ownRecord ? [ownRecord] : []);
  const homeTodayMarkup = renderTodayRankingMarkup(homeRecords, {
    highlightRecord: ownRecord,
    highlightPrefix: COPY.rankingText.ownPrefix,
  });

  if (todayRanking) todayRanking.innerHTML = todayMarkup;
  if (homeTodayRanking) homeTodayRanking.innerHTML = homeTodayMarkup;

  const todayDate = parseJstDateKey(todayKey);
  const weekMarkup = weekDates
    .map((dateKey) => renderWeekRankingRow(dateKey, todayDate))
    .join("");

  if (weekRanking) weekRanking.innerHTML = weekMarkup;
  if (homeWeekRanking) homeWeekRanking.innerHTML = weekMarkup;
}

async function loadOnlineRankings(dateKey = todayKey) {
  if (!rankingApiUrl) return;

  try {
    const url = new URL(rankingApiUrl);
    url.searchParams.set("date", dateKey);
    const response = await fetchWithTimeout(
      url.toString(),
      {
        headers: {
          Accept: "application/json",
        },
      },
      RANKING_API_TIMEOUT_MS,
    );
    if (!response.ok) return;

    applyOnlineRankingResponse(await response.json());
    renderRankings();
    refreshResultRankSummary();
  } catch {
    // オンラインランキングに届かない時も、ローカル順位で遊べるようにする。
  }
}

async function submitOnlineScore(record) {
  if (!rankingApiUrl || !record || record.score <= 0) return;

  try {
    const response = await fetchWithTimeout(
      rankingApiUrl,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createOnlineScorePayload(record)),
      },
      RANKING_API_TIMEOUT_MS,
    );
    if (!response.ok) return;

    const payload = await response.json();
    applyOnlineRankingResponse(payload.ranking ?? payload);
    renderRankings();
    refreshResultRankSummary(record);
  } catch {
    // スコア送信に失敗しても、個人情報なしのローカル記録は残す。
  }
}

function createOnlineScorePayload(record) {
  return {
    dateKey: record.dateKey,
    randomName: record.randomName,
    score: record.score,
    mapSeed: record.mapSeed,
    deliveries: record.deliveries,
    combo: record.combo,
    collisions: record.collisions,
    nearMisses: record.nearMisses ?? 0,
    itemPickups: getRecordItemPickups(record),
    scoreBreakdown: { ...createEmptyScoreBreakdown(), ...(record.scoreBreakdown ?? {}) },
  };
}

function applyOnlineRankingResponse(payload) {
  if (!payload || typeof payload !== "object") return;
  const dateKey = typeof payload.dateKey === "string" ? payload.dateKey : todayKey;
  const today = Array.isArray(payload.today)
    ? payload.today.map(normalizeOnlineRankingRecord).filter(Boolean)
    : null;
  const week = Array.isArray(payload.week)
    ? payload.week.map(normalizeOnlineWeekEntry).filter(Boolean)
    : null;

  onlineRanking = {
    dateKey,
    today,
    week,
  };
}

function normalizeOnlineRankingRecord(record) {
  return sanitizeSessionScoreRecord({
    dateKey: record?.dateKey,
    randomName: record?.randomName,
    score: record?.score,
    deliveries: record?.deliveries,
    combo: record?.combo,
    collisions: record?.collisions,
    itemPickups: record?.itemPickups,
    nearMisses: record?.nearMisses,
    scoreBreakdown: record?.scoreBreakdown,
    mapSeed: record?.mapSeed,
    createdAt: record?.createdAt,
  });
}

function normalizeOnlineWeekEntry(entry) {
  if (!entry || typeof entry !== "object" || typeof entry.dateKey !== "string") return null;
  return {
    dateKey: entry.dateKey,
    top: entry.top ? normalizeOnlineRankingRecord(entry.top) : null,
  };
}

function refreshResultRankSummary(record = getLatestResultRecord()) {
  if (!record || !document.body.classList.contains("show-results")) return;
  const rankInfo = getRankInfo(record);
  resultRank.textContent = rankInfo.rankLabel;
  resultGap.textContent = rankInfo.gapLabel;
  renderResultNextMoves(record, rankInfo, getSessionBestScore(record.dateKey));
}

function getLatestResultRecord() {
  if (!latestResultCreatedAt) return null;
  return loadSessionScores().find((record) => record.createdAt === latestResultCreatedAt) ?? null;
}

function getOwnRankingRecord(dateKey) {
  const playerName = loadPlayerProfile().lastPlayerName;
  if (!playerName) return null;

  return (
    loadSessionScores()
      .filter((record) => record.dateKey === dateKey && record.randomName === playerName)
      .sort(compareRankingRecords)[0] ?? null
  );
}

function mergeRankingDisplayRecords(records, extraRecords) {
  return dedupeScoreSubmissions(mergeScoreRecords(records, extraRecords).sort(compareRankingRecords));
}

function renderTodayRankingMarkup(records, options = {}) {
  if (records.length === 0) {
    return `<li class="ranking-empty">${COPY.rankingText.empty}</li>`;
  }

  const topRows = records.slice(0, 10).map((record, index) => renderTodayRankingRow(record, index, options));
  const currentIndex = records.findIndex((record) => isHighlightedRankingRecord(record, options.highlightRecord));

  if (currentIndex >= 10) {
    topRows.push('<li class="ranking-gap" aria-hidden="true">...</li>');
    topRows.push(renderTodayRankingRow(records[currentIndex], currentIndex, options));
  }

  return topRows.join("");
}

function renderTodayRankingRow(record, index, options = {}) {
  const isCurrent = isHighlightedRankingRecord(record, options.highlightRecord);
  const podiumClass = index < 3 ? `is-podium is-podium-${index + 1}` : "";
  const crown = index < 3 ? `<b class="rank-crown" aria-hidden="true">♛</b>` : "";
  const topGap = isCurrent && index > 0 ? getTopGapLabel(record, todayKey) : "";
  const meta = copyText(COPY.rankingText.meta, { deliveries: record.deliveries, combo: record.combo });
  const prefix = isCurrent ? (options.highlightPrefix ?? COPY.rankingText.currentPrefix) : "";
  return `
    <li class="ranking-row ${podiumClass} ${isCurrent ? "is-current" : ""}">
      <span class="rank-index">${crown}<em>${index + 1}</em></span>
      <span>
        <span class="rank-name">${escapeHtml(record.randomName)}</span>
        <span class="rank-meta">${prefix}${meta}</span>
        ${topGap ? `<span class="rank-gap-text">${topGap}</span>` : ""}
      </span>
      <span class="rank-score">${formatNumber(record.score)}</span>
    </li>
  `;
}

function isHighlightedRankingRecord(record, highlightRecord) {
  return !!highlightRecord && isSameScoreSubmission(record, highlightRecord);
}

function getTopGapLabel(record, dateKey) {
  const top = getTodayScores(dateKey)[0];
  if (!top || record.score >= top.score || isSameScoreSubmission(top, record)) return "";
  const gap = Math.max(1, top.score - record.score + 1);
  return copyText(COPY.rankingText.topGap, { score: formatNumber(gap) });
}

function renderWeekRankingRow(dateKey, todayDate) {
  const date = parseJstDateKey(dateKey);
  const top = date <= todayDate ? getTodayScores(dateKey)[0] : null;
  const accent = getWeekdayAccent(dateKey);

  if (!top) {
    return `
      <div class="week-row" style="--week-accent: ${accent}">
        <span class="week-day">${getWeekdayLabel(dateKey)}</span>
        <span>
          <span class="week-name">-</span>
          <span class="week-meta">${COPY.rankingText.empty}</span>
        </span>
        <span class="week-score">-</span>
      </div>
    `;
  }

  return `
    <div class="week-row" style="--week-accent: ${accent}">
      <span class="week-day">${getWeekdayLabel(dateKey)}</span>
      <span>
        <span class="week-name">${escapeHtml(top.randomName)}</span>
        <span class="week-meta">${copyText(COPY.rankingText.meta, { deliveries: top.deliveries, combo: top.combo })}</span>
      </span>
      <span class="week-score">${formatNumber(top.score)}</span>
    </div>
  `;
}

function getTodayScores(dateKey) {
  const onlineRecords = getOnlineScoresForDate(dateKey);
  if (onlineRecords) {
    const currentRecord = loadSessionScores().find((record) => record.dateKey === dateKey && record.createdAt === latestResultCreatedAt);
    const shouldIncludeCurrent = currentRecord && !onlineRecords.some((record) => isSameScoreSubmission(record, currentRecord));
    return dedupeScoreSubmissions(mergeScoreRecords(onlineRecords, shouldIncludeCurrent ? [currentRecord] : []).sort(compareRankingRecords));
  }

  const session = loadSessionScores().filter((record) => record.dateKey === dateKey);
  return dedupeScoreSubmissions(session.sort(compareRankingRecords));
}

function compareRankingRecords(a, b) {
  return b.score - a.score || Date.parse(a.createdAt) - Date.parse(b.createdAt);
}

function dedupeScoreSubmissions(records) {
  const uniqueRecords = [];
  records.forEach((record) => {
    if (!uniqueRecords.some((existing) => isSameScoreSubmission(existing, record))) {
      uniqueRecords.push(record);
    }
  });
  return uniqueRecords;
}

function getOnlineScoresForDate(dateKey) {
  if (onlineRanking.dateKey === dateKey && onlineRanking.today) return onlineRanking.today;
  const weekEntry = onlineRanking.week?.find((entry) => entry.dateKey === dateKey);
  if (weekEntry) return weekEntry.top ? [weekEntry.top] : [];
  return null;
}

function getSessionBestScore(dateKey) {
  return loadSessionScores()
    .filter((record) => record.dateKey === dateKey)
    .reduce((best, record) => Math.max(best, record.score), 0);
}

function saveSessionScore(record) {
  try {
    const next = [record, ...loadSessionScores()].slice(0, 80);
    localStorage.setItem(SCORE_KEY, JSON.stringify(next));
    sessionStorage.setItem(SCORE_KEY, JSON.stringify(next));
  } catch {
    try {
      const next = [record, ...loadSessionScores()].slice(0, 80);
      sessionStorage.setItem(SCORE_KEY, JSON.stringify(next));
    } catch {
      // 記録保存が使えないブラウザ設定でも、遊び自体は止めない。
    }
  }
}

function loadSessionScores() {
  try {
    const localRecords = parseStoredScores(localStorage.getItem(SCORE_KEY));
    const sessionRecords = parseStoredScores(sessionStorage.getItem(SCORE_KEY));
    return mergeScoreRecords(localRecords, sessionRecords).slice(0, 80);
  } catch {
    try {
      return parseStoredScores(sessionStorage.getItem(SCORE_KEY)).slice(0, 80);
    } catch {
      return [];
    }
  }
}

function parseStoredScores(value) {
  const parsed = JSON.parse(value ?? "[]");
  return Array.isArray(parsed) ? parsed.map(sanitizeSessionScoreRecord).filter(Boolean) : [];
}

function mergeScoreRecords(...recordGroups) {
  const seen = new Set();
  return recordGroups
    .flat()
    .filter((record) => {
      const key = `${record.dateKey}:${record.createdAt}:${record.randomName}:${record.score}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

function updatePlayerProfile(record) {
  const current = loadPlayerProfile();
  const next = {
    lastPlayerName: record.randomName,
    nameStyle: PROFILE_NAME_STYLE,
    bestScore: Math.max(current.bestScore, record.score),
    totalDeliveries: current.totalDeliveries + record.deliveries,
    totalPlays: current.totalPlays + 1,
  };

  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  } catch {
    // LocalStorage が使えない環境では、今回の表示だけに使う。
  }

  return next;
}

function loadPlayerProfile() {
  try {
    return sanitizePlayerProfile(JSON.parse(localStorage.getItem(PROFILE_KEY) ?? "{}"));
  } catch {
    return sanitizePlayerProfile({});
  }
}

function sanitizePlayerProfile(profile) {
  const lastPlayerName =
    profile.nameStyle === PROFILE_NAME_STYLE && isValidPlayerName(profile.lastPlayerName)
      ? profile.lastPlayerName
      : "";

  return {
    lastPlayerName,
    nameStyle: profile.nameStyle === PROFILE_NAME_STYLE ? PROFILE_NAME_STYLE : "",
    bestScore: sanitizeInteger(profile.bestScore, 0, 9999999),
    totalDeliveries: sanitizeInteger(profile.totalDeliveries, 0, 999999),
    totalPlays: sanitizeInteger(profile.totalPlays, 0, 99999),
  };
}

function getRunPlayerName(randomSource) {
  const profile = loadPlayerProfile();
  if (profile.lastPlayerName) return profile.lastPlayerName;

  const randomName = generateRandomPlayerName(randomSource);
  savePlayerName(randomName);
  return randomName;
}

function savePlayerName(randomName) {
  if (!isValidPlayerName(randomName)) return;

  try {
    const current = loadPlayerProfile();
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...current, lastPlayerName: randomName, nameStyle: PROFILE_NAME_STYLE }));
  } catch {
    // 名前を保存できない環境でも、今回のプレイはそのまま続ける。
  }
}

function isValidPlayerName(randomName) {
  return typeof randomName === "string" && /^[ぁ-んァ-ン一-龥々ー]{2,16}$/.test(randomName);
}

function isSameScoreSubmission(left, right) {
  if (!left || !right) return false;
  if (getScoreSubmissionKey(left) !== getScoreSubmissionKey(right)) return false;
  if (left.createdAt === right.createdAt) return true;
  if (left.createdAt === latestResultCreatedAt || right.createdAt === latestResultCreatedAt) return true;
  return isCloseSubmissionTime(left.createdAt, right.createdAt);
}

function getScoreSubmissionKey(record) {
  return [
    record.dateKey,
    record.randomName,
    record.score,
    record.mapSeed,
    record.deliveries,
    record.combo,
    record.collisions,
    record.nearMisses ?? 0,
  ].join("|");
}

function isCloseSubmissionTime(leftCreatedAt, rightCreatedAt) {
  const leftTime = Date.parse(leftCreatedAt);
  const rightTime = Date.parse(rightCreatedAt);
  if (!Number.isFinite(leftTime) || !Number.isFinite(rightTime)) return false;
  return Math.abs(leftTime - rightTime) <= SCORE_SUBMISSION_MATCH_WINDOW_MS;
}

function sanitizeSessionScoreRecord(record) {
  if (!record || typeof record !== "object") return null;

  const dateKey = typeof record.dateKey === "string" && /^\d{4}-\d{2}-\d{2}$/.test(record.dateKey) ? record.dateKey : null;
  const randomName =
    typeof record.randomName === "string" && /^[ぁ-んァ-ン一-龥々ー]{2,16}$/.test(record.randomName) ? record.randomName : null;
  const createdAt = typeof record.createdAt === "string" && !Number.isNaN(Date.parse(record.createdAt)) ? record.createdAt : null;
  if (!dateKey || !randomName || !createdAt) return null;

  const bonuses = sanitizeInteger(record.bonuses, 0, 120);

  return {
    dateKey,
    randomName,
    score: sanitizeInteger(record.score, 0, 999999),
    deliveries: sanitizeInteger(record.deliveries, 0, 80),
    combo: sanitizeInteger(record.combo, 0, 80),
    collisions: sanitizeInteger(record.collisions, 0, 120),
    bonuses,
    supportPickups: sanitizeInteger(record.supportPickups, 0, 120),
    itemPickups: sanitizeItemPickups(record.itemPickups, bonuses),
    dailyMissionCompleted: record.dailyMissionCompleted === true,
    maxCarry: sanitizeInteger(record.maxCarry, 0, MAX_CARRY_PACKAGES),
    nearMisses: sanitizeInteger(record.nearMisses, 0, 200),
    scoreBreakdown: sanitizeScoreBreakdown(record.scoreBreakdown),
    mapSeed: sanitizeInteger(record.mapSeed, 0, 4294967295),
    createdAt,
  };
}

function sanitizeItemPickups(itemPickups, fallbackClock = 0) {
  const safe = createEmptyItemPickups();
  if (!itemPickups || typeof itemPickups !== "object") {
    safe.clock = sanitizeInteger(fallbackClock, 0, 120);
    return safe;
  }

  Object.keys(safe).forEach((key) => {
    safe[key] = sanitizeInteger(itemPickups[key], 0, 120);
  });

  return safe;
}

function sanitizeScoreBreakdown(scoreBreakdown) {
  const safe = createEmptyScoreBreakdown();
  if (!scoreBreakdown || typeof scoreBreakdown !== "object") return safe;

  Object.keys(safe).forEach((key) => {
    safe[key] = sanitizeInteger(scoreBreakdown[key], -999999, 999999);
  });

  return safe;
}

function sanitizeInteger(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return clamp(Math.round(number), min, max);
}

function generateRandomPlayerName(randomSource) {
  const adjective = pickRandomNamePart(shortNameAdjectives, randomSource);
  const link = pickRandomNamePart(shortNameLinks, randomSource);
  const noun = pickRandomNamePart(shortNameNouns, randomSource);
  return `${adjective}${link}${noun}`;
}

function pickRandomNamePart(items, randomSource) {
  return items[Math.floor(randomSource() * items.length)];
}

function createRunId() {
  const browserCrypto = globalThis.crypto;

  if (browserCrypto?.randomUUID) {
    return browserCrypto.randomUUID();
  }

  if (browserCrypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    browserCrypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0"));
    return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${performance.now().toString(36).replace(".", "")}`;
}

function pickUnique(items, count, rng) {
  const pool = [...items];
  const selected = [];

  while (selected.length < count && pool.length > 0) {
    const index = Math.floor(rng() * pool.length);
    selected.push(pool.splice(index, 1)[0]);
  }

  return selected;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function moveToward(value, target, amount) {
  if (Math.abs(target - value) <= amount) return target;
  return value + Math.sign(target - value) * amount;
}

function roundedRect(x, y, width, height, radius, drawingContext = ctx) {
  const r = Math.min(radius, width / 2, height / 2);
  drawingContext.beginPath();
  if (drawingContext.roundRect) {
    drawingContext.roundRect(x, y, width, height, r);
    return;
  }

  drawingContext.moveTo(x + r, y);
  drawingContext.lineTo(x + width - r, y);
  drawingContext.quadraticCurveTo(x + width, y, x + width, y + r);
  drawingContext.lineTo(x + width, y + height - r);
  drawingContext.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  drawingContext.lineTo(x + r, y + height);
  drawingContext.quadraticCurveTo(x, y + height, x, y + height - r);
  drawingContext.lineTo(x, y + r);
  drawingContext.quadraticCurveTo(x, y, x + r, y);
}

function roundedRectCorners(x, y, width, height, radii, drawingContext = ctx) {
  const topLeft = Math.min(radii.topLeft ?? 0, width / 2, height / 2);
  const topRight = Math.min(radii.topRight ?? 0, width / 2, height / 2);
  const bottomRight = Math.min(radii.bottomRight ?? 0, width / 2, height / 2);
  const bottomLeft = Math.min(radii.bottomLeft ?? 0, width / 2, height / 2);

  drawingContext.beginPath();
  drawingContext.moveTo(x + topLeft, y);
  drawingContext.lineTo(x + width - topRight, y);
  if (topRight > 0) {
    drawingContext.quadraticCurveTo(x + width, y, x + width, y + topRight);
  } else {
    drawingContext.lineTo(x + width, y);
  }
  drawingContext.lineTo(x + width, y + height - bottomRight);
  if (bottomRight > 0) {
    drawingContext.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
  } else {
    drawingContext.lineTo(x + width, y + height);
  }
  drawingContext.lineTo(x + bottomLeft, y + height);
  if (bottomLeft > 0) {
    drawingContext.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
  } else {
    drawingContext.lineTo(x, y + height);
  }
  drawingContext.lineTo(x, y + topLeft);
  if (topLeft > 0) {
    drawingContext.quadraticCurveTo(x, y, x + topLeft, y);
  } else {
    drawingContext.lineTo(x, y);
  }
  drawingContext.closePath();
}

function hashString(value) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getJstDateKey(date) {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function parseJstDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}

function formatJstDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function getCurrentWeekDateKeys(dateKey) {
  const current = parseJstDateKey(dateKey);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(current);
    date.setUTCDate(current.getUTCDate() - (6 - index));
    return formatJstDateKey(date);
  });
}

function getWeekdayLabel(dateKey) {
  const labels = ["日", "月", "火", "水", "木", "金", "土"];
  return labels[parseJstDateKey(dateKey).getUTCDay()];
}

function getWeekdayAccent(dateKey) {
  const colors = ["#e85d56", "#157f87", "#6658d3", "#d18b18", "#22895d", "#b94b7d", "#2b79c2"];
  return colors[parseJstDateKey(dateKey).getUTCDay()];
}

function getDailyCityName(dateKey) {
  return getDailyMission(dateKey).cityLabel;
}

function getDailyModifier(dateKey) {
  const modifiers = [
    { key: "clock", label: "時計多め" },
    { key: "shield", label: "甲羅守り多め" },
    { key: "magnet", label: "磁石多め" },
    { key: "turbo", label: "追い風多め" },
    { key: "flight", label: "ひこうき多め" },
  ];
  return modifiers[hashString(`${dateKey}:modifier`) % modifiers.length];
}

function getDailyMission(dateKey) {
  const rng = mulberry32(hashString(`${dateKey}:city-name`));
  const cityAdjectives = [
    "にぎやかな",
    "風の強い",
    "坂の多い",
    "朝焼けの",
    "夕焼けの",
    "雨上がりの",
    "祭り前の",
    "路地が光る",
    "時計台のある",
    "商店街が元気な",
    "ビル風が走る",
    "屋台が並ぶ",
  ];
  const cityNouns = [
    "まちかど",
    "港町",
    "銀杏通り",
    "ひだまり坂",
    "青空商店街",
    "時計坂",
    "花咲き横丁",
    "中央通り",
    "水路の街",
    "駅前通り",
    "虹色横丁",
    "灯りの街",
  ];
  const adjective = cityAdjectives[Math.floor(rng() * cityAdjectives.length)];
  const noun = cityNouns[Math.floor(rng() * cityNouns.length)];
  const mission = getDailyMissionDefinition(dateKey);

  return {
    cityLabel: `今日の街 ${adjective}${noun}`,
    ...mission,
    short: mission.summary,
  };
}

function getDailyMissionDefinition(dateKey) {
  const missions = [
    {
      key: "deliver-3",
      summary: "バッグを3個、家へ配達しよう",
      conditionText: "3個配達",
      metric: "deliveries",
      target: 3,
      unit: "個",
      reward: 430,
    },
    {
      key: "deliver-4",
      summary: "バッグを4個、家へ配達しよう",
      conditionText: "4個配達",
      metric: "deliveries",
      target: 4,
      unit: "個",
      reward: 480,
    },
    {
      key: "combo-3",
      summary: "3連便を決めよう",
      conditionText: "3連便",
      metric: "combo",
      target: 3,
      unit: "連便",
      reward: 470,
    },
    {
      key: "carry-2",
      summary: "バッグを2個、甲羅にのせよう",
      conditionText: "2個同時持ち",
      metric: "maxCarry",
      target: 2,
      unit: "個",
      reward: 430,
    },
    {
      key: "items-2",
      summary: "アイテムを2個集めよう",
      conditionText: "アイテム2個",
      metric: "supportPickups",
      target: 2,
      unit: "個",
      reward: 420,
    },
    {
      key: "clock-1",
      summary: "時計を1個入手しよう",
      conditionText: "時計1個",
      metric: "item",
      itemKind: "clock",
      target: 1,
      unit: "個",
      reward: 390,
    },
    {
      key: "shield-1",
      summary: "甲羅守りを1個入手しよう",
      conditionText: "甲羅守り1個",
      metric: "item",
      itemKind: "shield",
      target: 1,
      unit: "個",
      reward: 390,
    },
    {
      key: "magnet-1",
      summary: "磁石を1個入手しよう",
      conditionText: "磁石1個",
      metric: "item",
      itemKind: "magnet",
      target: 1,
      unit: "個",
      reward: 390,
    },
    {
      key: "turbo-1",
      summary: "追い風を1個入手しよう",
      conditionText: "追い風1個",
      metric: "item",
      itemKind: "turbo",
      target: 1,
      unit: "個",
      reward: 390,
    },
    {
      key: "flight-1",
      summary: "ひこうきを1個入手しよう",
      conditionText: "ひこうき1個",
      metric: "item",
      itemKind: "flight",
      target: 1,
      unit: "個",
      reward: 390,
    },
  ];
  const dayIndex = Math.floor(parseJstDateKey(dateKey).getTime() / 86400000);
  return missions[((dayIndex % missions.length) + missions.length) % missions.length];
}

function isDailyMissionCompletedBy(source) {
  return getDailyMissionValue(source) >= dailyMission.target;
}

function getDailyMissionRemainingText(source) {
  const missing = Math.max(1, dailyMission.target - getDailyMissionValue(source));
  return `あと${missing}${dailyMission.unit}`;
}

function getDailyMissionValue(source) {
  if (!source) return 0;

  if (dailyMission.metric === "deliveries") return source.deliveries ?? 0;
  if (dailyMission.metric === "combo") return source.combo ?? source.maxCombo ?? 0;
  if (dailyMission.metric === "maxCarry") return source.maxCarry ?? 0;
  if (dailyMission.metric === "supportPickups") return source.supportPickups ?? 0;
  if (dailyMission.metric === "item") {
    const itemPickups = getRecordItemPickups(source);
    return itemPickups[dailyMission.itemKind] ?? 0;
  }

  return 0;
}

function formatNumber(value) {
  return new Intl.NumberFormat("ja-JP").format(Math.round(value));
}

function formatShortNumber(value) {
  const rounded = Math.round(value);
  if (rounded < 1000) return String(rounded);
  if (rounded < 10000) {
    return `${(rounded / 1000).toFixed(1).replace(".0", "")}k`;
  }

  return `${Math.round(rounded / 1000)}k`;
}

function formatSignedNumber(value) {
  if (value === 0) return "0";
  const sign = value > 0 ? "+" : "-";
  return `${sign}${formatNumber(Math.abs(value))}`;
}

function resumeAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playCue(kind) {
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  const context = resumeAudio();
  if (!context || context.state === "closed") return;

  const patterns = {
    start: [
      [520, 0, 0.055],
      [760, 0.06, 0.07],
    ],
    pickup: [[660, 0, 0.05]],
    delivery: [
      [640, 0, 0.055],
      [920, 0.055, 0.075],
    ],
    item: [
      [780, 0, 0.045],
      [1040, 0.045, 0.055],
    ],
    half: [
      [520, 0, 0.06],
      [690, 0.065, 0.08],
    ],
    lastSpurt: [
      [880, 0, 0.045],
      [660, 0.05, 0.055],
      [980, 0.12, 0.075],
    ],
    hit: [[190, 0, 0.09]],
    finish: [
      [580, 0, 0.08],
      [760, 0.075, 0.09],
      [980, 0.16, 0.11],
    ],
    resultRank: [
      [620, 0, 0.055],
      [820, 0.06, 0.065],
      [1040, 0.13, 0.08],
    ],
    resultBest: [
      [660, 0, 0.055],
      [880, 0.06, 0.065],
      [1120, 0.13, 0.08],
      [1360, 0.22, 0.1],
    ],
  };

  (patterns[kind] ?? []).forEach(([frequency, delay, duration]) => {
    playTone(context, frequency, delay, duration);
  });
}

function playTone(context, frequency, delay, duration) {
  const startAt = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(SOUND_VOLUME, startAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.02);
}

function vibrate(pattern) {
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  navigator.vibrate?.(pattern);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return replacements[character];
  });
}
