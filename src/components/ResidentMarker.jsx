import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RESIDENT_TYPES } from '../data/residents'

// Simple SVG icons — clear and minimal at any size
const icons = {
  fox: (c) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill={c}>
      {/* ears */}
      <polygon points="6,15 10,4 15,14" />
      <polygon points="26,15 22,4 17,14" />
      {/* face */}
      <ellipse cx="16" cy="19" rx="9" ry="7" />
      {/* snout */}
      <ellipse cx="16" cy="22.5" rx="4" ry="2.5" fill="white" fillOpacity="0.25" />
      {/* eyes */}
      <circle cx="12" cy="17" r="1.5" fill="white" fillOpacity="0.8" />
      <circle cx="20" cy="17" r="1.5" fill="white" fillOpacity="0.8" />
    </svg>
  ),
  bee: (c) => (
    <svg viewBox="0 0 32 32" width="22" height="22">
      {/* wings */}
      <ellipse cx="10" cy="12" rx="6" ry="3" fill="white" fillOpacity="0.45" transform="rotate(-25 10 12)" />
      <ellipse cx="22" cy="12" rx="6" ry="3" fill="white" fillOpacity="0.45" transform="rotate(25 22 12)" />
      {/* body */}
      <ellipse cx="16" cy="20" rx="5" ry="6" fill={c} />
      {/* stripes */}
      <rect x="11" y="17.5" width="10" height="2" rx="1" fill="white" fillOpacity="0.35" />
      <rect x="11" y="21.5" width="10" height="2" rx="1" fill="white" fillOpacity="0.35" />
      {/* head */}
      <circle cx="16" cy="12" r="4" fill={c} />
      {/* antennae */}
      <line x1="14" y1="9" x2="11" y2="4" stroke={c} strokeWidth="1.5" />
      <line x1="18" y1="9" x2="21" y2="4" stroke={c} strokeWidth="1.5" />
      <circle cx="11" cy="4" r="1.5" fill={c} />
      <circle cx="21" cy="4" r="1.5" fill={c} />
    </svg>
  ),
  bird: (c) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill={c}>
      {/* left wing */}
      <path d="M16 16 Q10 8 2 11 Q7 14 16 16" />
      {/* right wing */}
      <path d="M16 16 Q22 8 30 11 Q25 14 16 16" />
      {/* body */}
      <ellipse cx="16" cy="18" rx="4" ry="3" />
      {/* tail */}
      <path d="M12 19 L8 26 M14 20 L11 27" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx="22" cy="14" r="3.5" />
      {/* beak */}
      <polygon points="25,14 30,12.5 25,15.5" fill="white" fillOpacity="0.6" />
    </svg>
  ),
  tree: (c) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill={c}>
      {/* top canopy */}
      <polygon points="16,2 7,13 25,13" />
      {/* mid canopy */}
      <polygon points="16,8 5,21 27,21" />
      {/* trunk */}
      <rect x="13" y="21" width="6" height="8" rx="1.5" />
    </svg>
  ),
  boar: (c) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill={c}>
      {/* body */}
      <ellipse cx="13" cy="19" rx="9" ry="6.5" />
      {/* head */}
      <ellipse cx="24" cy="16" rx="7" ry="5.5" />
      {/* snout */}
      <ellipse cx="30" cy="16" rx="3" ry="2.5" />
      {/* tusk */}
      <path d="M28 18.5 L31 23" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* eye */}
      <circle cx="26" cy="13.5" r="1.5" fill="white" fillOpacity="0.8" />
      {/* ear */}
      <polygon points="19,10 22,6 25,11" />
      {/* legs */}
      <rect x="7"  y="24" width="3" height="6" rx="1.5" />
      <rect x="13" y="24" width="3" height="6" rx="1.5" />
    </svg>
  ),
  spree: (c) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round">
      <path d="M2 10 Q6 6 10 10 Q14 14 18 10 Q22 6 30 10" />
      <path d="M2 17 Q6 13 10 17 Q14 21 18 17 Q22 13 30 17" />
      <path d="M2 24 Q6 20 10 24 Q14 28 18 24 Q22 20 30 24" strokeOpacity="0.45" />
    </svg>
  ),
}

export default function ResidentMarker({ resident, visible, onMarkerClick }) {
  const [hovered, setHovered] = useState(false)
  const type = RESIDENT_TYPES[resident.type]
  const Icon = icons[resident.type]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{ position: 'relative', cursor: 'pointer', zIndex: hovered ? 200 : 1 }}
          initial={{ opacity: 0, scale: 0, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onMarkerClick?.(resident)}
        >
          {/* Single gentle pulse ring */}
          <motion.div
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 46, height: 46,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: `1.5px solid ${type.color}`,
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.9, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* Main icon bubble */}
          <motion.div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: `rgba(28,18,12,0.86)`,
              border: `2px solid ${type.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 14px ${type.color}55, 0 2px 8px rgba(0,0,0,0.5)`,
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.15, boxShadow: `0 0 22px ${type.color}88` }}
          >
            {Icon && Icon(type.color)}
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 52, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 210,
                  background: 'rgba(26,16,10,0.97)',
                  border: `1px solid ${type.color}55`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  backdropFilter: 'blur(16px)',
                  pointerEvents: 'none',
                  boxShadow: `0 8px 32px rgba(0,0,0,0.6)`,
                  zIndex: 300,
                }}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {/* Tip arrow */}
                <div style={{
                  position: 'absolute', bottom: -5, left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: 8, height: 8,
                  background: 'rgba(26,16,10,0.97)',
                  borderRight: `1px solid ${type.color}55`,
                  borderBottom: `1px solid ${type.color}55`,
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: `${type.color}20`, border: `1.5px solid ${type.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {Icon && Icon(type.color)}
                  </div>
                  <div>
                    <div style={{ color: type.color, fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', fontFamily: 'Inter' }}>
                      {type.label}
                    </div>
                    <div style={{ color: 'rgba(212,190,168,0.45)', fontSize: 9.5, fontFamily: 'Inter', letterSpacing: '0.06em' }}>
                      {resident.kiez}
                    </div>
                  </div>
                  <div style={{
                    marginLeft: 'auto', flexShrink: 0,
                    background: 'rgba(180,60,40,0.18)', border: '1px solid rgba(180,60,40,0.35)',
                    borderRadius: 4, padding: '2px 6px',
                    fontSize: 8, color: '#e07060', fontFamily: 'Inter',
                    fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    {resident.stress}
                  </div>
                </div>

                <p style={{
                  color: 'rgba(212,190,168,0.6)', fontSize: 10.5,
                  lineHeight: 1.6, fontWeight: 300, fontFamily: 'Inter', margin: 0,
                }}>
                  {resident.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
