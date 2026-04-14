// ── Shared colour palette ──────────────────────────────────────────
// Single source of truth for all earthy rust/terracotta/mist-teal tokens
// used across BerlinMap, DispatchPopup, ResidentMarker, and LandingScreen.

export const RUST        = '#d4682a'   // primary accent
export const RUST_LIGHT  = '#e08858'   // pins, warm orange accents
export const TERRACOTTA  = '#c07055'   // secondary accent, building caps
export const MIST_TEAL   = '#8ab8b2'   // atmospheric depth, 2D badge
export const DARK_BG     = '#1c1612'   // deepest background
export const PANEL_BG    = 'rgba(26,18,12,0.94)'   // UI panel glass
export const OFF_WHITE   = 'rgba(237,228,216,0.95)' // primary text

// Stress badge — shared between DispatchPopup and ResidentMarker
export const stressBadge = {
  background: 'rgba(180,60,40,0.18)',
  border: '1px solid rgba(180,60,40,0.4)',
  borderRadius: 4, padding: '2px 6px',
  fontSize: 8, color: '#e07060',
  fontWeight: 600, letterSpacing: '0.06em',
  textTransform: 'uppercase', fontFamily: 'Inter',
}
