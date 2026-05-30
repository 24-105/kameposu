const GAME_SECONDS = 60;
const COUNTDOWN_STEP_MS = 800;
const START_COUNTDOWN_MS = COUNTDOWN_STEP_MS * 4;
const RETRY_COUNTDOWN_MS = START_COUNTDOWN_MS;
const FINISH_ANNOUNCE_MS = 2200;
const WARP_SECONDS = 0.55;
const LAST_SPURT_SECONDS = 5;
const COLS = 38;
const ROWS = 28;
const TILE = 40;
const WORLD_WIDTH = COLS * TILE;
const WORLD_HEIGHT = ROWS * TILE;
const PLAYER_RADIUS = 10;
const SCORE_KEY = "delivery-panic-session-scores-v1";
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
const TAILWIND_SECONDS = 1.6;
const SHORTCUT_SCORE = 30;
const SHORTCUT_COOLDOWN_SECONDS = 4.2;
const SURPRISE_STAND_SCORE = 35;
const MAX_FLOAT_TEXTS = 7;
const MANUAL_CLOCK_SECONDS = 4.0;
const MANUAL_ITEM_STARTING_STOCK = {
  clock: 1,
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
const timePhase = document.querySelector("#timePhase");
const timeGaugeFill = document.querySelector("#timeGauge i");
const scoreValue = document.querySelector("#scoreValue");
const scoreCard = scoreValue.closest("div");
const scoreGoal = document.querySelector("#scoreGoal");
const scoreDelta = document.querySelector("#scoreDelta");
const deliveryValue = document.querySelector("#deliveryValue");
const comboValue = document.querySelector("#comboValue");
const comboCard = comboValue.closest("div");
const comboMeter = document.querySelector("#comboMeter");
const countdownOverlay = document.querySelector("#countdownOverlay");
const pauseOverlay = document.querySelector("#pauseOverlay");
const resumeButton = document.querySelector("#resumeButton");
const pauseRetryButton = document.querySelector("#pauseRetryButton");
const pauseRankingButton = document.querySelector("#pauseRankingButton");
const pauseRecommendButton = document.querySelector("#pauseRecommendButton");
const homeRankingButton = document.querySelector("#homeRankingButton");
const recommendButton = document.querySelector("#recommendButton");
const startGuide = document.querySelector("#startGuide");
const itemBar = document.querySelector("#itemBar");
const menuScreen = document.querySelector("#menuScreen");
const menuTitle = document.querySelector("#menuTitle");
const menuCloseButton = document.querySelector("#menuCloseButton");
const menuRankingPanel = document.querySelector("#menuRankingPanel");
const menuRecommendPanel = document.querySelector("#menuRecommendPanel");
const gameSetScreen = document.querySelector("#gameSetScreen");
const retryButton = document.querySelector("#retryButton");
const resultGrade = document.querySelector("#resultGrade");
const resultName = document.querySelector("#resultName");
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
const resultRank = document.querySelector("#resultRank");
const resultGap = document.querySelector("#resultGap");
const resultTip = document.querySelector("#resultTip");
const resultHighlights = document.querySelector("#resultHighlights");
const resultMedals = document.querySelector("#resultMedals");
const resultBestBadge = document.querySelector("#resultBestBadge");
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

const adjectives = [
  "夜風に強い",
  "薔薇色の",
  "左折だけ優雅な",
  "自称伝説の",
  "白手袋の",
  "信号待ちの貴公子",
  "月明かりの",
  "路地裏のカリスマ",
  "坂道育ちの",
  "香水つよめの",
  "雨上がりの",
  "片手で決める",
  "沈黙の",
  "やたら姿勢の良い",
  "夕焼けを背負う",
  "名刺だけ豪華な",
  "秒速で照れる",
  "小声の革命家",
  "まばたき多めの",
  "港区っぽい",
  "前髪が決まった",
  "低音ボイスの",
  "レシートを愛す",
  "遠回りの美学",
  "秒針に追われる",
  "珈琲片手の",
  "見ずに確認する",
  "横断歩道の主役",
  "気配だけ速い",
  "伝票に微笑む",
  "地図より自信の",
  "角を曲がる詩人",
  "朝焼けの紳士",
  "夜景に詳しい",
  "無駄にまぶしい",
  "余韻が長い",
  "一礼して走る",
  "口ぐせが任せろの",
  "少し遅れた救世主",
  "箱を抱く哲学者",
  "ベルを鳴らさぬ",
  "風向きを読む",
  "余裕のふりをした",
  "影まで整った",
  "小粋な",
  "胸ポケットの",
  "秘密めいた",
  "やけに丁寧な",
];

const middleNames = [
  "系の",
  "風の",
  "めの",
  "派の",
  "味の",
  "型の",
  "枠の",
  "係の",
  "役の",
  "組の",
  "班の",
  "流の",
  "寄りの",
  "っぽい",
  "気味の",
  "仕立ての",
  "担当の",
  "専用の",
  "向けの",
  "生まれの",
  "育ちの",
  "印の",
  "色の",
  "顔の",
  "声の",
  "足の",
  "目の",
  "手の",
  "朝の",
  "昼の",
  "夜の",
  "路地の",
  "駅前の",
  "角の",
  "坂の",
  "風味の",
  "気分の",
  "ノリの",
  "ままの",
  "だけの",
  "までの",
  "からの",
  "よりの",
  "ほどの",
  "ぶりの",
  "中の",
  "前の",
  "後の",
];

const nouns = [
  "段ボール侯爵",
  "伝票の王子",
  "路地裏紳士",
  "再配達名人",
  "置き配鑑定士",
  "信号待ち伯爵",
  "ターボ番長",
  "角刈り菓子職人",
  "スコア紳士",
  "横断歩道の主役",
  "雨合羽大臣",
  "レシート男爵",
  "呼び鈴いらずの貴族",
  "坂道浪漫派",
  "荷台の詩人",
  "時間延長殿下",
  "港町伊達男",
  "小包奇術師",
  "伝説の新人",
  "郵便受け博士",
  "近道探究家",
  "遠回り一家言",
  "踏切見張り番",
  "台車の帝王",
  "商店街の看板役",
  "封筒師範",
  "運転席伯爵",
  "運動靴公爵",
  "珈琲牛乳侍",
  "請求書若旦那",
  "安全確認の達人",
  "右折浪漫",
  "左折殿下",
  "番地の達人",
  "玄関前舞踊家",
  "紙袋紳士",
  "領収書王",
  "時短の貴公子",
  "地図読まない派",
  "帽子の支配人",
  "朝礼横綱",
  "夕焼け走者",
  "路面の名探偵",
  "荷物界の新星",
  "ボタン押し名人",
  "呼び鈴職人",
  "直感走者",
  "微笑みの配達王",
];

const shortNameAdjectives = [
  "ぽすぽす",
  "ふわっと",
  "てくてく",
  "すいすい",
  "きらり",
  "にこにこ",
  "ぽやぽや",
  "ゆるめ",
  "こっそり",
  "まよい",
  "ちらり",
  "のんびり",
  "あわて",
  "すました",
  "ななめ",
  "ひらり",
  "むにゅ",
  "ぴかぴか",
  "ちょい",
  "ほろよい",
  "ニヤリ",
  "キラリ",
  "スイスイ",
  "ポケット",
  "カメ",
  "バッグ",
  "ベル",
  "ポスト",
  "ターボ",
  "ミニ",
  "路地裏",
  "夕焼け",
  "雨上がり",
  "角待ち",
  "前髪",
  "夜風",
];

const shortNameLinks = [
  "の",
  "な",
  "系",
  "風",
  "派",
  "味",
  "顔",
  "組",
  "流",
  "班",
  "色",
  "係",
];

const shortNameNouns = [
  "カメ便",
  "ポスト係",
  "ベル係",
  "バッグ番",
  "箱もち",
  "地図もち",
  "道草王",
  "お届け屋",
  "小包さん",
  "配達っこ",
  "荷物くん",
  "玄関番",
  "右まがり",
  "左まがり",
  "角のひと",
  "坂道さん",
  "紙袋さん",
  "番地メモ",
  "時計もち",
  "ワープ係",
  "ターボ屋",
  "シールダー",
  "マグネット屋",
  "ゆる王",
  "あせり屋",
  "すまし屋",
  "まよい便",
  "近道っこ",
  "遠回り屋",
  "呼び鈴屋",
  "台車くん",
  "封筒さん",
  "レシート係",
  "領収書屋",
  "荷台もち",
  "看板さん",
  "安全番",
  "夕焼け便",
  "雨合羽さん",
  "路地の王",
];

const todayKey = getJstDateKey(new Date());
const map = createDailyMap(todayKey);
const baseNpcScores = buildNpcScoresForDate(todayKey, 12);
const weekDates = getCurrentWeekDateKeys(todayKey);

let animationFrame = 0;
let lastFrameTime = performance.now();
let countdownUntil = 0;
let countdownDurationMs = START_COUNTDOWN_MS;
let latestResultCreatedAt = "";
let activeRun;
let currentJob;
let roadEvents;
let supportItems;
let hazards;

applyPreparedRun(createPreparedRun("idle"));

dateLabel.textContent = getDailyCityName(todayKey);
updateManualItems();
updateHud();
renderRankings();
drawScene();
renderGuideIcons();

if ("ResizeObserver" in window) {
  const resizeObserver = new ResizeObserver(() => {
    drawScene();
  });
  resizeObserver.observe(canvas);
} else {
  window.addEventListener("resize", drawScene);
}

startButton.addEventListener("click", handlePrimaryButton);
retryButton.addEventListener("click", startCountdown);
resumeButton.addEventListener("click", resumeRun);
pauseRetryButton.addEventListener("click", restartFromPause);
pauseRankingButton.addEventListener("click", () => openMenuScreen("ranking"));
pauseRecommendButton.addEventListener("click", () => openMenuScreen("recommend"));
homeRankingButton.addEventListener("click", () => openMenuScreen("ranking"));
recommendButton.addEventListener("click", () => openMenuScreen("recommend"));
menuCloseButton.addEventListener("click", closeMenuScreen);
resultTabButtons.forEach((button) => {
  button.addEventListener("click", () => activateResultTab(button.dataset.resultTab));
});
resultDetailToggle.addEventListener("click", () => {
  setResultDetailExpanded(resultDetailPanel.hidden);
});
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

  const isRetryStart = activeRun.status === "ended" || document.body.classList.contains("show-results");
  if (activeRun.status !== "idle") {
    applyPreparedRun(createPreparedRun("idle"));
  }

  activeRun.status = "countdown";
  countdownDurationMs = isRetryStart ? RETRY_COUNTDOWN_MS : START_COUNTDOWN_MS;
  countdownUntil = performance.now() + countdownDurationMs;
  resetInput();
  startButton.disabled = false;
  startButton.textContent = "一時停止";
  updateManualItems();
  closeMenuScreen();
  document.body.classList.remove("show-results");
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
  menuTitle.textContent = isRecommend ? "おすすめ" : "ランキング";
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

function pauseRun() {
  if (activeRun.status !== "countdown" && activeRun.status !== "running") return;

  activeRun.pausedStatus = activeRun.status;
  activeRun.pausedCountdownRemaining = activeRun.status === "countdown" ? Math.max(0, countdownUntil - performance.now()) : 0;
  activeRun.status = "paused";
  resetInput();
  pauseOverlay.classList.remove("is-hidden");
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
  startButton.textContent = "一時停止";
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
    randomName: generateRandomPlayerName(Math.random),
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
    manualUses: 0,
    manualItems: createManualItemStock(),
    nearMisses: 0,
    maxCarry: 0,
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
    invulnerable: 0,
    flash: 0,
    shake: 0,
    shakeDuration: 0,
    shakePower: 0,
    floatTexts: [],
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

  if (activeRun.status === "idle" || activeRun.status === "ended") {
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
    startButton.textContent = "一時停止";
    updateManualItems();
    return;
  }

  const elapsed = countdownDurationMs - Math.max(0, remaining);
  const stepIndex = clamp(Math.floor(elapsed / COUNTDOWN_STEP_MS), 0, 3);
  const label = ["3", "2", "1", "開始"][stepIndex];
  countdownOverlay.textContent = label;
}

function updateRun(dt) {
  activeRun.timeLeft = Math.max(0, activeRun.timeLeft - dt);
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

  const speed = getPlayerSpeed() * dt * (isSlipping ? 1.04 : 1);
  const player = activeRun.player;
  const currentX = player.x;
  const currentY = player.y;
  const nextX = currentX + moveX * speed;
  const nextY = currentY + moveY * speed;
  activeRun.player.facing = Math.atan2(moveY, moveX);

  if (isWalkable(nextX, nextY, PLAYER_RADIUS)) {
    player.x = nextX;
    player.y = nextY;
    return;
  }

  const slideMoves = getSlideMoveCandidates(currentX, currentY, moveX, moveY, speed);
  const moved = slideMoves.some((candidate) => {
    if (!isWalkable(candidate.x, candidate.y, PLAYER_RADIUS)) return false;
    player.x = candidate.x;
    player.y = candidate.y;
    return true;
  });

  if (!moved) {
    applyRoadCenterAssist(speed);
  }
}

function getSlideMoveCandidates(x, y, moveX, moveY, speed) {
  const candidates = [];
  const hasX = Math.abs(moveX) > 0.08;
  const hasY = Math.abs(moveY) > 0.08;
  const partialX = hasX ? x + moveX * speed : x;
  const partialY = hasY ? y + moveY * speed : y;
  const gentleX = hasX ? x + moveX * speed * 0.58 : x;
  const gentleY = hasY ? y + moveY * speed * 0.58 : y;

  const xMove = { x: partialX, y };
  const yMove = { x, y: partialY };
  const gentleXMove = { x: gentleX, y };
  const gentleYMove = { x, y: gentleY };

  if (Math.abs(moveX) >= Math.abs(moveY)) {
    candidates.push(xMove, yMove, gentleXMove, gentleYMove);
  } else {
    candidates.push(yMove, xMove, gentleYMove, gentleXMove);
  }

  return candidates;
}

function applyRoadCenterAssist(speed) {
  const player = activeRun.player;
  const cell = getPlayerCell(player);
  if (!isRoadCell(cell)) return;

  const hasLeft = map.road[cell.row]?.[cell.col - 1];
  const hasRight = map.road[cell.row]?.[cell.col + 1];
  const hasUp = map.road[cell.row - 1]?.[cell.col];
  const hasDown = map.road[cell.row + 1]?.[cell.col];
  const centerX = centerOf(cell.col);
  const centerY = centerOf(cell.row);
  const nudge = speed * 0.42;

  if ((hasLeft || hasRight) && !hasUp && !hasDown) {
    const nextY = moveToward(player.y, centerY, nudge);
    if (isWalkable(player.x, nextY, PLAYER_RADIUS)) {
      player.y = nextY;
    }
    return;
  }

  if ((hasUp || hasDown) && !hasLeft && !hasRight) {
    const nextX = moveToward(player.x, centerX, nudge);
    if (isWalkable(nextX, player.y, PLAYER_RADIUS)) {
      player.x = nextX;
    }
  }
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

function getTouchVector() {
  if (!touchControl.active) return { x: 0, y: 0 };

  const dx = touchControl.currentX - touchControl.originX;
  const dy = touchControl.currentY - touchControl.originY;
  const distance = Math.hypot(dx, dy);

  if (distance < 10) return { x: 0, y: 0 };

  return {
    x: dx / distance,
    y: dy / distance,
  };
}

function getPlayerSpeed() {
  const comboBonus = Math.min(activeRun.combo, 6) * 7;
  const rushBonus = activeRun.rush > 0 ? RUSH_SPEED_BONUS : 0;
  const flightBonus = activeRun.flight > 0 ? 32 : 0;
  const lastSpurtBonus = isLastSpurtActive() ? LAST_SPURT_SPEED_BONUS : 0;
  const slowPenalty = activeRun.slow > 0 ? 78 : 0;
  const stunPenalty = activeRun.stunned > 0 ? 999 : 0;
  return Math.max(0, activeRun.player.speed + comboBonus + rushBonus + flightBonus + lastSpurtBonus - slowPenalty - stunPenalty);
}

function isLastSpurtActive() {
  return activeRun.status === "running" && activeRun.timeLeft > 0 && activeRun.timeLeft <= LAST_SPURT_SECONDS;
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
    slow: 0,
    shortcut: 0,
    stand: 0,
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
      label: "自己最高",
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
    addFloatText(destination.x, destination.y - 28, `${cargoCount}個 +${gained}`, "#ffffff");
    createBurst(destination.x, destination.y, "#e85d56", 12);
    triggerShake(1.6, 0.16);
    vibrate(28);

    if (fastBonus > 0) {
      addFloatText(player.x, player.y - 48, `早届け +${fastBonus}`, "#12d8df");
    }

    if (multiBonus > 0) {
      addFloatText(player.x, player.y - 66, `まとめ +${multiBonus}`, "#f0bf39");
    }

    if (Math.floor(comboBefore / 3) < Math.floor(activeRun.combo / 3)) {
      activeRun.rush = RUSH_SECONDS;
      addFloatText(player.x, player.y - 62, "ターボ", "#12d8df");
      createBurst(player.x, player.y, "#12d8df", 16);
      triggerShake(2.1, 0.18);
      vibrate([18, 20, 18]);
    }

    currentJob = createTimedJob(activeRun.rng, currentJob.destination);
    activeRun.bonus = createBonus(activeRun.rng, currentJob, activeRun.player);
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
  addFloatText(pickup.x, pickup.y - 24, `${getCarriedCount()}個目 +${25 + optionBonus}`, "#f0bf39");
  createBurst(pickup.x, pickup.y, "#f0bf39", 8);
  vibrate(12);
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
  if (kind === "clock") return "時計";
  if (kind === "shield") return "シールド";
  if (kind === "magnet") return "マグネット";
  if (kind === "turbo") return "ターボ";
  if (kind === "flight") return "飛行";
  return "アイテム";
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
    addFloatText(x, y - 48, `時間+${MANUAL_CLOCK_SECONDS.toFixed(1)}秒`, "#12d8df");
    createBurst(x, y, "#12d8df", 12);
  } else if (kind === "shield") {
    activeRun.shield = Math.max(activeRun.shield, SHIELD_SECONDS);
    addFloatText(x, y - 48, "シールド開始", "#8e6df0");
    createBurst(x, y, "#8e6df0", 14);
  } else if (kind === "magnet") {
    activeRun.magnet = Math.max(activeRun.magnet, MAGNET_SECONDS);
    addFloatText(x, y - 48, "マグネット開始", "#f0bf39");
    createBurst(x, y, "#f0bf39", 12);
  } else if (kind === "turbo") {
    activeRun.rush = Math.max(activeRun.rush, TURBO_ITEM_SECONDS);
    addFloatText(x, y - 48, "ターボ開始", "#12d8df");
    createBurst(x, y, "#12d8df", 12);
  } else if (kind === "flight") {
    activeRun.flight = Math.max(activeRun.flight, FLIGHT_SECONDS);
    activeRun.stunned = 0;
    addFloatText(x, y - 48, "飛行開始", "#4f9cff");
    createBurst(x, y, "#4f9cff", 16);
  }

  activeRun.flash = Math.max(activeRun.flash, 0.12);
  triggerShake(1.3, 0.14);
  vibrate([12, 18]);
  updateManualItems();
}

function updateManualItems() {
  document.querySelectorAll("[data-manual-item]").forEach((button) => {
    const kind = button.dataset.manualItem;
    const count = activeRun.manualItems?.[kind] ?? 0;
    const activeSeconds = getManualItemActiveSeconds(kind);
    const countLabel = button.querySelector("[data-item-count]");
    if (countLabel) countLabel.textContent = count;
    button.disabled = activeRun.status !== "running" || count <= 0 || activeSeconds > 0;
    button.classList.toggle("is-active", activeSeconds > 0);
  });
  itemBar.classList.toggle("is-running", activeRun.status === "running");
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
  addFloatText(point.x, point.y - 28, `+${BONUS_SCORE} / 時間+${BONUS_SECONDS.toFixed(1)}秒`, "#12d8df");
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
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, "時計 +1", "#12d8df");
  } else if (item.kind === "shield") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, "シールド +1", "#8e6df0");
  } else if (item.kind === "magnet") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, "マグネット +1", "#f0bf39");
  } else if (item.kind === "turbo") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, "ターボ +1", "#12d8df");
  } else if (item.kind === "flight") {
    grantManualItem(item.kind);
    awardScore(SUPPORT_ITEM_SCORE, "bonus");
    addFloatText(point.x, point.y - 28, "飛行 +1", "#4f9cff");
  } else {
    awardScore(120, "bonus");
    addFloatText(point.x, point.y - 28, "星 +120", "#f0bf39");
  }

  activeRun.flash = Math.max(activeRun.flash, 0.12);
  createBurst(point.x, point.y, getSupportItemColor(item.kind), 12);
  triggerShake(1.1, 0.12);
  vibrate([10, 18]);
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

    const isGroundTrap = ["puddle", "crowd", "oil", "rail", "signal", "roadwork", "electric"].includes(event.kind);
    if (activeRun.flight > 0 && isGroundTrap) return;

    if (event.kind === "puddle" || event.kind === "crowd") {
      triggerSlowZone(event);
      return;
    }

    if (event.kind === "tailwind") {
      triggerTailwind(event);
      return;
    }

    if (event.kind === "shortcut") {
      triggerShortcut(event);
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
  grantManualItem(kind);
  awardScore(SURPRISE_STAND_SCORE, "event");
  addFloatText(point.x, point.y - 32, `${getManualItemName(kind)} +1`, getSupportItemColor(kind));
  addFloatText(point.x, point.y - 50, `屋台 +${SURPRISE_STAND_SCORE}`, "#f0bf39", 0.75, -28);
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
}

