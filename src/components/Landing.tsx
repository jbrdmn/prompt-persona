import { useState, useEffect } from 'react';

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'PROMPT\nPERSONA';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const lines = displayText.split('\n');

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 md:px-12">
      <div className="w-full">
        <h1
          className="font-black uppercase leading-none mb-8 tracking-tighter"
          style={{ fontSize: 'clamp(64px, 14vw, 180px)', wordBreak: 'break-word', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
              {i === lines.length - 1 && <span className="animate-blink">█</span>}
            </span>
          ))}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ letterSpacing: '0.12em', opacity: 0.45 }}
          >
            Discover how you think with AI
          </p>
          <button
            onClick={onStart}
            className="self-start px-8 py-3 border-[3px] border-current bg-transparent text-xs font-bold uppercase tracking-widest hover:bg-[#0A0A0A] hover:text-[#F5F4EF] transition-colors duration-150"
            style={{ letterSpacing: '0.12em' }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
