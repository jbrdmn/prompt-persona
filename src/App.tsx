import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { ThemeToggle } from './components/ThemeToggle';
import { Scores, SectionScores } from './types';
import { getResultsHash, parseResultsFromHash } from './utils/scoring';

type Screen = 'landing' | 'quiz' | 'results';

const screenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [scores, setScores] = useState<Scores | null>(null);
  const [sectionScores, setSectionScores] = useState<SectionScores | null>(null);

  useEffect(() => {
    const result = parseResultsFromHash();
    if (result) {
      setScores(result.scores);
      setSectionScores(result.sectionScores);
      setScreen('results');
    }
  }, []);

  const handleStart = () => {
    setScreen('quiz');
  };

  const handleQuizComplete = (finalScores: Scores, finalSectionScores: SectionScores) => {
    setScores(finalScores);
    setSectionScores(finalSectionScores);
    window.location.hash = getResultsHash(finalSectionScores).slice(1);
    setScreen('results');
  };

  const handleRestart = () => {
    setScores(null);
    setSectionScores(null);
    history.replaceState(null, '', window.location.pathname);
    setScreen('landing');
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ThemeToggle />
      <main id="main-content">
        <AnimatePresence mode="wait">
          {screen === 'landing' && (
            <motion.div key="landing" variants={screenVariants} initial="initial" animate="animate" exit="exit">
              <Landing onStart={handleStart} />
            </motion.div>
          )}
          {screen === 'quiz' && (
            <motion.div key="quiz" variants={screenVariants} initial="initial" animate="animate" exit="exit">
              <Quiz onComplete={handleQuizComplete} />
            </motion.div>
          )}
          {screen === 'results' && scores && sectionScores && (
            <motion.div key="results" variants={screenVariants} initial="initial" animate="animate" exit="exit">
              <Results scores={scores} sectionScores={sectionScores} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none">
        <span className="section-label" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
          Built by JBRDMN
        </span>
      </footer>
    </>
  );
}

export default App;
