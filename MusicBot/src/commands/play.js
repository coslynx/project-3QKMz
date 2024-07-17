```javascript
const { SlashCommandBuilder } = require('discord.js');
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const { playMusic } = require('../music/playMusic');
const { addToQueue } = require('../music/addToQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music from YouTube')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('The song or playlist to play')
        .setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString('query');

    try {
      // Search for the video
      const searchResults = await ytsr(query);

      // Validate results and get the video URL
      if (searchResults.items.length === 0) {
        await interaction.reply('No results found.');
        return;
      }

      const video = searchResults.items[0];
      const url = video.url;

      // Add to queue
      const track = await addToQueue(interaction, url);

      // Start playback if queue is empty
      if (!interaction.client.player.isPlaying) {
        await playMusic(interaction, track);
      } else {
        await interaction.reply(`Added ${track.title} to the queue!`);
      }
    } catch (error) {
      console.error('Error playing music:', error);
      await interaction.reply('An error occurred while playing music. Please try again later.');
    }
  }
};

```