import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RESIDENT_TYPES } from '../data/residents'
import { stressBadge } from '../theme'
import AftermathScreen from './AftermathScreen'
import { incrementHelperCount, incrementKiezHealth } from '../utils/storage'

// SVG icons inlined (same as ResidentMarker but self-contained)
const icons = {
  fox: (c) => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill={c}>
      <polygon points="6,15 10,4 15,14" />
      <polygon points="26,15 22,4 17,14" />
      <ellipse cx="16" cy="19" rx="9" ry="7" />
      <ellipse cx="16" cy="22.5" rx="4" ry="2.5" fill="white" fillOpacity="0.2" />
      <circle cx="12" cy="17" r="1.5" fill="white" fillOpacity="0.8" />
      <circle cx="20" cy="17" r="1.5" fill="white" fillOpacity="0.8" />
    </svg>
  ),
  bee: (c) => (
    <svg viewBox="0 0 32 32" width="20" height="20">
      <ellipse cx="10" cy="12" rx="6" ry="3" fill="white" fillOpacity="0.4" transform="rotate(-25 10 12)" />
      <ellipse cx="22" cy="12" rx="6" ry="3" fill="white" fillOpacity="0.4" transform="rotate(25 22 12)" />
      <ellipse cx="16" cy="20" rx="5" ry="6" fill={c} />
      <rect x="11" y="17.5" width="10" height="2" rx="1" fill="white" fillOpacity="0.3" />
      <rect x="11" y="21.5" width="10" height="2" rx="1" fill="white" fillOpacity="0.3" />
      <circle cx="16" cy="12" r="4" fill={c} />
    </svg>
  ),
  bird: (c) => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill={c}>
      <path d="M16 16 Q10 8 2 11 Q7 14 16 16" />
      <path d="M16 16 Q22 8 30 11 Q25 14 16 16" />
      <ellipse cx="16" cy="18" rx="4" ry="3" />
      <circle cx="22" cy="14" r="3.5" />
      <polygon points="25,14 30,12.5 25,15.5" fill="white" fillOpacity="0.6" />
    </svg>
  ),
  tree: (c) => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill={c}>
      <polygon points="16,2 7,13 25,13" />
      <polygon points="16,8 5,21 27,21" />
      <rect x="13" y="21" width="6" height="8" rx="1.5" />
    </svg>
  ),
  boar: (c) => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill={c}>
      <ellipse cx="13" cy="19" rx="9" ry="6.5" />
      <ellipse cx="24" cy="16" rx="7" ry="5.5" />
      <ellipse cx="30" cy="16" rx="3" ry="2.5" />
      <path d="M28 18.5 L31 23" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="26" cy="13.5" r="1.5" fill="white" fillOpacity="0.8" />
      <polygon points="19,10 22,6 25,11" />
    </svg>
  ),
  spree: (c) => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round">
      <path d="M2 10 Q6 6 10 10 Q14 14 18 10 Q22 6 30 10" />
      <path d="M2 17 Q6 13 10 17 Q14 21 18 17 Q22 13 30 17" />
      <path d="M2 24 Q6 20 10 24 Q14 28 18 24 Q22 20 30 24" strokeOpacity="0.4" />
    </svg>
  ),
}