function consumeShield(x, y) {
  if (activeRun.shield <= 0) return false;

  activeRun.shield = 0;
  activeRun.flash = Math.max(activeRun.flash, 0.16);
  addFloatText(x, y - 34, "シールドで回避", "#8e6df0");
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
  startButton.textContent = "開始";
  pauseOverlay.classList.add("is-hidden");
  startGuide.classList.add("is-hidden");
  countdownOverlay.textContent = "配達完了";
  countdownOverlay.classList.remove("is-hidden");
  countdownOverlay.classList.add("is-finish");
  updateManualItems();
  document.body.classList.remove("is-rush");
  document.body.classList.remove("is-last-spurt");
  timeCard.classList.remove("is-danger");
  vibrate([34, 28, 34]);

  window.setTimeout(() => completeFinishedRun(record, previousSessionBest), FINISH_ANNOUNCE_MS);
}

function completeFinishedRun(record, previousSessionBest) {
  if (activeRun.status !== "finishing") return;

  activeRun.status = "ended";
  startButton.disabled = false;
  startButton.textContent = "もう一度";
  countdownOverlay.classList.add("is-hidden");
  countdownOverlay.classList.remove("is-finish");
  updateManualItems();
  saveSessionScore(record);
  latestResultCreatedAt = record.createdAt;
  renderResult(record, previousSessionBest);
  renderRankings();
  vibrate([50, 40, 50]);
}

