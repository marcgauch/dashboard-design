const MESSAGES_FROM_HPBAXTER = [
  'transforming the vibes',
  'cutting the hits',
  'getting into the place and making it real as it shouts',
  'kicking back',
  'coming down on the floor like a maniac',
];

const MESSAGES_FROM_CHATGPT = [
  'calling a friend',
  'reading a book',
  'going for a walk',
  'watching a movie',
  'listening to music',
  'cooking a meal',
  'taking a nap',
  'writing in a journal',
  'doing some exercise',
  'meditating',
  'learning a new skill',
  'taking a hot bath',
  'practicing a hobby',
  'cleaning the house',
  'organizing its closet',
  'planning a vacation',
  'starting a project',
  'visiting a museum',
  'attending a concert',
  'volunteering for a cause',
];

const MESSAGES_FROM_MARC = [
  'placing flowers',
  'feeding the cats',
  'doing the taxes',
  'cutting the hits',
];

export const MESSAGES = [
  ...MESSAGES_FROM_HPBAXTER,
  ...MESSAGES_FROM_CHATGPT,
  ...MESSAGES_FROM_MARC,
];

export const pickRandomMessage = () => MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