export default function DispatchPopup({ resident, onClose }) {
  const [phase, setPhase] = useState('dispatch') // 'dispatch' | 'aftermath'
  const [helperCount, setHelperCount] = useState(0)
  const [kiezHealth, setKiezHealth] = useState(0)
  const type = RESIDENT_TYPES[resident.type]
  const Icon = icons[resident.type]

  const handleDo = () => {
    setHelperCount(incrementHelperCount(resident.type))
    setKiezHealth(incrementKiezHealth(resident.kiez))
    setPhase('aftermath')
  }

  return (
    <motion.div
      style={s.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <AnimatePresence mode="wait">

        {/* ── Main dispatch card ── */}
        {phase === 'dispatch' && (
          <motion.div
            key="card"
            style={s.card}
            initial={{ opacity: 0, y: 70, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            {/* Close button */}
            <button style={s.closeBtn} onClick={onClose} aria-label="close">✕</button>

            {/* Header */}
            <div style={s.header}>
              <div style={{
                ...s.iconBubble,
                background: `${type.color}1a`,
                border: `2px solid ${type.color}`,
                boxShadow: `0 0 20px ${type.color}40`,
              }}>
                {Icon && Icon(type.color)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: type.color, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter' }}>
                  {type.label}
                </div>
                <div style={{ color: 'rgba(212,190,168,0.5)', fontSize: 12, fontFamily: 'Inter', marginTop: 2 }}>
                  {resident.kiez}
                </div>
              </div>
              <div style={{
                ...stressBadge,
                borderRadius: 6, padding: '4px 10px',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                alignSelf: 'flex-start',
              }}>
                {resident.stress}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(212,168,136,0.1)', margin: '4px 0 16px' }} />

            {/* Dispatch — first-person narrative */}
            <div style={s.dispatchLabel}>Dispatch</div>
            <p style={s.dispatch}>{resident.dispatch}</p>

            {/* Action section */}
            <div style={{ ...s.actionBox, borderColor: `${type.color}30` }}>
              <div style={{ ...s.actionLabel, color: type.color }}>
                <span style={{ fontSize: 12 }}>→</span> Your action
              </div>
              <p style={s.actionText}>{resident.action}</p>
            </div>

            {/* CTA buttons */}
            <div style={s.btnRow}>
              <motion.button
                style={s.btnSkip}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
              >
                Skip it
              </motion.button>
              <motion.button
                style={{ ...s.btnDo, borderColor: type.color, color: type.color }}
                whileHover={{ backgroundColor: `${type.color}22`, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDo}
              >
                Do it
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Aftermath screen ── */}
        {phase === 'aftermath' && (
          <AftermathScreen
            key="aftermath"
            resident={resident}
            type={type}
            Icon={Icon}
            helperCount={helperCount}
            kiezHealth={kiezHealth}
            onClose={onClose}
          />
        )}

      </AnimatePresence>
    </motion.div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────
const s = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(20,14,10,0.72)',
    backdropFilter: 'blur(8px)',
    padding: '20px',
  },
  card: {
    width: '100%', maxWidth: 480,
    background: 'rgba(30,22,16,0.97)',
    border: '1px solid rgba(212,104,42,0.14)',
    borderRadius: 16,
    padding: '40px 36px 32px',
    boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,104,42,0.06)',
    display: 'flex', flexDirection: 'column', gap: 0,
    position: 'relative',
    maxHeight: '90vh', overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute', top: 16, right: 16,
    background: 'none', border: 'none',
    color: 'rgba(237,228,216,0.3)', fontSize: 14,
    cursor: 'pointer', padding: '4px 6px', lineHeight: 1,
    fontFamily: 'Inter',
  },
  header: {
    display: 'flex', alignItems: 'center',
    gap: 14, marginBottom: 22,
  },
  iconBubble: {
    width: 48, height: 48, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  dispatchLabel: {
    fontFamily: 'Inter', fontSize: 9, fontWeight: 600,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'rgba(212,168,136,0.35)', marginBottom: 10,
  },
  dispatch: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 17, lineHeight: 1.88,
    color: 'rgba(237,228,216,0.84)',
    fontStyle: 'italic', fontWeight: 400,
    margin: '0 0 28px',
  },
  actionBox: {
    border: '1px solid',
    borderRadius: 10, padding: '20px 20px',
    background: 'rgba(212,104,42,0.04)',
    marginBottom: 28,
  },
  actionLabel: {
    fontFamily: 'Inter', fontSize: 10, fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    marginBottom: 8, display: 'flex', gap: 6, alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Inter', fontSize: 14, lineHeight: 1.65,
    color: 'rgba(212,190,168,0.7)', fontWeight: 300, margin: 0,
  },
  btnRow: {
    display: 'flex', gap: 16,
  },
  btnSkip: {
    flex: 1, padding: '15px 0',
    background: 'rgba(237,228,216,0.04)',
    border: '1px solid rgba(237,228,216,0.1)',
    borderRadius: 10, cursor: 'pointer',
    color: 'rgba(237,228,216,0.38)',
    fontFamily: 'Inter', fontSize: 13, fontWeight: 500,
    letterSpacing: '0.04em',
    transition: 'background 0.2s',
  },
  btnDo: {
    flex: 1, padding: '15px 0',
    background: 'transparent',
    border: '1.5px solid',
    borderRadius: 10, cursor: 'pointer',
    fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
    letterSpacing: '0.06em',
    transition: 'background 0.2s',
  },
}
