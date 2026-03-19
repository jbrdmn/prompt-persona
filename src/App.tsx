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
        <div className="flex items-center" style={{ gap: '8px' }}>
          <span className="section-label" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
            Built by JBRDMN
          </span>
          <a
            href="https://www.linkedin.com/in/jbrdmn"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-linkedin pointer-events-auto"
            aria-label="LinkedIn profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