function renderResult(record, previousSessionBest) {
  const grade = getResultGrade(record);
  resultGrade.innerHTML = `<span>ランク</span><b>${grade.label}</b>`;
  resultGrade.setAttribute("aria-label", `ランク ${grade.label}`);
  resultGrade.className = `result-grade grade-${grade.key}`;
  resultName.textContent = record.randomName;
  resultScoreHero.textContent = formatNumber(record.score);
  resultDeliveries.textContent = record.deliveries;
  resultCombo.textContent = record.combo;
  renderResultItemCounts(record);
  if (resultMaxCarry) resultMaxCarry.textContent = `${record.maxCarry ?? 0}個`;
  resultCollisions.textContent = record.collisions;
  resultNearMisses.textContent = record.nearMisses ?? 0;
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
  renderResultNextMoves(record, rankInfo, previousSessionBest);
  renderResultHighlights(record);
  renderResultMedals(record);
  renderResultBreakdown(record);
  setResultDetailExpanded(false);
  activateResultTab("summary");
  document.body.classList.add("show-results");
  window.scrollTo(0, 0);
  gameSetScreen.classList.remove("is-hidden");
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

function setResultDetailExpanded(isExpanded) {
  resultDetailPanel.hidden = !isExpanded;
  resultDetailToggle.setAttribute("aria-expanded", String(isExpanded));
  resultDetailToggle.textContent = isExpanded ? "詳細を閉じる" : "詳細を開く";
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
  const index = records.findIndex((item) => item.createdAt === record.createdAt);
  const fallbackIndex = records.findIndex((item) => item.score <= record.score);
  const rank = index >= 0 ? index + 1 : fallbackIndex >= 0 ? fallbackIndex + 1 : records.length + 1;

  if (rank <= 1) {
    return {
      rank,
      gap: 0,
      rankLabel: "1位",
      gapLabel: "今のところ1位",
    };
  }

  const previous = records[rank - 2];
  const gap = Math.max(1, previous.score - record.score + 1);
  return {
    rank,
    gap,
    rankLabel: `${rank}位`,
    gapLabel: `あと${formatNumber(gap)}で${rank - 1}位`,
  };
}

function getBestStatus(score, previousBest) {
  if (previousBest <= 0 && score <= 0) {
    return {
      label: "自己最高まで",
      value: "1配達",
      isNewBest: false,
    };
  }

  if (score > previousBest) {
    return {
      label: "更新",
      value: `+${formatNumber(score - previousBest)}`,
      isNewBest: true,
    };
  }

  if (score === previousBest) {
    return {
      label: "同じスコア",
      value: "あと1",
      isNewBest: false,
    };
  }

  return {
    label: "自己最高まで",
    value: `あと${formatNumber(previousBest - score + 1)}`,
    isNewBest: false,
  };
}

function renderResultMedals(record) {
  const medals = [];

  if (record.collisions === 0 && record.deliveries > 0) {
    medals.push({
      label: "無接触",
      value: "ぶつからずに完走",
      tone: "gold",
    });
  }

  resultMedals.innerHTML = medals
    .map(
      (medal) => `
        <span class="is-${medal.tone}">
          <b>勲章</b>
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
      label: "配達スコア",
      value: breakdown.pickup + breakdown.delivery + breakdown.distance,
    },
    {
      label: "早届けとまとめ配達",
      value: breakdown.fast + breakdown.combo + breakdown.multi,
    },
    {
      label: "ボーナススコア",
      value: breakdown.bonus + breakdown.event + breakdown.near,
    },
    {
      label: "減点スコア",
      value: breakdown.penalty,
    },
  ].filter((item) => item.value !== 0);

  if (items.length === 0) {
    return [{ label: "次回", value: 0 }];
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
    moves.push({ label: "最初", value: "まずバッグを拾う" });
    moves.push({ label: "操作", value: "道の真ん中を走る" });
    return moves;
  }

  if (record.collisions > 0) moves.push({ label: "安全運転", value: "危ない道の前にシールド" });
  if ((record.maxCarry ?? 0) < 2) moves.push({ label: "まとめ配達", value: "2個以上持って届ける" });
  if ((record.supportPickups ?? 0) < 2) moves.push({ label: "アイテム", value: "道沿いで拾う" });
  if ((record.bonuses ?? 0) === 0) moves.push({ label: "時計", value: "1つ確保する" });
  if (record.combo < 3) moves.push({ label: "連続成功", value: `あと${Math.max(1, 3 - record.combo)}回でターボ` });
  if ((record.nearMisses ?? 0) === 0 && record.deliveries >= 5) moves.push({ label: "すれすれ", value: "警告リングの外をかすめる" });
  if (record.deliveries < 8) moves.push({ label: "配達数", value: `あと${8 - record.deliveries}件` });
  if (rankInfo.gap > 0 && rankInfo.rank <= 10) moves.push({ label: "順位", value: `あと${formatNumber(rankInfo.gap)}で上へ` });
  if (record.score <= previousSessionBest && previousSessionBest > 0) {
    moves.push({ label: "自己最高", value: `あと${formatNumber(previousSessionBest - record.score + 1)}` });
  }

  moves.push({ label: "街", value: "もう一度走る" });
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
  const combo = record.combo > 0 ? `${record.combo}連続` : "なし";
  const safety =
    record.collisions === 0 && record.deliveries > 0
      ? "無接触"
      : record.collisions <= 1
        ? "安定"
        : `${record.collisions}回接触`;

  return [
    { label: "配達", value: delivery },
    { label: "連続", value: combo },
    { label: "接触", value: safety },
  ];
}

function getResultTip(record) {
  const itemPickups = getRecordItemPickups(record);
  if (record.deliveries === 0) return "バッグの荷物を拾うと、赤い線が家まで出ます。まずは1件。";
  if (record.collisions >= 3) return "危ない道に入る前にシールド。車や工事との接触を1回防げます。";
  if ((record.maxCarry ?? 0) < 2) return "荷物は3個まで持てます。近い荷物を拾ってから家へ向かうと伸びます。";
  if ((record.supportPickups ?? 0) < 2) return "マグネット中は少し離れた荷物やアイテムも拾えます。屋台も見つけたら寄り道。";
  if ((itemPickups.clock ?? 0) === 0) return "時計は好きなタイミングで使えます。残り時間が少なくなる前に押すと安心です。";
  if (record.combo < 3) return "3件続けて届けると少しターボ。水たまりや赤信号で連続を切らさないように。";
  if (record.collisions >= 2) return "飛行は建物や電気トラップを越えられます。詰まったら迷わず飛ぶ。";
  if (record.deliveries < 8) return "追い風とワープで移動を短縮。ターボと重なると一気に伸びます。";
  if ((record.nearMisses ?? 0) === 0) return "警告リングの外側をかすめると加点。シールド中なら狙いやすいです。";
  return "時計、マグネット、ターボをつないで、ぶつからずに配達数を伸ばそう。";
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
  timeValue.textContent = activeRun.timeLeft.toFixed(1);
  const timeProgress = clamp(activeRun.timeLeft / GAME_SECONDS, 0, 1);
  timeGaugeFill.style.transform = `scaleX(${timeProgress})`;
  timePhase.textContent = isLastSpurt ? "ラスト" : "";
  scoreValue.textContent = formatNumber(activeRun.score);
  scoreCard.classList.toggle("is-score-pop", activeRun.scorePulse > 0);
  scoreGoal.textContent = getScoreGoalLabel();
  scoreCard.classList.toggle("is-best-ahead", activeRun.status === "running" && activeRun.bestTarget > 0 && activeRun.score > activeRun.bestTarget);
  scoreDelta.textContent = getScoreDeltaLabel();
  scoreDelta.classList.toggle("is-negative", activeRun.scoreDelta < 0);
  deliveryValue.textContent = activeRun.deliveries;
  comboValue.textContent = activeRun.combo;
  updateComboMeter();
  updateManualItems();
  timeCard.classList.toggle("is-danger", activeRun.status === "running" && activeRun.timeLeft <= 6);
  timeCard.classList.toggle("is-warning", activeRun.status === "running" && activeRun.timeLeft <= 12);
  timeCard.classList.toggle("is-last-spurt", isLastSpurt);
  document.body.classList.toggle("is-rush", activeRun.status === "running" && activeRun.rush > 0);
  document.body.classList.toggle("is-last-spurt", isLastSpurt);
}

function getScoreGoalLabel() {
  if (activeRun.bestTarget <= 0) {
    return "";
  }

  if (activeRun.status !== "running") {
    return `最高${formatShortNumber(activeRun.bestTarget)}`;
  }

  const remaining = activeRun.bestTarget - activeRun.score + 1;
  return remaining <= 0 ? "最高更新" : `あと${formatShortNumber(remaining)}`;
}

function updateTargetDistance() {
  return;
}

function updateComboMeter() {
  const progress = activeRun.combo % 3 || (activeRun.combo > 0 ? 3 : 0);
  const isNearRush = activeRun.status === "running" && activeRun.rush <= 0 && activeRun.combo % 3 === 2;
  const isRushing = activeRun.status === "running" && activeRun.rush > 0;
  comboMeter.querySelectorAll("i").forEach((item, index) => {
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
  drawMap();
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
  ctx.restore();

  if (activeRun.flash > 0) {
    ctx.fillStyle = "rgb(255 255 255 / 20%)";
    ctx.fillRect(0, 0, viewport.width, viewport.height);
  }

  drawLastSpurtVignette();
  drawEdgeHint(camera);
  drawBonusEdgeHint(camera);
  drawStatusText();
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
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width || canvas.clientWidth || canvas.width));
  const height = Math.max(1, Math.round(rect.height || canvas.clientHeight || canvas.height));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const backingWidth = Math.round(width * dpr);
  const backingHeight = Math.round(height * dpr);

  viewport.width = width;
  viewport.height = height;
  viewport.dpr = dpr;

  if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
    canvas.width = backingWidth;
    canvas.height = backingHeight;
  }
}

function getCamera() {
  const scale = 1.28;
  const visibleWidth = viewport.width / scale;
  const visibleHeight = viewport.height / scale;
  const player = activeRun.player;
  const x = clamp(player.x - visibleWidth * 0.5, 0, WORLD_WIDTH - visibleWidth);
  const y = clamp(player.y - visibleHeight * 0.54, 0, WORLD_HEIGHT - visibleHeight);

  return {
    x,
    y,
    scale,
    visibleWidth,
    visibleHeight,
  };
}

function drawMap() {
  ctx.fillStyle = "#78b982";
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const x = col * TILE;
      const y = row * TILE;

      if (map.road[row][col]) {
        drawRoadTile(col, row, x, y);
        drawRoadMarking(col, row, x, y);
      } else {
        drawBuilding(col, row, x, y);
      }
    }
  }

  ctx.strokeStyle = "rgb(22 33 47 / 14%)";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
}

function drawRoadTile(col, row, x, y) {
  const hasLeft = map.road[row]?.[col - 1];
  const hasRight = map.road[row]?.[col + 1];
  const hasUp = map.road[row - 1]?.[col];
  const hasDown = map.road[row + 1]?.[col];
  const texture = Math.abs(hashString(`road:${map.seed}:${col}:${row}`)) % 4;

  ctx.fillStyle = "#58636c";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = texture % 2 === 0 ? "rgb(255 255 255 / 3%)" : "rgb(0 0 0 / 3%)";
  ctx.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);

  ctx.fillStyle = "#d8d1bd";
  if (!hasLeft) ctx.fillRect(x, y, 4, TILE);
  if (!hasRight) ctx.fillRect(x + TILE - 4, y, 4, TILE);
  if (!hasUp) ctx.fillRect(x, y, TILE, 4);
  if (!hasDown) ctx.fillRect(x, y + TILE - 4, TILE, 4);
}

function drawRoadMarking(col, row, x, y) {
  const hasLeft = map.road[row]?.[col - 1];
  const hasRight = map.road[row]?.[col + 1];
  const hasUp = map.road[row - 1]?.[col];
  const hasDown = map.road[row + 1]?.[col];

  ctx.strokeStyle = "#f2d96a";
  ctx.lineWidth = 2.8;
  ctx.setLineDash([10, 13]);

  if (hasLeft || hasRight) {
    ctx.beginPath();
    ctx.moveTo(x + 4, y + TILE / 2);
    ctx.lineTo(x + TILE - 4, y + TILE / 2);
    ctx.stroke();
  }

  if (hasUp || hasDown) {
    ctx.beginPath();
    ctx.moveTo(x + TILE / 2, y + 4);
    ctx.lineTo(x + TILE / 2, y + TILE - 4);
    ctx.stroke();
  }

  ctx.setLineDash([]);
}

function drawBuilding(col, row, x, y) {
  const palette = ["#e7c765", "#d9826d", "#82b7cc", "#a9c879", "#b9a7d9"];
  const pick = Math.abs(hashString(`${map.seed}:${col}:${row}`)) % palette.length;
  const inset = 8 + (Math.abs(hashString(`inset:${col}:${row}`)) % 3);
  const roofX = x + inset;
  const roofY = y + inset;
  const roofWidth = TILE - inset * 2;
  const roofHeight = TILE - inset * 2;

  ctx.fillStyle = "#73b87c";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgb(255 255 255 / 14%)";
  roundedRect(x + 4, y + 4, TILE - 8, TILE - 8, 7);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 14%)";
  roundedRect(roofX + 2, roofY + 3, roofWidth, roofHeight, 6);
  ctx.fill();

  ctx.fillStyle = palette[pick];
  roundedRect(roofX, roofY, roofWidth, roofHeight, 6);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 34%)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = "rgb(20 32 50 / 12%)";
  roundedRect(roofX + 6, roofY + 7, 8, 6, 2);
  ctx.fill();
  ctx.fillStyle = "rgb(255 255 255 / 16%)";
  ctx.fillRect(roofX + 3, roofY + 3, Math.max(8, roofWidth - 6), 3);
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
  const pulse = isPreferred && activeRun.status === "running" ? 2 + Math.sin(performance.now() / 150) * 2 : 0;

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgb(240 191 57 / ${isPreferred ? 0.22 : 0.13})`;
  ctx.beginPath();
  ctx.arc(0, 0, 23 + pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 24%)";
  ctx.beginPath();
  ctx.ellipse(0, 14, 17, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  drawPackageCanvasIcon(x, y, 1, isPreferred ? "#d9962e" : "#d2a157");

  ctx.save();
  ctx.translate(x + 19, y - 18);
  ctx.fillStyle = isPreferred ? "#142032" : "rgb(20 32 50 / 82%)";
  roundedRect(-14, -9, 28, 18, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "1000 10px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(badgeText, 0, 0);
  ctx.restore();
}

function drawDestinationMarker(x, y) {
  const pulse = activeRun.carrying && activeRun.status === "running" ? 2 + Math.sin(performance.now() / 150) * 2 : 0;

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgb(232 93 86 / ${0.18 + (activeRun.carrying ? 0.1 : 0)})`;
  ctx.beginPath();
  ctx.arc(0, 0, 24 + pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 24%)";
  ctx.beginPath();
  ctx.ellipse(0, 16, 19, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  drawDestinationCanvasIcon(x, y, 1);
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
  ctx.font = "1000 13px system-ui, sans-serif";
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
    ctx.fillStyle = `rgb(255 255 255 / ${0.1 + pulse * 0.06})`;
    ctx.beginPath();
    ctx.arc(0, 0, 22 + pulse * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgb(255 255 255 / 90%)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.strokeStyle = "rgb(20 32 50 / 22%)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    drawSupportItemCanvasIcon(item.kind, 0, 0, 0.72);
    ctx.restore();
  });
}

function getSupportItemColor(kind) {
  if (kind === "clock") return "#12d8df";
  if (kind === "shield") return "#6658d3";
  if (kind === "magnet") return "#f0bf39";
  if (kind === "turbo") return "#22d27f";
  if (kind === "flight") return "#4f9cff";
  return "#f7d55c";
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
  drawingContext.strokeStyle = "#7c4a00";
  drawingContext.lineWidth = 3;
  drawingContext.lineCap = "round";
  drawingContext.beginPath();
  drawingContext.arc(0, -7, 9, Math.PI, 0, false);
  drawingContext.stroke();
  drawingContext.fillStyle = "rgb(20 32 50 / 18%)";
  drawingContext.beginPath();
  drawingContext.ellipse(0, 14, 16, 5, 0, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.fillStyle = fill;
  roundedRect(-16, -5, 32, 25, 7, drawingContext);
  drawingContext.fill();
  drawingContext.fillStyle = "#f4ce78";
  roundedRect(-12, -2, 24, 8, 4, drawingContext);
  drawingContext.fill();
  drawingContext.strokeStyle = "#7c4a00";
  drawingContext.lineWidth = 2;
  drawingContext.stroke();
  drawingContext.fillStyle = "rgb(255 255 255 / 30%)";
  roundedRect(-11, 1, 22, 4, 2, drawingContext);
  drawingContext.fill();
  drawingContext.restore();
}

function drawDestinationCanvasIcon(x, y, scale = 1, drawingContext = ctx) {
  drawingContext.save();
  drawingContext.translate(x, y);
  drawingContext.scale(scale, scale);
  drawingContext.fillStyle = "rgb(20 32 50 / 18%)";
  drawingContext.beginPath();
  drawingContext.ellipse(0, 17, 18, 5, 0, 0, Math.PI * 2);
  drawingContext.fill();
  drawingContext.fillStyle = "#fff8ef";
  roundedRect(-15, -4, 30, 23, 5, drawingContext);
  drawingContext.fill();
  drawingContext.strokeStyle = "#ffffff";
  drawingContext.lineWidth = 2.5;
  drawingContext.stroke();
  drawingContext.fillStyle = "#e85d56";
  drawingContext.beginPath();
  drawingContext.moveTo(-18, -4);
  drawingContext.lineTo(0, -20);
  drawingContext.lineTo(18, -4);
  drawingContext.closePath();
  drawingContext.fill();
  drawingContext.strokeStyle = "rgb(20 32 50 / 22%)";
  drawingContext.lineWidth = 1.5;
  drawingContext.stroke();
  drawingContext.fillStyle = "#157f87";
  roundedRect(-4, 6, 8, 13, 2, drawingContext);
  drawingContext.fill();
  drawingContext.fillStyle = "#f0bf39";
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

  ctx.fillStyle = "#e85d56";
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
  ctx.font = "900 16px system-ui, sans-serif";
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

    if (event.kind === "roadwork") {
      drawRoadworkEvent(event);
      return;
    }

    if (event.kind === "tailwind") {
      drawTailwindEvent(event);
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
  ctx.fillStyle = `rgb(232 93 86 / ${closed ? 0.11 + pulse * 0.08 : 0.04})`;
  ctx.beginPath();
  ctx.arc(0, 0, 28 + pulse * 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 22%)";
  ctx.beginPath();
  ctx.ellipse(0, 13, 27, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#26364a";
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
  ctx.fillStyle = "#e85d56";
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
  ctx.fillStyle = `rgb(232 93 86 / ${red ? 0.13 + pulse * 0.08 : 0.04})`;
  ctx.beginPath();
  ctx.arc(0, 0, 25 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 26%)";
  ctx.beginPath();
  ctx.ellipse(0, 15, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#26364a";
  roundedRect(-9, -18, 18, 28, 5);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 62%)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = red ? "#e85d56" : "rgb(255 255 255 / 26%)";
  ctx.beginPath();
  ctx.arc(0, -9, 5.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = red ? "rgb(255 255 255 / 26%)" : "#22d27f";
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
  ctx.fillStyle = `rgb(232 93 86 / ${0.08 + pulse * 0.04})`;
  ctx.beginPath();
  ctx.arc(0, 0, 23 + pulse * 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 24%)";
  ctx.beginPath();
  ctx.ellipse(0, 14, 20, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e85d56";
  roundedRect(-18, -7, 36, 13, 4);
  ctx.fill();
  ctx.fillStyle = "#ffd36a";
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
    ctx.fillStyle = "rgb(82 176 209 / 42%)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 24, 13, -0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgb(255 255 255 / 54%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(-5, 1, 9, 4, -0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }

  drawCrowdPerson(-11, 3, "#6d5bd4");
  drawCrowdPerson(1, -2, "#157f87");
  drawCrowdPerson(12, 5, "#f0b42c");
  ctx.restore();
}

function drawCrowdPerson(x, y, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgb(20 32 50 / 18%)";
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

  ctx.fillStyle = `rgb(18 216 223 / ${0.12 + pulse * 0.08})`;
  ctx.beginPath();
  ctx.arc(0, 0, 23 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  for (let index = -1; index <= 1; index += 1) {
    const y = index * 8;
    ctx.strokeStyle = "#12d8df";
    ctx.lineWidth = 5;
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

function drawOilEvent(event) {
  const point = toCanvasPoint(event.cell);
  const shimmer = (Math.sin(performance.now() / 180 + point.x) + 1) * 0.5;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = event.cooldown > 0 ? 0.48 : 0.9;
  ctx.fillStyle = "rgb(45 42 76 / 62%)";
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
  ctx.fillStyle = `rgb(79 156 255 / ${0.12 + pulse * 0.1})`;
  ctx.beginPath();
  ctx.arc(0, 0, 25 + pulse * 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 22%)";
  ctx.beginPath();
  ctx.ellipse(0, 15, 20, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#26364a";
  roundedRect(-17, -9, 34, 20, 5);
  ctx.fill();
  ctx.strokeStyle = "rgb(255 255 255 / 72%)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = "#4f9cff";
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
  ctx.fillStyle = `rgb(240 191 57 / ${0.13 + pulse * 0.08})`;
  ctx.beginPath();
  ctx.arc(0, 0, 25 + pulse * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 20%)";
  ctx.beginPath();
  ctx.ellipse(0, 17, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  roundedRect(-18, -4, 36, 20, 5);
  ctx.fill();
  ctx.strokeStyle = "rgb(20 32 50 / 22%)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#e85d56";
  ctx.beginPath();
  roundedRect(-20, -15, 40, 13, 4);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  roundedRect(-20, -15, 40, 13, 4);
  ctx.clip();
  ctx.fillStyle = "#f0bf39";
  for (let x = -18; x < 20; x += 12) {
    ctx.fillRect(x, -16, 6, 15);
  }
  ctx.restore();

  ctx.fillStyle = "#157f87";
  roundedRect(-8, 3, 16, 9, 3);
  ctx.fill();
  drawStarCanvasIcon(0, -25, 0.38, "#f0bf39");
  ctx.restore();
}

function drawShortcutEvent(event) {
  const point = toCanvasPoint(event.cell);
  const unavailable = event.cooldown > 0;
  const pulse = (Math.sin(performance.now() / 150 + event.pairId) + 1) * 0.5;
  const color = event.pairId % 2 === 0 ? "#8e6df0" : "#12d8df";
  const glow = event.pairId % 2 === 0 ? "142 109 240" : "18 216 223";
  const spin = performance.now() / 520 + event.pairId;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.globalAlpha = unavailable ? 0.34 : 0.98;
  ctx.fillStyle = `rgb(${glow} / ${0.13 + pulse * 0.1})`;
  ctx.beginPath();
  ctx.arc(0, 0, 28 + pulse * 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgb(20 32 50 / 28%)";
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
    ctx.font = "1000 16px system-ui, sans-serif";
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
      ctx.font = "1000 10px system-ui, sans-serif";
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
  const label = isRushing ? "ターボ" : "あと1";

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
  ctx.font = "1000 13px system-ui, sans-serif";
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
  activeRun.floatTexts = activeRun.floatTexts
    .map((item) => ({
      ...item,
      y: item.y + item.vy * dt,
      ttl: item.ttl - dt,
    }))
    .filter((item) => item.ttl > 0);

  activeRun.particles = activeRun.particles
    .map((particle) => ({
      ...particle,
      x: particle.x + particle.vx * dt,
      y: particle.y + particle.vy * dt,
      ttl: particle.ttl - dt,
    }))
    .filter((particle) => particle.ttl > 0);
}

function addFloatText(x, y, text, color, ttl = 0.9, vy = -32) {
  activeRun.floatTexts.push({
    x,
    y,
    text,
    color,
    ttl,
    initialTtl: ttl,
    vy,
  });
  activeRun.floatTexts = activeRun.floatTexts.slice(-MAX_FLOAT_TEXTS);
}

function createBurst(x, y, color, count) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + activeRun.rng() * 0.7;
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
}

function drawEffects() {
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
    ctx.font = "1000 12px system-ui, sans-serif";
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
  const margin = 48;

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
  drawEdgeBadge(x, y, isDestinationTarget ? "destination" : "package", fill, `${blocks}マス`);
}

function drawBonusEdgeHint(camera) {
  if (!activeRun.bonus || activeRun.status === "idle") return;

  const point = toCanvasPoint(activeRun.bonus.cell);
  const isWarning = activeRun.bonus.ttl <= BONUS_WARNING_TTL;
  const screenX = (point.x - camera.x) * camera.scale;
  const screenY = (point.y - camera.y) * camera.scale;
  const margin = 46;

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
  drawEdgeBadge(x, y, "clock", fill, `${blocks}マス`);
}

function drawEdgeBadge(x, y, icon, fill, badgeText) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgb(20 32 50 / 28%)";
  ctx.beginPath();
  ctx.arc(0, 0, 23, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(0, 0, 17, 0, Math.PI * 2);
  ctx.fill();
  drawEdgeBadgeIcon(icon);

  ctx.font = "1000 11px system-ui, sans-serif";
  const badgeWidth = Math.max(42, Math.min(58, ctx.measureText(badgeText).width + 12));
  ctx.fillStyle = "rgb(20 32 50 / 82%)";
  roundedRect(-badgeWidth / 2, 24, badgeWidth, 17, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(badgeText, 0, 32.5);
  ctx.restore();
}

function drawEdgeBadgeIcon(icon) {
  if (icon === "destination") {
    drawDestinationCanvasIcon(0, 0, 0.56);
    return;
  }

  if (icon === "clock") {
    drawClockCanvasIcon(0, 0, 0.68, "#10313a");
    return;
  }

  drawPackageCanvasIcon(0, 1, 0.52, "#d9962e");
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
  const kinds = [
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

function createRoadEvents(dailyMap, rng, job) {
  const list = [];
  const selected = [];
  const avoidCells = [dailyMap.startCell, job.destination, ...getPickupChoices(job).map((choice) => choice.cell)];
  const candidates = dailyMap.candidates.filter((cell) => avoidCells.every((avoidCell) => cellDistance(cell, avoidCell) >= 2));
  const intersections = candidates.filter((cell) => isIntersectionCell(dailyMap, cell));

  addRoadEvents(list, selected, intersections, rng, avoidCells, "signal", 4, {
    radius: 27,
    minSpacing: 4,
    extra: () => ({
      phase: rng() * SIGNAL_CYCLE_SECONDS,
    }),
  });
  addRoadEvents(list, selected, intersections, rng, avoidCells, "rail", 2, {
    radius: 29,
    minSpacing: 5,
    extra: (cell) => ({
      angle: getRoadAxisAngle(dailyMap, cell, rng),
      phase: rng() * RAIL_CYCLE_SECONDS,
    }),
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "roadwork", 5, {
    radius: 24,
    minSpacing: 4,
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "oil", 4, {
    radius: 27,
    minSpacing: 3,
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "electric", 4, {
    radius: 28,
    minSpacing: 4,
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "puddle", 4, {
    radius: 28,
    minSpacing: 3,
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "crowd", 3, {
    radius: 28,
    minSpacing: 3,
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "tailwind", 3, {
    radius: 27,
    minSpacing: 4,
    extra: (cell) => ({
      angle: getRoadEventAngle(dailyMap, cell, rng),
    }),
  });
  addRoadEvents(list, selected, candidates, rng, avoidCells, "stand", 2, {
    radius: 28,
    minSpacing: 5,
  });
  addShortcutPairs(list, selected, candidates, rng, avoidCells, 2);

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

function createHazards(dailyMap) {
  const rng = mulberry32(hashString(`${todayKey}:hazards`));
  const colors = ["#e85d56", "#157f87", "#6d5bd4", "#f0b42c"];
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
      color: "#26364a",
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
      color: index % 2 === 0 ? "#f0b42c" : "#12d8df",
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
      color: "#22d27f",
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
  if (!isRoadCell(start) || !isRoadCell(goal)) return [];

  const startKey = cellKey(start);
  const goalKey = cellKey(goal);
  const queue = [start];
  const cameFrom = new Map([[startKey, null]]);

  for (let index = 0; index < queue.length; index += 1) {
    const cell = queue[index];
    if (cellKey(cell) === goalKey) break;

    getRoadNeighbors(cell).forEach((neighbor) => {
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

function getRoadNeighbors(cell) {
  return [
    { col: cell.col + 1, row: cell.row },
    { col: cell.col - 1, row: cell.row },
    { col: cell.col, row: cell.row + 1 },
    { col: cell.col, row: cell.row - 1 },
  ].filter(isRoadCell);
}

function isRoadCell(cell) {
  return cell.row >= 0 && cell.row < ROWS && cell.col >= 0 && cell.col < COLS && map.road[cell.row][cell.col];
}

function getCurrentTarget() {
  if (activeRun.carrying) return currentJob.destination;
  if (canPickMorePackages()) return getPreferredPickupChoice()?.cell ?? currentJob.pickup;
  return getPreferredPickupChoice()?.cell ?? currentJob.pickup;
}

function getPickupChoices(job) {
  return job.pickupOptions?.length ? job.pickupOptions : [{ cell: job.pickup, label: "荷物", bonus: 0 }];
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
      label: `荷物${index + 1}`,
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
  const cornerRadius = radius * 0.62;
  const points = [
    [x, y],
    [x - radius, y],
    [x + radius, y],
    [x, y - radius],
    [x, y + radius],
    [x - cornerRadius, y - cornerRadius],
    [x + cornerRadius, y - cornerRadius],
    [x - cornerRadius, y + cornerRadius],
    [x + cornerRadius, y + cornerRadius],
  ];

  return points.every(([pointX, pointY]) => isRoadAtPoint(pointX, pointY));
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
  return row >= 0 && row < ROWS && col >= 0 && col < COLS && map.road[row][col];
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

function renderRankings() {
  const records = getTodayScores(todayKey).slice(0, 10);
  const todayMarkup = renderTodayRankingMarkup(records);

  if (todayRanking) todayRanking.innerHTML = todayMarkup;
  if (homeTodayRanking) homeTodayRanking.innerHTML = todayMarkup;

  const todayDate = parseJstDateKey(todayKey);
  const weekMarkup = weekDates
    .map((dateKey) => renderWeekRankingRow(dateKey, todayDate))
    .join("");

  if (weekRanking) weekRanking.innerHTML = weekMarkup;
  if (homeWeekRanking) homeWeekRanking.innerHTML = weekMarkup;
}

function renderTodayRankingMarkup(records) {
  return records
    .map((record, index) => {
      const isCurrent = record.createdAt === latestResultCreatedAt;
      const podiumClass = index < 3 ? `is-podium is-podium-${index + 1}` : "";
      const crown = index < 3 ? `<b class="rank-crown" aria-hidden="true">♛</b>` : "";
      return `
        <li class="ranking-row ${podiumClass} ${isCurrent ? "is-current" : ""}">
          <span class="rank-index">${crown}<em>${index + 1}</em></span>
          <span>
            <span class="rank-name">${escapeHtml(record.randomName)}</span>
            <span class="rank-meta">${isCurrent ? "今回 / " : ""}${record.deliveries}配達 / ${record.combo}連続</span>
          </span>
          <span class="rank-score">${formatNumber(record.score)}</span>
        </li>
      `;
    })
    .join("");
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
          <span class="week-meta">まだ記録なし</span>
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
        <span class="week-meta">${top.deliveries}配達 / ${top.combo}連続</span>
      </span>
      <span class="week-score">${formatNumber(top.score)}</span>
    </div>
  `;
}

function getTodayScores(dateKey) {
  const base = dateKey === todayKey ? baseNpcScores : buildNpcScoresForDate(dateKey, 10);
  const session = loadSessionScores().filter((record) => record.dateKey === dateKey);
  return [...base, ...session].sort((a, b) => b.score - a.score);
}

function getSessionBestScore(dateKey) {
  return loadSessionScores()
    .filter((record) => record.dateKey === dateKey)
    .reduce((best, record) => Math.max(best, record.score), 0);
}

function buildNpcScoresForDate(dateKey, count) {
  const rng = mulberry32(hashString(`${dateKey}:npc-scores`));

  return Array.from({ length: count }, (_, index) => {
    const deliveries = 7 + Math.floor(rng() * 12);
    const combo = 2 + Math.floor(rng() * Math.min(8, deliveries));
    const collisions = Math.floor(rng() * 4);
    const score = 900 + deliveries * 430 + combo * 180 - collisions * 90 + Math.floor(rng() * 700);

    return {
      dateKey,
      randomName: generateRandomPlayerName(rng),
      score: Math.max(0, score - index * 55),
      deliveries,
      combo,
      collisions,
      mapSeed: hashString(dateKey),
      createdAt: `${dateKey}T12:00:00.000Z`,
    };
  });
}

function saveSessionScore(record) {
  try {
    const next = [record, ...loadSessionScores()].slice(0, 80);
    sessionStorage.setItem(SCORE_KEY, JSON.stringify(next));
  } catch {
    // 記録保存が使えないブラウザ設定でも、遊び自体は止めない。
  }
}

function loadSessionScores() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(SCORE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.map(sanitizeSessionScoreRecord).filter(Boolean) : [];
  } catch {
    return [];
  }
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
    maxCarry: sanitizeInteger(record.maxCarry, 0, MAX_CARRY_PACKAGES),
    nearMisses: sanitizeInteger(record.nearMisses, 0, 200),
    scoreBreakdown: sanitizeScoreBreakdown(record.scoreBreakdown),
    mapSeed: typeof record.mapSeed === "string" ? record.mapSeed.slice(0, 64) : "",
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
  const day = current.getUTCDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setUTCDate(current.getUTCDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + index);
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
  return `今日の街 ${adjective}${noun}`;
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
