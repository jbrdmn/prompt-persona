import { PersonaType, Trait, Scores } from '../types';

export interface PersonaData {
  color: string;
  description: string;
  strength: string;
  friction: string;
  workOns: [string, string, string];
  traits: Trait[];
  idealProfile: Scores;
}

export const personaData: Record<PersonaType, PersonaData> = {
  Director: {
    color: '#F5A623',
    description: "Your prompts are reproducible, consistent, and transferable — someone else could run them and get the same output. The friction is that you're doing half the AI's job before it starts. You pre-solve structure, format, and approach, which means you're optimising for reliability at the cost of discovery.",
    strength: "Your prompts are reproducible, consistent, and transferable — someone else could run them and get the same output. The friction is that you're doing half the AI's job before it starts. You pre-solve structure, format, and approach, which means you're optimising for reliability at the cost of discovery.",
    friction: "You're pre-solving for the AI, which limits unexpected output.",
    workOns: [
      "Write the goal, not the method. Define what success looks like and let the AI route to it.",
      "Occasionally prompt with constraints removed. Give it the context but not the format and see what shape it reaches for.",
      "Try a 'worst version first' prompt — ask for the bad answer deliberately, then ask it to invert. Forces unexpected thinking."
    ],
    traits: ['Structured', 'Methodical', 'Outcome-led'],
    idealProfile: { Director: 8, Collaborator: 3, Delegator: 2, Explorer: 2, Sceptic: 4, Hacker: 1 }
  },
  Collaborator: {
    color: '#2DD4BF',
    description: "You get genuinely good output because you treat the process like a conversation rather than a transaction. You're comfortable not knowing the answer at the start, which means the AI can help you find the question as much as the response. The friction is reproducibility — your best sessions are hard to replicate because the magic was in the exchange, not the prompt.",
    strength: "You get genuinely good output because you treat the process like a conversation rather than a transaction. You're comfortable not knowing the answer at the start, which means the AI can help you find the question as much as the response. The friction is reproducibility — your best sessions are hard to replicate because the magic was in the exchange, not the prompt.",
    friction: 'Sessions are long and hard to replicate.',
    workOns: [
      "After a session that works, reverse-engineer the prompt that would have got you there in one shot. Build a personal library.",
      "Set a turn limit. Two exchanges maximum before you have to commit to a direction. Forces earlier clarity.",
      "Try starting with a stronger hypothesis. You'll still iterate, but you'll get to the good part faster."
    ],
    traits: ['Iterative', 'Intuitive', 'Conversational'],
    idealProfile: { Director: 2, Collaborator: 8, Delegator: 3, Explorer: 4, Sceptic: 2, Hacker: 2 }
  },
  Delegator: {
    color: '#FF6B6B',
    description: "You understand the core promise of AI better than most — it should just work. Your instinct to stay outcome-focused rather than process-obsessed is correct. The friction is that you've plateaued. One-line prompts have a ceiling, and you've probably hit it without realising because the outputs are good enough to use but rarely exceptional.",
    strength: "You understand the core promise of AI better than most — it should just work. Your instinct to stay outcome-focused rather than process-obsessed is correct. The friction is that you've plateaued. One-line prompts have a ceiling, and you've probably hit it without realising because the outputs are good enough to use but rarely exceptional.",
    friction: 'High miss rate, low learning curve.',
    workOns: [
      "When it misses, add one constraint before re-trying rather than resubmitting the same prompt. Identify what was wrong — tone, length, angle — and name it.",
      "Experiment with role-framing. 'Write this as a strategist presenting to a sceptical board' changes the output more than most people expect.",
      "Save three prompts that worked well this month. Review what they had in common. You have a style — make it legible to yourself."
    ],
    traits: ['Outcome-led', 'Spontaneous', 'Trust-high'],
    idealProfile: { Director: 1, Collaborator: 3, Delegator: 8, Explorer: 3, Sceptic: 1, Hacker: 2 }
  },
  Explorer: {
    color: '#A78BFA',
    description: "You find things others don't. Your tolerance for ambiguous output means you catch unexpected angles, reframes, and connections that more directive prompters filter out before they ever appear. The friction is operationalising what you find — your outputs are often interesting but hard to ship.",
    strength: "You find things others don't. Your tolerance for ambiguous output means you catch unexpected angles, reframes, and connections that more directive prompters filter out before they ever appear. The friction is operationalising what you find — your outputs are often interesting but hard to ship.",
    friction: 'Hard to operationalise outputs.',
    workOns: [
      "When you find something genuinely useful, immediately tighten the prompt and run it again deliberately. Separate exploration mode from production mode.",
      "Document the prompts that produced surprising results, not just the outputs. The framing is the reusable asset.",
      "Try one fully structured prompt per day. The constraint shows you what you're leaving behind by always going loose."
    ],
    traits: ['Intuitive', 'Spontaneous', 'Experimental', 'Exploratory'],
    idealProfile: { Director: 1, Collaborator: 4, Delegator: 2, Explorer: 8, Sceptic: 2, Hacker: 4 }
  },
  Sceptic: {
    color: '#60A5FA',
    description: "Your instinct to verify is correct and increasingly rare. You catch errors others ship, and you're building accurate mental models of where AI actually fails rather than where people assume it does. The friction is efficiency — you're doing parallel work, running AI alongside your own process rather than instead of it, which means the time saving stays minimal.",
    strength: "Your instinct to verify is correct and increasingly rare. You catch errors others ship, and you're building accurate mental models of where AI actually fails rather than where people assume it does. The friction is efficiency — you're doing parallel work, running AI alongside your own process rather than instead of it, which means the time saving stays minimal.",
    friction: "You're doing double the work.",
    workOns: [
      "Use AI explicitly for first drafts you expect to rewrite. Removes the trust problem by design — you're not relying on it, you're using it to break the blank page.",
      "Track your corrections for two weeks. Categorise them: factual errors, tone issues, structural problems. You'll find a pattern that tells you exactly where to trust it and where not to.",
      "Try one session where you don't verify the output before using it. Low stakes context only. The discomfort is informative."
    ],
    traits: ['Methodical', 'Verification-led', 'Exploratory'],
    idealProfile: { Director: 4, Collaborator: 2, Delegator: 1, Explorer: 2, Sceptic: 8, Hacker: 3 }
  },
  Hacker: {
    color: '#A3E635',
    description: "Your ceiling is the highest of any type. You understand the system at a level most users never reach and you're genuinely curious about failure modes rather than just annoyed by them. The friction is that most of what you discover stays with you — your experiments are non-transferable, your best findings undocumented.",
    strength: "Your ceiling is the highest of any type. You understand the system at a level most users never reach and you're genuinely curious about failure modes rather than just annoyed by them. The friction is that most of what you discover stays with you — your experiments are non-transferable, your best findings undocumented.",
    friction: 'Outputs are often non-transferable.',
    workOns: [
      "Document what works. Your experiments have reuse value you're consistently leaving behind. Even rough notes beat nothing.",
      "Translate one unconventional technique into a clean, reusable prompt format someone else could run. The constraint of making it legible will sharpen it.",
      "Apply the same curiosity to optimisation as you do to edge cases. How fast can you get to a great output? That's a constraint worth hacking against."
    ],
    traits: ['Experimental', 'Exploratory', 'Boundary-testing'],
    idealProfile: { Director: 2, Collaborator: 3, Delegator: 1, Explorer: 5, Sceptic: 3, Hacker: 8 }
  }
};

export const allTraits: Trait[] = [
  'Structured',
  'Methodical',
  'Outcome-led',
  'Iterative',
  'Intuitive',
  'Conversational',
  'Spontaneous',
  'Trust-high',
  'Experimental',
  'Exploratory',
  'Verification-led',
  'Boundary-testing'
];
