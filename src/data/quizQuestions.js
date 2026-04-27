// Questions for quiz section
const quizQuestions = [
  {
    id: 1,
    questionIcon: "🤖",
    question: "Which of these is an example of AI?",
    type: "multiple",
    options: [
      "A phone suggesting the next word as you type",
      "A kettle that switches off when it boils",
      "A lift that opens when you press a button",
      "A street light that switches on at night",
    ],
    correctAnswer: "A phone suggesting the next word as you type",
    explanation:
      "The others all follow simple fixed rules, AI is different because it learns from patterns and improves overtime.",
  },
  {
    id: 2,
    questionIcon: "💊",
    question:
      "Sarah is 82 and lives in a care home. An app reminds staff when she needs her medication. What is the AI doing?",
    type: "multiple",
    options: [
      "Replacing the nurse",
      "Ignoring patient needs",
      "Helping staff remember important tasks",
      "Making decisions about Sarah's health",
    ],
    correctAnswer: "Helping staff remember important tasks",
    explanation:
      "AI can support care by providing reminders and flagging important tasks but human staff still make the final decisions.",
  },
  {
    id: 3,
    questionIcon: "🩺",
    question:
      "An AI system tells a carer that a resident seems fine and is low risk, but the carer feels something is not right. What should they do?",
    type: "multiple",
    options: [
      "Trust the AI because it has more data",
      "Use their professional judgement and raise the concern",
      "Ignore their instinct, the AI has already assessed it",
      "Wait and see what happens",
    ],
    correctAnswer: "Use their professional judgement and raise the concern",
    explanation:
      "AI can be confidently wrong. It should support, not replace, human judgement, especially in care where the stakes are high.",
  },
  {
    id: 4,
    questionIcon: "🏛️",
    question:
      "A resident uses an AI chatbot on a council website to ask about housing support. The chatbot gives incorrect advice. Who is responsible?",
    type: "multiple",
    options: [
      "No one is responsible",
      "The AI system itself",
      "The organisation using the AI system",
      "The resident who asked the question",
    ],
    correctAnswer: "The organisation using the AI system",
    explanation:
      "AI cannot be held legally responsible. The organisation that chose to deploy it is accountable for any harm it causes, which is why human oversight matters.",
  },
  {
    id: 5,
    questionIcon: "📺",
    question:
      "You watch a lot of crime shows on Netflix. The app starts suggesting similar shows. What is it doing?",
    type: "multiple",
    options: [
      "Using patterns in your viewing history",
      "Suggesting whatever is most popular right now",
      "Picking the highest rated shows in your country",
      "Showing you what your friends have been watching",
    ],
    correctAnswer: "Using patterns in your viewing history",
    explanation:
      "Netflix's AI studies what you watch, rewatch and skip, building a picture of your taste to suggest content you are likely to enjoy.",
  },
  {
    id: 6,
    questionIcon: "👟",
    question:
      "You mention trainers to a friend, and later that day you see trainer ads on TikTok. What is most likely happening?",
    type: "multiple",
    options: [
      "Your phone is secretly listening to everything you say",
      "AI is learning from your activity and interactions",
      "It is just a coincidence",
      "Your friend reported you to TikTok",
    ],
    correctAnswer: "AI is learning from your activity and interactions",
    explanation:
      "It feels like your phone is listening, but TikTok's AI is so good at building a picture of your interests from your browsing, searching and scrolling that it can predict what you want before you even search for it.",
  },
  {
    id: 7,
    questionIcon: "🎵",
    question:
      "You open Spotify, and it has made you a playlist you never asked for. How does it know what to put in it?",
    type: "multiple",
    options: [
      "It uses your star sign",
      "A human at Spotify made it for you",
      "It learned from what you skip and what you replay",
      "It picks songs completely at random",
    ],
    correctAnswer: "It learned from what you skip and what you replay",
    explanation:
      "Spotify's AI pays attention to what you skip and replay, learning your taste over time to build playlists you are likely to enjoy.",
  },
  {
    id: 8,
    questionIcon: "🔁",
    question:
      "Apps like TikTok and Netflix use AI to show you content they think you may like. What could be a downside of this?",
    type: "multiple",
    options: [
      "You might discover too much new content and feel overwhelmed",
      "The apps will run out of suggestions eventually",
      "You could get stuck in a bubble and only ever see similar things",
      "The AI could share your watch history with other users",
    ],
    correctAnswer:
      "You could get stuck in a bubble and only ever see similar things",
    explanation:
      "When AI only shows you what it thinks you already like, you can end up in a 'filter bubble', missing out on things you never knew you'd enjoy.",
  },
  {
    id: 9,
    questionIcon: "⚖️",
    question:
      "An AI system is used to help shortlist candidates for jobs. It keeps selecting similar types of people. What could be the problem?",
    type: "multiple",
    options: [
      "The AI is working perfectly as intended",
      "The AI may have learned bias from past data",
      "The candidates are not qualified",
      "The computer is too slow",
    ],
    correctAnswer: "The AI may have learned bias from past data",
    explanation:
      "AI learns from historical data. If that data contains bias, the AI can repeat or even worsen those patterns, leading to unfair outcomes.",
  },
  {
    id: 10,
    questionIcon: "👩🏻‍🤝‍👩🏿",
    question:
      "A facial recognition system works well for some people but struggles to recognise others. What does this show?",
    type: "multiple",
    options: [
      "AI works equally well for everyone",
      "Some people are harder to recognise",
      "The AI may not have been trained on diverse data",
      "The system is broken and unusable",
    ],
    correctAnswer: "The AI may not have been trained on diverse data",
    explanation:
      "If AI is trained on limited or unbalanced data, it may work worse for some groups of people. That's why fair and diverse data is important.",
  },
];

export default quizQuestions;
