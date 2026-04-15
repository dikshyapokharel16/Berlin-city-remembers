// Persistent counters for helper actions and kiez health scores.
// All values survive page reloads via localStorage.

// ── Seeds so the counter feels alive on first use ────────────────
const SEEDS = { fox: 247, bee: 183, bird: 312, tree: 428, boar: 91, spree: 156, street: 64 }

const helperKey = (type) => `berlin_helpers_${type}`
const kiezKey   = (kiez) => `berlin_kiez_health_${kiez.toLowerCase().replace(/\s+/g, '_')}`

// ── Per-type helper count ─────────────────────────────────────────
export function getHelperCount(type) {
  const key = helperKey(type)
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, String(SEEDS[type] ?? 100))
  }
  return parseInt(localStorage.getItem(key), 10)
}

export function incrementHelperCount(type) {
  const next = getHelperCount(type) + 1
  localStorage.setItem(helperKey(type), String(next))
  return next
}

// ── Per-kiez health score (0 – 100) ──────────────────────────────
// Starts at 40 so the very first action feels meaningful (+delta moves it visibly)
export function getKiezHealth(kiez) {
  const key = kiezKey(kiez)
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, '40')
  }
  return parseInt(localStorage.getItem(key), 10)
}

export function incrementKiezHealth(kiez, delta = 3) {
  const next = Math.min(100, getKiezHealth(kiez) + delta)
  localStorage.setItem(kiezKey(kiez), String(next))
  return next
}

export function decrementKiezHealth(kiez, delta = 2) {
  const next = Math.max(0, getKiezHealth(kiez) - delta)
  localStorage.setItem(kiezKey(kiez), String(next))
  return next
}

// ── Personal session counters ─────────────────────────────────────
export function getPersonalActions() {
  return parseInt(localStorage.getItem('berlin_personal_actions') || '0', 10)
}
export function incrementPersonalActions() {
  const next = getPersonalActions() + 1
  localStorage.setItem('berlin_personal_actions', String(next))
  return next
}
export function getPersonalIgnores() {
  return parseInt(localStorage.getItem('berlin_personal_ignores') || '0', 10)
}
export function incrementPersonalIgnores() {
  const next = getPersonalIgnores() + 1
  localStorage.setItem('berlin_personal_ignores', String(next))
  return next
}
