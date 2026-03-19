import { useState } from 'react';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { ThemeToggle } from './components/ThemeToggle';
import { Scores, SectionScores } from './types';

type Screen = 'landing' | 'quiz' | 'results';

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [scores, setScores] = useState<Scores | null>(null);
  const [sectionScores, setSectionScores] = useState<SectionScores | null>(null);

  const handleStart = () => {
    setScreen('quiz');
  };

  const handleQuizComplete = (finalScores: Scores, finalSectionScores: SectionScores) => {
    setScores(finalScores);
    setSectionScores(finalSectionScores);
    setScreen('results');
  };

  const handleRestart = () => {
    setScores(null);
    setSectionScores(null);
    setScreen('landing');
  };

  return (
    <>
      <ThemeToggle />
      {screen === 'landing' && <Landing onStart={handleStart} />}
      {screen === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {screen === 'results' && scores && sectionScores && (
        <Results scores={scores} sectionScores={sectionScores} onRestart={handleRestart} />
      )}
      <footer className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none">
        <span className="section-label" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
          Built by JBRDMN
        </span>
      </footer>
    </>
  );
}

export default App;
