```javascript
const { Client, Intents } = require('discord.js');
const { token } = require('../../.env');
const { handleCommand } = require('../commands');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Check if the message starts with the command prefix
  const prefix = process.env.PREFIX || '/';
  if (!message.content.startsWith(prefix)) return;

  // Extract the command and arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Execute the corresponding command handler
  try {
    await handleCommand(command, args, message);
  } catch (error) {
    console.error(error);
    // Handle command execution errors gracefully
    message.channel.send('An error occurred while processing your command.');
  }
});

client.login(token);
```