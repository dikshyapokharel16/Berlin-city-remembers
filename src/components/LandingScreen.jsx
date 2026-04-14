import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// City lights generated once — stable across renders
const LIGHTS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  baseOpacity: Math.random() * 0.5 + 0.08,
  delay: Math.random() * 4,
  duration: Math.random() * 2 + 1.5,
  warm: Math.random() > 0.5,
}))

const LOADING_MESSAGES = [
  'Locating Berlin...',
  'Listening to the Kiez...',
  'Finding your neighbours...',
  'Tuning in...',
  'Almost there...',
]

const TITLE = 'MITBEWOHNER'

export default function LandingScreen({ onComplete }) {
  // phase drives the entire sequence
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)

  // ── Timing sequence ────────────────────────────────────────────────
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),   // atmosphere in
      setTimeout(() => setPhase(2), 900),   // loading appears
      setTimeout(() => setPhase(3), 3400),  // loading done
      setTimeout(() => setPhase(4), 3900),  // title reveal
      setTimeout(() => setPhase(5), 5400),  // subtitle
      setTimeout(() => setPhase(6), 6200),  // tagline
      setTimeout(() => setPhase(7), 7400),  // fade to black
      setTimeout(onComplete, 8600),         // hand off
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  // ── Progress bar ───────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 2) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        // ease-out curve: fast then slow
        return p + (100 - p) * 0.018
      })
    }, 30)
    return () => clearInterval(interval)
  }, [phase])

  // ── Cycle messages ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 2) return
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MESSAGES.length)
    }, 700)
    return () => clearInterval(interval)
  }, [phase])

  // Current Berlin time
  const berlinTime = useMemo(() =>
    new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  , [])

  return (
    <div style={styles.root}>

      {/* ── Atmospheric background gradient ── */}
      <motion.div
        style={styles.bg}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 2.5 }}
      />

      {/* ── City lights ── */}
      <div style={styles.lightsLayer}>
        {LIGHTS.map(l => (
          <motion.div
            key={l.id}
            style={{
              ...styles.light,
              left: `${l.x}%`,
              top: `${l.y}%`,
              width: l.size,
              height: l.size,
              background: l.warm ? '#f5c97a' : '#a8d8f0',
              borderRadius: '50%',
            }}
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? {
              opacity: [l.baseOpacity, l.baseOpacity * 0.25, l.baseOpacity],
            } : { opacity: 0 }}
            transition={{
              delay: l.delay,
              duration: l.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Loading section ── */}
      <AnimatePresence>
        {phase >= 2 && phase < 4 && (
          <motion.div
            style={styles.loadingWrap}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7 }}
          >
            {/* Location stamp */}
            <div style={styles.locationStamp}>
              <span style={styles.dot} />
              BERLIN · {berlinTime}
            </div>

            {/* Progress bar */}
            <div style={styles.barTrack}>
              <motion.div
                style={{ ...styles.barFill, width: `${progress}%` }}
              />
              {phase === 3 && (
                <motion.div
                  style={styles.barGlow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>

            {/* Cycling message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={phase === 3 ? 'done' : msgIndex}
                style={styles.loadingMsg}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {phase === 3 ? 'Ready.' : LOADING_MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Title block ── */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            style={styles.titleBlock}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 7 ? 0 : 1 }}
            transition={{ duration: phase >= 7 ? 1.4 : 0.1 }}
          >
            {/* Main title — letter by letter */}
            <h1 style={styles.title} aria-label="Mitbewohner">
              {TITLE.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  style={styles.titleLetter}
                  initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: i * 0.065,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <AnimatePresence>
              {phase >= 5 && (
                <motion.p
                  style={styles.subtitle}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  Co-residents
                </motion.p>
              )}
            </AnimatePresence>

            {/* Divider line */}
            <AnimatePresence>
              {phase >= 6 && (
                <motion.div
                  style={styles.divider}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>

            {/* Tagline */}
            <AnimatePresence>
              {phase >= 6 && (
                <motion.p
                  style={styles.tagline}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  Dispatches from the city you share.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fade-to-black exit overlay ── */}
      <AnimatePresence>
        {phase >= 7 && (
          <motion.div
            style={styles.exitOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Inline styles ──────────────────────────────────────────────────────────
const styles = {
  root: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    background: '#1c1612',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(ellipse 80% 60% at 25% 80%, #2a1608 0%, transparent 65%),
      radial-gradient(ellipse 60% 50% at 75% 20%, #1e1a10 0%, transparent 60%),
      radial-gradient(ellipse 100% 80% at 50% 100%, #2e1808 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  lightsLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  light: {
    position: 'absolute',
    borderRadius: '50%',
  },
  loadingWrap: {
    position: 'absolute',
    bottom: '18%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    width: 280,
  },
  locationStamp: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
  },
  dot: {
    display: 'inline-block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#d4682a',
    boxShadow: '0 0 6px rgba(212,104,42,0.7)',
    animation: 'pulse 1.4s ease-in-out infinite',
  },
  barTrack: {
    position: 'relative',
    width: '100%',
    height: 1,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, rgba(212,104,42,0.6), rgba(212,104,42,1))',
    borderRadius: 1,
    transition: 'width 0.1s linear',
    boxShadow: '0 0 8px rgba(212,104,42,0.7)',
  },
  barGlow: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(212,104,42,0.3)',
    borderRadius: 1,
  },
  loadingMsg: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 300,
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.3)',
  },
  titleBlock: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    textAlign: 'center',
    padding: '0 24px',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 'clamp(42px, 8vw, 96px)',
    letterSpacing: '0.18em',
    color: '#f5f0e8',
    lineHeight: 1,
    display: 'flex',
    gap: 0,
  },
  titleLetter: {
    display: 'inline-block',
  },
  subtitle: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 'clamp(16px, 2.5vw, 22px)',
    letterSpacing: '0.12em',
    color: 'rgba(245,240,232,0.45)',
  },
  divider: {
    width: 48,
    height: 1,
    background: 'rgba(212,104,42,0.45)',
    transformOrigin: 'left',
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(11px, 1.5vw, 13px)',
    letterSpacing: '0.14em',
    color: 'rgba(255,255,255,0.22)',
    textTransform: 'uppercase',
  },
  exitOverlay: {
    position: 'absolute',
    inset: 0,
    background: '#1c1612',
    pointerEvents: 'none',
  },
}
