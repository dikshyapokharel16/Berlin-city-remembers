import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import LandingScreen from './components/LandingScreen'
import HomeScreen from './components/HomeScreen'

const AMBIENT_FILES = [
  '/CoResidents/audio/826582__newlocknew__dsgnerie_a-far-dark-otherworldly-transitions-2-x4_em.mp3',
  '/CoResidents/audio/212459__unfa__electronic-noise-in-the-city.flac',
]
const AMBIENT_VOLUMES = [0.55, 0.35]

function fadeVolume(audio, from, to, durationMs) {
  const steps = 40
  const interval = durationMs / steps
  const delta = (to - from) / steps
  let current = from
  let step = 0
  const id = setInterval(() => {
    step++
    current = Math.min(Math.max(current + delta, 0), 1)
    audio.volume = current
    if (step >= steps) clearInterval(id)
  }, interval)
  return id
}

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [mouse, setMouse] = useState({ x: -100, y: -100 })
  const ambientRefs = useRef([])
  const goHome = useCallback(() => setScreen('home'), [])

  useEffect(() => {
    const audios = AMBIENT_FILES.map(src => {
      const a = new Audio(src)
      a.loop = true
      a.volume = 0
      return a
    })
    ambientRefs.current = audios

    const start = () => {
      audios.forEach((a, i) => {
        a.play().catch(() => {})
        fadeVolume(a, 0, AMBIENT_VOLUMES[i], 2000)
      })
      window.removeEventListener('pointerdown', start)
    }
    window.addEventListener('pointerdown', start)
    return () => {
      window.removeEventListener('pointerdown', start)
      audios.forEach(a => { a.pause(); a.src = '' })
    }
  }, [])

  const duckAmbient = useCallback(() => {
    ambientRefs.current.forEach(a => fadeVolume(a, a.volume, 0, 400))
  }, [])

  const restoreAmbient = useCallback(() => {
    ambientRefs.current.forEach((a, i) => fadeVolume(a, a.volume, AMBIENT_VOLUMES[i], 800))
  }, [])

  useEffect(() => {
    const onMove = e => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Global cursor — hidden on landing (LandingScreen renders its own) */}
      {screen !== 'landing' && <>
        {/* Outer ring — slightly lagging for depth */}
        <motion.div
          style={{
            position: 'fixed', top: 0, left: 0, zIndex: 99999,
            width: 30, height: 30, borderRadius: '50%',
            border: '1.5px solid rgba(0,245,255,0.6)',
            boxShadow: '0 0 12px rgba(0,245,255,0.25)',
            pointerEvents: 'none',
          }}
          animate={{ x: mouse.x - 15, y: mouse.y - 15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35, mass: 0.3 }}
        />
        {/* Inner dot — snaps immediately */}
        <motion.div
          style={{
            position: 'fixed', top: 0, left: 0, zIndex: 99999,
            width: 4, height: 4, borderRadius: '50%',
            background: '#00f5ff',
            boxShadow: '0 0 8px rgba(0,245,255,0.9)',
            pointerEvents: 'none',
          }}
          animate={{ x: mouse.x - 2, y: mouse.y - 2 }}
          transition={{ type: 'spring', stiffness: 900, damping: 40, mass: 0.05 }}
        />
      </>}

      {screen === 'landing'
        ? <LandingScreen onComplete={goHome} />
        : <HomeScreen onVoiceStart={duckAmbient} onVoiceStop={restoreAmbient} />
      }
    </>
  )
}
