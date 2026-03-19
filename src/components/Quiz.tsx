import { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { questions } from '../data/questions';
import { Scores, SectionScores, PersonaType } from '../types';
import { personaData } from '../data/personas';
import { useTheme } from '../context/ThemeContext';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function emptyScores(): Scores {
  return { Director: 0, Collaborator: 0, Delegator: 0, Explorer: 0, Sceptic: 0, Hacker: 0 };
}

interface QuizProps {
  onComplete: (scores: Scores, sectionScores: SectionScores) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const { theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [scores, setScores] = useState<Scores>(emptyScores());
  const [sectionScores, setSectionScores] = useState<SectionScores>({
    s1: emptyScores(),
    s2: emptyScores(),
    s3: emptyScores()
  });

  const question = questions[currentQuestion];
  const isDark = theme === 'dark';

  const shuffledAnswers = useMemo(
    () => shuffleArray(question.answers.map((a, i) => ({ ...a, originalIndex: i }))),
    [currentQuestion]
  );

  const handleAnswerSelect = (answerIndex: number, persona: PersonaType) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    const newScores = { ...scores };
    newScores[persona]++;
    setScores(newScores);

    const sectionKey = `s${question.section}` as keyof SectionScores;
    const newSectionScores = {
      ...sectionScores,
      [sectionKey]: { ...sectionScores[sectionKey], [persona]: sectionScores[sectionKey][persona] + 1 }
    };
    setSectionScores(newSectionScores);

    setVisible(false);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeout(() => setVisible(true), 80);
      } else {
        onComplete(newScores, newSectionScores);
      }
    }, 0);
  };

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'clipboard-list': Icons.ClipboardList,
      'zap': Icons.Zap,
      'message-circle': Icons.MessageCircle,
      'compass': Icons.Compass,
      'search': Icons.Search,
      'terminal': Icons.Terminal,
      'file-edit': Icons.FileEdit,
      'reply': Icons.Reply,
      'refresh-cw': Icons.RefreshCw,
      'code': Icons.Code,
      'scissors': Icons.Scissors,
      'alert-circle': Icons.AlertCircle,
      'book-open': Icons.BookOpen,
      'play': Icons.Play,
      'help-circle': Icons.HelpCircle,
      'shuffle': Icons.Shuffle,
      'check-circle': Icons.CheckCircle,
      'git-branch': Icons.GitBranch,
      'settings': Icons.Settings,
      'camera': Icons.Camera,
      'arrow-right': Icons.ArrowRight,
      'rocket': Icons.Rocket,
      'shield': Icons.Shield,
      'bug': Icons.Bug,
      'file-text': Icons.FileText,
      'thumbs-up': Icons.ThumbsUp,
      'users': Icons.Users,
      'lightbulb': Icons.Lightbulb,
      'eye': Icons.Eye,
      'cpu': Icons.Cpu,
      'clock': Icons.Clock,
      'fast-forward': Icons.FastForward,
      'message-square': Icons.MessageSquare,
      'target': Icons.Target,
      'shield-check': Icons.ShieldCheck,
      'zap-off': Icons.ZapOff,
      'frown': Icons.Frown,
      'meh': Icons.Meh,
      'smile': Icons.Smile,
      'sparkles': Icons.Sparkles,
      'minus-circle': Icons.MinusCircle,
      'activity': Icons.Activity,
      'align-left': Icons.AlignLeft,
      'list': Icons.List,
      'git-commit': Icons.GitCommit,
      'wind': Icons.Wind,
      'file-search': Icons.FileSearch,
      'lock': Icons.Lock
    };

    const IconComponent = iconMap[iconName] || Icons.Circle;
    return <IconComponent size={20} strokeWidth={2.5} />;
  };

  const fillColor = isDark ? '#F5F4EF' : '#0A0A0A';
  const borderColor = isDark ? '#F5F4EF' : '#0A0A0A';

  return (
    <div className="min-h-screen px-6 md:px-12 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <div className="flex gap-4">
            {[
              { label: 'Instinct', start: 0 },
              { label: 'Response', start: 5 },
              { label: 'Belief', start: 10 }
            ].map(({ label, start }) => (
              <div key={label} className="flex-1">
                <div
                  className="text-[10px] font-bold uppercase mb-2"
                  style={{ letterSpacing: '0.12em', opacity: 0.35 }}
                >
                  {label}
                </div>
                <div className="flex gap-[3px]">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const idx = start + i;
                    const isFilled = idx < currentQuestion;
                    const isActive = idx === currentQuestion;
                    return (
                      <div
                        key={i}
                        className={`flex-1${isActive ? ' progress-block-active' : ''}`}
                        style={{
                          height: '12px',
                          border: `3px solid ${borderColor}`,
                          backgroundColor: isFilled ? fillColor : 'transparent'
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ opacity: visible ? 1 : 0 }}>
          <div
            className="text-xs font-bold uppercase mb-6"
            style={{ letterSpacing: '0.12em', opacity: 0.45 }}
          >
            Q{currentQuestion + 1} / {questions.length}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-tight">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {shuffledAnswers.map((answer, index) => {
              const isSelected = selectedAnswer === index;
              const isDimmed = selectedAnswer !== null && selectedAnswer !== index;
              const accentColor = personaData[answer.persona].color;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index, answer.persona)}
                  disabled={selectedAnswer !== null}
                  className={`answer-card p-6 text-left relative ${isDimmed ? 'answer-dimmed' : ''} ${isSelected ? 'answer-selected' : ''}`}
                >
                  {isSelected && (
                    <span
                      className="absolute top-3 right-3 text-xs font-bold"
                      style={{ color: accentColor }}
                    >
                      ●
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0" style={{ color: 'inherit' }}>
                      {getIcon(answer.icon)}
                    </div>
                    <p className="text-sm font-medium uppercase leading-relaxed" style={{ letterSpacing: '0.04em' }}>
                      {answer.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
