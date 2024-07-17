```javascript
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { joinVoiceChannel, playMusic, addToQueue, skipTrack, stopMusic, setVolume, getLyrics } = require('./music');
const { handleCommand } = require('./commands');
const { connectToDatabase } = require('./database');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  connectToDatabase();
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prefix = process.env.COMMAND_PREFIX || '/';

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    await handleCommand(command, args, message);
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while executing the command.');
  }
});

client.login(token);
```