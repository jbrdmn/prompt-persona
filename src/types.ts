export type PersonaType = 'Director' | 'Collaborator' | 'Delegator' | 'Explorer' | 'Sceptic' | 'Hacker';

export interface Answer {
  text: string;
  persona: PersonaType;
  icon: string;
}

export interface Question {
  id: number;
  section: 1 | 2 | 3;
  question: string;
  answers: Answer[];
}

export type Scores = Record<PersonaType, number>;

export interface SectionScores {
  s1: Scores;
  s2: Scores;
  s3: Scores;
}

export type Trait = 'Structured' | 'Methodical' | 'Outcome-led' | 'Iterative' | 'Intuitive' | 'Conversational' | 'Spontaneous' | 'Trust-high' | 'Experimental' | 'Exploratory' | 'Verification-led' | 'Boundary-testing';
