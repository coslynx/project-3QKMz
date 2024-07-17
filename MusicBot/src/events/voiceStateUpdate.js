```javascript
const { Client, Intents } = require('discord.js');
const { joinVoiceChannel } = require('../music/joinVoiceChannel');
const { playMusic } = require('../music/playMusic');

module.exports = {
  name: 'voiceStateUpdate',
  once: false,
  execute(oldState, newState) {
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    // If the user joins a voice channel
    if (newChannel && !oldChannel) {
      const member = newState.member;
      const guild = member.guild;
      const channel = member.voice.channel;

      // Check if the bot is already in a voice channel
      const botVoiceChannel = guild.me.voice.channel;
      if (botVoiceChannel) {
        // If the bot is in a different voice channel, leave it
        if (botVoiceChannel !== channel) {
          botVoiceChannel.leave();
        }
      } else {
        // If the bot is not in a voice channel, join the user's channel
        joinVoiceChannel(channel.id);
        playMusic();
      }
    }

    // If the user leaves a voice channel
    if (!newChannel && oldChannel) {
      const member = oldState.member;
      const guild = member.guild;
      const channel = oldState.channel;

      // Check if the bot is in the same voice channel as the user
      const botVoiceChannel = guild.me.voice.channel;
      if (botVoiceChannel && botVoiceChannel === channel) {
        // If the bot is in the same voice channel and the user is the last one to leave
        if (channel.members.size === 1) {
          // Leave the voice channel
          channel.leave();
        }
      }
    }
  },
};
```