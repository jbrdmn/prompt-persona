import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    section: 1,
    question: "You need AI for something work-related you haven't tried before. First move?",
    answers: [
      { text: "Research how others have prompted for this", persona: "Director", icon: "book-open" },
      { text: "Open it and start typing", persona: "Delegator", icon: "zap" },
      { text: "Describe the situation and see where it goes", persona: "Collaborator", icon: "message-circle" },
      { text: "Give it a vague brief and see what it assumes", persona: "Explorer", icon: "shuffle" },
      { text: "Check whether AI is reliable for this first", persona: "Sceptic", icon: "search" },
      { text: "Test what it will and won't do", persona: "Hacker", icon: "terminal" }
    ]
  },
  {
    id: 2,
    section: 1,
    question: "How long is your typical first prompt?",
    answers: [
      { text: "Long — context, constraints, format, examples", persona: "Director", icon: "clipboard-list" },
      { text: "One or two sentences at most", persona: "Delegator", icon: "zap" },
      { text: "Grows as I type — I think out loud", persona: "Collaborator", icon: "message-circle" },
      { text: "Short and vague on purpose", persona: "Explorer", icon: "shuffle" },
      { text: "Enough to get something I can evaluate", persona: "Sceptic", icon: "check-circle" },
      { text: "Minimal — I'm testing the system", persona: "Hacker", icon: "terminal" }
    ]
  },
  {
    id: 3,
    section: 1,
    question: "20 minutes, real problem. How does AI fit in?",
    answers: [
      { text: "Brief it properly upfront, 20 mins is enough", persona: "Director", icon: "clock" },
      { text: "One prompt, take what comes, adapt it", persona: "Delegator", icon: "fast-forward" },
      { text: "Think out loud with it to get unstuck", persona: "Collaborator", icon: "message-square" },
      { text: "Throw the problem at it raw", persona: "Explorer", icon: "target" },
      { text: "Probably skip it — not enough time to verify", persona: "Sceptic", icon: "shield" },
      { text: "Use the constraint to try something unconventional", persona: "Hacker", icon: "zap-off" }
    ]
  },
  {
    id: 4,
    section: 1,
    question: "How do you honestly describe your AI use to someone else?",
    answers: [
      { text: "Detailed prompts, consistent results", persona: "Director", icon: "file-text" },
      { text: "I just ask it things, it usually works", persona: "Delegator", icon: "thumbs-up" },
      { text: "I talk it through rather than one-shot it", persona: "Collaborator", icon: "users" },
      { text: "I use it to find what I wouldn't think of", persona: "Explorer", icon: "lightbulb" },
      { text: "Carefully — I always check the output", persona: "Sceptic", icon: "eye" },
      { text: "Differently to most people", persona: "Hacker", icon: "cpu" }
    ]
  },
  {
    id: 5,
    section: 1,
    question: "What does your prompt history look like?",
    answers: [
      { text: "Long, structured, consistent patterns", persona: "Director", icon: "align-left" },
      { text: "Short, varied, no real pattern", persona: "Delegator", icon: "list" },
      { text: "Long threads, rarely one-shot", persona: "Collaborator", icon: "git-commit" },
      { text: "Experimental, hard to explain to others", persona: "Explorer", icon: "wind" },
      { text: "Cautious and specific, followed by verification", persona: "Sceptic", icon: "file-search" },
      { text: "A mix of normal use and things I'd rather not explain", persona: "Hacker", icon: "lock" }
    ]
  },
  {
    id: 6,
    section: 2,
    question: "The output is completely wrong. Immediate move?",
    answers: [
      { text: "Rewrite the prompt with more detail", persona: "Director", icon: "file-edit" },
      { text: "Try the same prompt again", persona: "Delegator", icon: "refresh-cw" },
      { text: "Paste it back and say 'not like this'", persona: "Collaborator", icon: "reply" },
      { text: "Keep it — wrong can be interesting", persona: "Explorer", icon: "compass" },
      { text: "Note it and rewrite it myself", persona: "Sceptic", icon: "alert-circle" },
      { text: "Probe why it went wrong first", persona: "Hacker", icon: "activity" }
    ]
  },
  {
    id: 7,
    section: 2,
    question: "You get a genuinely surprising, useful output. What happens next?",
    answers: [
      { text: "Reverse-engineer the prompt to replicate it", persona: "Director", icon: "settings" },
      { text: "Screenshot it and move on", persona: "Delegator", icon: "camera" },
      { text: "Keep the conversation going", persona: "Collaborator", icon: "arrow-right" },
      { text: "Go further off-piste deliberately", persona: "Explorer", icon: "rocket" },
      { text: "Fact-check it before using it", persona: "Sceptic", icon: "shield-check" },
      { text: "Try to break it and test reliability", persona: "Hacker", icon: "bug" }
    ]
  },
  {
    id: 8,
    section: 2,
    question: "Halfway through, the AI goes in the wrong direction. You:",
    answers: [
      { text: "Stop, restate the full brief, restart", persona: "Director", icon: "clipboard-list" },
      { text: "Accept it and adapt your own approach", persona: "Delegator", icon: "thumbs-up" },
      { text: "Course-correct conversationally", persona: "Collaborator", icon: "message-circle" },
      { text: "Follow the deviation and see where it ends", persona: "Explorer", icon: "shuffle" },
      { text: "Stop and re-evaluate before continuing", persona: "Sceptic", icon: "minus-circle" },
      { text: "Let it run — the failure mode is useful", persona: "Hacker", icon: "git-branch" }
    ]
  },
  {
    id: 9,
    section: 2,
    question: "AI gets something noticeably wrong. How do you feel?",
    answers: [
      { text: "Frustrated — better prompting should prevent it", persona: "Director", icon: "frown" },
      { text: "Mildly annoyed, wanted it to just work", persona: "Delegator", icon: "meh" },
      { text: "Fine — iteration is part of the process", persona: "Collaborator", icon: "smile" },
      { text: "Indifferent — wrong is sometimes more useful", persona: "Explorer", icon: "sparkles" },
      { text: "Unsurprised — this is why I verify", persona: "Sceptic", icon: "minus-circle" },
      { text: "Interested — I want to understand why", persona: "Hacker", icon: "activity" }
    ]
  },
  {
    id: 10,
    section: 2,
    question: "Correct output but flat and generic. What do you do?",
    answers: [
      { text: "Add a style brief and re-run it", persona: "Director", icon: "file-edit" },
      { text: "Edit it myself — faster than re-prompting", persona: "Delegator", icon: "scissors" },
      { text: "Show it examples and ask it to try again", persona: "Collaborator", icon: "reply" },
      { text: "Ask for three wildly different versions", persona: "Explorer", icon: "rocket" },
      { text: "Accept it — generic and correct is usable", persona: "Sceptic", icon: "check-circle" },
      { text: "Add a strange constraint to force it off default", persona: "Hacker", icon: "code" }
    ]
  },
  {
    id: 11,
    section: 3,
    question: "What is AI genuinely most useful for?",
    answers: [
      { text: "Executing tasks reliably when briefed well", persona: "Director", icon: "clipboard-list" },
      { text: "A good enough first pass without much effort", persona: "Delegator", icon: "zap" },
      { text: "Thinking through problems not yet fully formed", persona: "Collaborator", icon: "message-circle" },
      { text: "Finding angles you wouldn't reach alone", persona: "Explorer", icon: "compass" },
      { text: "Breaking the blank page on things you'd verify anyway", persona: "Sceptic", icon: "shield" },
      { text: "Understanding the edges of what's possible", persona: "Hacker", icon: "terminal" }
    ]
  },
  {
    id: 12,
    section: 3,
    question: "Where do most people go wrong with AI?",
    answers: [
      { text: "Not enough context or structure upfront", persona: "Director", icon: "align-left" },
      { text: "Overthinking the prompt instead of just trying", persona: "Delegator", icon: "fast-forward" },
      { text: "Treating it like a search engine", persona: "Collaborator", icon: "search" },
      { text: "Only using it for safe, obvious tasks", persona: "Explorer", icon: "shuffle" },
      { text: "Trusting the output without checking it", persona: "Sceptic", icon: "eye" },
      { text: "Never pushing past the default behaviour", persona: "Hacker", icon: "git-branch" }
    ]
  },
  {
    id: 13,
    section: 3,
    question: "How much do you trust AI output by default?",
    answers: [
      { text: "Moderately — structure yes, specific content less so", persona: "Director", icon: "settings" },
      { text: "Highly — if it sounds right it probably is", persona: "Delegator", icon: "thumbs-up" },
      { text: "Trust builds through the conversation", persona: "Collaborator", icon: "message-square" },
      { text: "I don't think about trust — usefulness matters more", persona: "Explorer", icon: "lightbulb" },
      { text: "Low — trust is earned per task", persona: "Sceptic", icon: "shield-check" },
      { text: "I don't trust or distrust it — it's a system to understand", persona: "Hacker", icon: "cpu" }
    ]
  },
  {
    id: 14,
    section: 3,
    question: "What's AI's biggest actual limitation?",
    answers: [
      { text: "Inconsistency — same prompt, different output", persona: "Director", icon: "refresh-cw" },
      { text: "Still needs too much hand-holding", persona: "Delegator", icon: "meh" },
      { text: "Can't sustain real context over long exchanges", persona: "Collaborator", icon: "git-commit" },
      { text: "Defaults to expected answers, rarely surprises", persona: "Explorer", icon: "wind" },
      { text: "Fabricates confidently — errors are hard to spot", persona: "Sceptic", icon: "alert-circle" },
      { text: "Guardrails are arbitrary and limit what's possible", persona: "Hacker", icon: "lock" }
    ]
  },
  {
    id: 15,
    section: 3,
    question: "How will your AI use change in the next year?",
    answers: [
      { text: "More systematised — better prompts, consistent results", persona: "Director", icon: "file-text" },
      { text: "Probably similar — it works well enough", persona: "Delegator", icon: "list" },
      { text: "Deeper — better instincts for when to use it", persona: "Collaborator", icon: "users" },
      { text: "More experimental — uses most people haven't tried", persona: "Explorer", icon: "rocket" },
      { text: "More targeted — I'll know exactly what to trust it with", persona: "Sceptic", icon: "file-search" },
      { text: "Significantly different — approaches that don't exist yet", persona: "Hacker", icon: "bug" }
    ]
  }
];
