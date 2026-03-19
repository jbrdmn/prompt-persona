import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Scores, SectionScores, PersonaType } from '../types';
import { personaData, allTraits } from '../data/personas';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { copyLink, shareToTwitter, shareToLinkedIn, nativeShare } from '../utils/share';

interface ResultsProps {
  scores: Scores;
  sectionScores: SectionScores;
  onRestart: () => void;
}

function needsDarkText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function topPersonaFromScores(s: Scores): PersonaType {
  return Object.entries(s).sort((a, b) => b[1] - a[1])[0][0] as PersonaType;
}

const sectionDelay = (i: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: i * 0.12, ease: 'easeOut' as const } });

export function Results({ scores, sectionScores, onRestart }: ResultsProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topPersona = sorted[0][0] as PersonaType;
  const secondScore = sorted[1][1];
  const gap = sorted[0][1] - secondScore;
  const secondPersona = sorted[1][0] as PersonaType;

  const isTied = gap === 0;

  const confidenceLabel = (() => {
    if (isTied) return `${topPersona} / ${secondPersona}`;
    if (gap <= 1) return `${topPersona} / ${secondPersona}`;
    if (gap <= 4) return `Primarily ${topPersona} with ${secondPersona} tendencies`;
    return topPersona;
  })();

  const s1Top = topPersonaFromScores(sectionScores.s1);
  const s3Top = topPersonaFromScores(sectionScores.s3);
  const showSectionBreakdown = s1Top !== s3Top;

  const persona = personaData[topPersona];

  const isTraitOwned = (trait: string): boolean => persona.traits.includes(trait as any);

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const radarData = [
    { persona: 'Director',    you: scores.Director,    archetype: persona.idealProfile.Director },
    { persona: 'Collaborator', you: scores.Collaborator, archetype: persona.idealProfile.Collaborator },
    { persona: 'Delegator',   you: scores.Delegator,   archetype: persona.idealProfile.Delegator },
    { persona: 'Explorer',    you: scores.Explorer,    archetype: persona.idealProfile.Explorer },
    { persona: 'Sceptic',     you: scores.Sceptic,     archetype: persona.idealProfile.Sceptic },
    { persona: 'Hacker',      you: scores.Hacker,      archetype: persona.idealProfile.Hacker }
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isDark = theme === 'dark';
  const baseColor = isDark ? '#F5F4EF' : '#0A0A0A';
  const gridDotted = isDark ? 'rgba(245,244,239,0.2)' : 'rgba(10,10,10,0.2)';
  const archetypeStroke = isDark ? 'rgba(245,244,239,0.5)' : 'rgba(10,10,10,0.5)';
  const barTrackBg = isDark ? 'rgba(245,244,239,0.1)' : 'rgba(10,10,10,0.08)';

  return (
    <div className="min-h-screen px-6 md:px-12 py-12">
      <div className="max-w-4xl mx-auto">

        <motion.div className="mb-0" {...sectionDelay(0)}>
          <div className="section-label mb-3">Your Prompt Persona</div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-black uppercase leading-none focus:outline-none"
            style={{
              fontSize: 'clamp(80px, 12vw, 160px)',
              color: persona.color,
              letterSpacing: '-0.02em',
              hyphens: 'auto',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
              marginBottom: confidenceLabel !== topPersona ? 0 : '16px'
            }}
          >
            {topPersona}
          </h1>
          {confidenceLabel !== topPersona && (
            <p
              className="section-label"
              style={{
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                fontWeight: 400,
                textTransform: 'none',
                letterSpacing: 'normal',
                marginTop: '8px',
                marginBottom: '16px'
              }}
            >
              {confidenceLabel}
            </p>
          )}
          {showSectionBreakdown && (
            <p className="text-xs uppercase font-medium text-muted mb-4" style={{ letterSpacing: '0.12em' }}>
              You work like a {s1Top} but think like a {s3Top}
            </p>
          )}
        </motion.div>

        <hr className="section-rule mb-10" />

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-0" {...sectionDelay(1)}>
          <div className="p-8 border-[3px]" style={{ borderColor: baseColor }}>
            <p className="text-sm leading-relaxed">
              {persona.description}
            </p>
          </div>
          <div className="p-8 border-[3px] border-t-0 md:border-t-[3px] md:border-l-0" style={{ borderColor: baseColor }}>
            <p
              className="text-xs font-bold uppercase mb-5"
              style={{ letterSpacing: '0.12em' }}
            >
              Work Ons
            </p>
            <div className="space-y-4">
              {persona.workOns.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5"
                    style={{ letterSpacing: '0.08em', opacity: 0.4 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <hr className="section-rule mb-10 mt-0" />

        <motion.div className="mb-0" {...sectionDelay(2)}>
          <div className="section-label mb-6">Traits</div>
          <div className="flex flex-wrap gap-2">
            {allTraits.map((trait, i) => {
              const owned = isTraitOwned(trait);
              const textColor = owned
                ? (needsDarkText(persona.color) ? '#0A0A0A' : '#F5F4EF')
                : undefined;
              return (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.24 + i * 0.03 }}
                  className="px-4 py-2 text-xs font-bold uppercase"
                  style={owned ? {
                    backgroundColor: persona.color,
                    color: textColor,
                    border: `3px solid ${persona.color}`,
                    letterSpacing: '0.08em'
                  } : {
                    background: 'transparent',
                    border: `3px solid ${baseColor}`,
                    opacity: 0.35,
                    letterSpacing: '0.08em'
                  }}
                >
                  {trait}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <hr className="section-rule mt-10 mb-10" />

        <motion.div className="mb-0" {...sectionDelay(3)}>
          <div className="section-label mb-6">Profile</div>
          <ResponsiveContainer width="100%" height={420}>
            <RadarChart data={radarData} margin={{ top: 20, right: isMobile ? 20 : 44, bottom: 20, left: isMobile ? 20 : 44 }}>
              <PolarGrid stroke={gridDotted} strokeDasharray="2 4" />
              <PolarAngleAxis
                dataKey="persona"
                tick={({ payload, x, y, textAnchor }) => {
                  const axisColor = personaData[payload.value as PersonaType]?.color || baseColor;
                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={textAnchor}
                      fill={axisColor}
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />
              <Radar
                name="Archetype"
                dataKey="archetype"
                stroke={archetypeStroke}
                fill="transparent"
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
              <Radar
                name="You"
                dataKey="you"
                stroke={persona.color}
                strokeOpacity={1}
                fill={persona.color}
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '16px',
                  fontSize: '11px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.6
                }}
                iconType="line"
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <hr className="section-rule mb-10" />

        <motion.div className="mb-12" {...sectionDelay(4)}>
          <div className="section-label mb-6">Score Breakdown</div>
          <div className="space-y-3">
            {sortedScores.map(([p, score], i) => {
              const color = personaData[p as PersonaType].color;
              return (
                <motion.div
                  key={p}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.48 + i * 0.06 }}
                >
                  <div
                    className="text-xs font-bold uppercase w-20 md:w-28"
                    style={{ letterSpacing: '0.08em', opacity: 0.75 }}
                  >
                    {p}
                  </div>
                  <div
                    className="flex-1 h-5"
                    style={{ backgroundColor: barTrackBg, border: `2px solid ${baseColor}` }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(score / 15) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.48 + i * 0.06, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        backgroundColor: color
                      }}
                    />
                  </div>
                  <div
                    className="text-xs font-bold w-6 text-right"
                    style={{ opacity: 0.6 }}
                  >
                    {score}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <hr className="section-rule mb-10" />

        <motion.div className="mb-12" {...sectionDelay(5)}>
          <div className="section-label mb-6">Share</div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={async () => {
                const ok = await copyLink();
                if (ok) {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }
              }}
              className="px-5 py-3 text-xs font-bold uppercase"
              style={{
                letterSpacing: '0.08em',
                border: `3px solid ${baseColor}`,
                background: copied ? baseColor : 'transparent',
                color: copied ? (isDark ? '#0A0A0A' : '#F5F4EF') : undefined,
                cursor: 'pointer',
              }}
            >
              {copied ? 'Copied' : 'Copy Link'}
            </button>
            <button
              onClick={() => shareToTwitter(topPersona)}
              className="px-5 py-3 text-xs font-bold uppercase"
              style={{
                letterSpacing: '0.08em',
                border: `3px solid ${baseColor}`,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Twitter / X
            </button>
            <button
              onClick={() => shareToLinkedIn()}
              className="px-5 py-3 text-xs font-bold uppercase"
              style={{
                letterSpacing: '0.08em',
                border: `3px solid ${baseColor}`,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              LinkedIn
            </button>
            {canNativeShare && (
              <button
                onClick={() => nativeShare(topPersona)}
                className="px-5 py-3 text-xs font-bold uppercase"
                style={{
                  letterSpacing: '0.08em',
                  border: `3px solid ${persona.color}`,
                  backgroundColor: persona.color,
                  color: needsDarkText(persona.color) ? '#0A0A0A' : '#F5F4EF',
                  cursor: 'pointer',
                }}
              >
                Share
              </button>
            )}
          </div>
        </motion.div>

        <hr className="section-rule mb-8" />

        <motion.div className="pb-8" {...sectionDelay(6)}>
          <button
            onClick={onRestart}
            className="text-xs font-bold uppercase hover:underline"
            style={{
              letterSpacing: '0.12em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: 0.5
            }}
          >
            Restart
          </button>
        </motion.div>

      </div>
    </div>
  );
}
