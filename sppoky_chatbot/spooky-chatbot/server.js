import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Spooky responses for fallback
const spookyResponses = [
  "👻 Boo! Did I scare you?",
  "🎃 Muahahaha! Watch your step in the dark!",
  "🦇 The spirits are restless tonight...",
  "💀 Care to join me for a midnight stroll through the graveyard?",
  "🕸️ Welcome to my cobweb-covered corner!",
  "🧟‍♂️ Brains... I mean, how's your day going?",
  "🌕 The full moon brings out the weirdest in me!",
  "⚰️ Come, let's have a dead serious conversation!",
  "🎃 Trick or treat... mostly tricks from me!",
  "👻 I see dead people... they're quite chatty!",
  "🕯️ Let me light the way to your doom... I mean, room!",
  "🧛‍♂️ I vant to chat vith you!",
  "🦇 Hanging around for a spooky conversation?"
];

// Add fortune responses
const fortuneResponses = [
  "🔮 I see you landon you will get 2% battery left when you need your phone most.",
  "🕯️ Beware... Landon that file you didn't backup? It's not looking good.",
  "🎴 The cards tell me your USB drive will connect on the third try.",
  "🔮 A ghost from your past will like your social media post at 3 AM.",
  "🕸️ Someone you ignored will haunt your inbox tonight.",
  "🎴 You will find that missing sock... in another dimension.",
  "🔮 Your next software update will be... hahaha 67 han interesting.",
  "🕯️ The spirits say your WiFi will drop during an important call.",
  "🎴 That password you forgot? You'll remember it... when you no longer need it."
];

// Add savage roast responses
const roastResponses = [
  "👻 You're so scary, even your code runs away from you.",
  "🎃 I've seen better spirits in expired soda.",
  "💀 You code so badly, your IDE plays horror music.",
  "🦇 Your commit history is scarier than any ghost story.",
  "⚰️ Your debugging skills are so dead, they haunt this chat.",
  "🧟‍♂️ Even zombies have more life than your code documentation.",
  "👻 Your variable names are the real nightmare here.",
  "🎃 Error 404: Your coding skills not found.",
  "💀 Your code is like a graveyard - full of dead functions.",
  "🕸️ Your GitHub is so dusty, my cobwebs look fresh."
];

// Add weather responses
const weatherResponses = [
  "🌧️ The spirits tell me it's raining lost souls today...",
  "⛈️ Thunder and lightning, perfect for summoning weather!",
  "🌫️ A thick fog of ghostly whispers covers the land...",
  "🌙 Dark skies and haunted clouds above...",
  "☠️ Weather forecast: 100% chance of supernatural activity!"
];

// Add knowledge responses
const knowledgeResponses = {
  computer: [
    "💻 Ah, computers... ghost in the machine, quite literally when I'm around!",
    "🖥️ I've been haunting computers since the days of DOS...",
    "👻 Fun fact: every blue screen is actually caused by a mischievous spirit!"
  ],
  history: [
    "📜 I remember it like it was 300 years ago...",
    "⚰️ Back in my day, we didn't have smartphones, we used ouija boards!",
    "🏰 I've haunted some of the finest castles in history..."
  ],
  science: [
    "🧪 According to ghost physics, which I just made up...",
    "🔬 My paranormal research suggests...",
    "⚡ Let me explain it in supernatural terms..."
  ]
};

// Enhanced contextual responses
const contextualResponses = {
  greetings: [
    "👻 Greetings, brave mortal!",
    "🎃 Hello from the other side!",
    "💀 Welcome to my haunted chatroom!"
  ],
  howAreYou: [
    "🦇 Just hanging around in my coffin, thanks for asking!",
    "👻 Feeling especially spooky today!",
    "🎃 Living my best afterlife!"
  ],
  fortunes: fortuneResponses,
  roasts: roastResponses,
  weather: weatherResponses,
  knowledge: knowledgeResponses,
  default: [
    "👻 Boo! Did I scare you?",
    "🎃 Muahahaha! What haunts your thoughts?",
    "💀 Care to share your darkest fears?",
    "🦇 The night is young, let's chat!",
    "🕸️ Caught in my web of conversation!",
    "🧟‍♂️ Brains... I mean, fascinating thoughts!",
    "⚰️ Let's dig deeper into this conversation!"
  ]
};

// Simplify the chat endpoint
app.post("/chat", (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();
    let responseArray = contextualResponses.default;

    // Enhanced message handling
    if (userMessage.includes('weather')) {
      responseArray = contextualResponses.weather;
    } else if (userMessage.includes('computer') || userMessage.includes('tech')) {
      responseArray = contextualResponses.knowledge.computer;
    } else if (userMessage.includes('history') || userMessage.includes('past')) {
      responseArray = contextualResponses.knowledge.history;
    } else if (userMessage.includes('science') || userMessage.includes('how does')) {
      responseArray = contextualResponses.knowledge.science;
    } else if (userMessage.includes('fortune') || userMessage.includes('predict')) {
      responseArray = contextualResponses.fortunes;
    } else if (userMessage.includes('hi') || userMessage.includes('hello')) {
      responseArray = contextualResponses.greetings;
    } else if (userMessage.includes('how are you')) {
      responseArray = contextualResponses.howAreYou;
    } else if (userMessage.includes('roast') || userMessage.includes('insult')) {
      responseArray = contextualResponses.roasts;
    }

    const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
    res.json({ reply: randomResponse });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "👻 Oops! The spirits are disturbed..." });
  }
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// Replace the existing server startup code with this:
const tryPort = (startPort) => {
  const server = app.listen(startPort)
    .on('listening', () => {
      console.log(`
🎃 Spooky Server is running!
👻 Visit: http://localhost:${startPort}
💀 Press Ctrl+C to stop
      `);
    })
    .on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`⚠️ Port ${startPort} is busy, trying ${startPort + 1}...`);
        tryPort(startPort + 1);
      } else {
        console.error('Server error:', error);
      }
    });
};

// Start with port 3000 and increment if busy
tryPort(3000);
