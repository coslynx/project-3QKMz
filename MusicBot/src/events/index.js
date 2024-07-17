```javascript
const { Client, Intents } = require('discord.js');
const { token } = require('../config.json');
const ready = require('./ready');
const messageCreate = require('./messageCreate');
const voiceStateUpdate = require('./voiceStateUpdate');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', ready);
client.on('messageCreate', messageCreate);
client.on('voiceStateUpdate', voiceStateUpdate);

client.login(process.env.DISCORD_TOKEN);
```