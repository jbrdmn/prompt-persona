import { Scores, SectionScores, PersonaType } from '../types';

const PERSONA_ORDER: PersonaType[] = [
  'Director', 'Collaborator', 'Delegator', 'Explorer', 'Sceptic', 'Hacker'
];

export function encodeResults(sectionScores: SectionScores): string {
  const parts: number[] = [];
  for (const section of ['s1', 's2', 's3'] as const) {
    for (const persona of PERSONA_ORDER) {
      parts.push(sectionScores[section][persona]);
    }
  }
  return parts.join('');
}

export function decodeResults(encoded: string): { scores: Scores; sectionScores: SectionScores } | null {
  if (!/^\d{18}$/.test(encoded)) return null;

  const digits = encoded.split('').map(Number);
  const sections = ['s1', 's2', 's3'] as const;
  const sectionScores = {} as SectionScores;
  const scores: Scores = { Director: 0, Collaborator: 0, Delegator: 0, Explorer: 0, Sceptic: 0, Hacker: 0 };

  for (let s = 0; s < 3; s++) {
    const sectionKey = sections[s];
    const sectionData = {} as Scores;
    for (let p = 0; p < 6; p++) {
      const val = digits[s * 6 + p];
      if (val > 5) return null;
      const persona = PERSONA_ORDER[p];
      sectionData[persona] = val;
      scores[persona] += val;
    }
    sectionScores[sectionKey] = sectionData;
  }

  return { scores, sectionScores };
}

export function getResultsHash(sectionScores: SectionScores): string {
  return `#r=${encodeResults(sectionScores)}`;
}

export function parseResultsFromHash(): { scores: Scores; sectionScores: SectionScores } | null {
  const hash = window.location.hash;
  const match = hash.match(/^#r=(\d{18})$/);
  if (!match) return null;
  return decodeResults(match[1]);
}
