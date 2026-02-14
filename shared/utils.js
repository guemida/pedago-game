// ═══════════════════════════════════════════════
// SHARED UTILITIES — Pedago Game
// ═══════════════════════════════════════════════

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const calculateScore = (startTime, hintsUsed, profile, baseScores) => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const base = (baseScores && baseScores[profile]) || 500;
  return Math.max(0, base - hintsUsed * 50 - Math.floor(elapsed / 15));
};

const formatTime = (seconds) =>
  Math.floor(seconds / 60) + "m" + String(seconds % 60).padStart(2, "0") + "s";
