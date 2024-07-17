```javascript
const { SlashCommandBuilder } = require('discord.js');
const { Genius } = require('genius-lyrics-api');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Get lyrics for the current song'),
  async execute(interaction) {
    const genius = new Genius.Client({
      accessToken: process.env.GENIUS_ACCESS_TOKEN,
    });

    try {
      const currentTrack = interaction.client.music.queue[0];
      const songTitle = currentTrack.title;
      const artist = currentTrack.artist;

      let lyrics = await genius.songs.search(songTitle, { artist });

      if (lyrics.hits.length === 0) {
        await interaction.reply('Lyrics not found.');
        return;
      }

      lyrics = lyrics.hits[0].result.lyrics;
      // Format and truncate lyrics if needed
      const formattedLyrics = lyrics.substring(0, 2000); // Limit to 2000 characters

      await interaction.reply(formattedLyrics);
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while fetching lyrics.');
    }
  },
};
```