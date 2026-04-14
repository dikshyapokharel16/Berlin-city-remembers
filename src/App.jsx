import { useState, useCallback } from 'react'
import LandingScreen from './components/LandingScreen'
import HomeScreen from './components/HomeScreen'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const goHome = useCallback(() => setScreen('home'), [])

  return screen === 'landing'
    ? <LandingScreen onComplete={goHome} />
    : <HomeScreen />
}
