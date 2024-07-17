```javascript
const { Client, Intents } = require('discord.js');
const { genius } = require('genius-lyrics-api');
const lyricsFinder = require('lyrics-finder');
const chalk = require('chalk');

const getLyrics = async (song) => {
  try {
    // Extract song title and artist
    const [title, artist] = song.split(' - ');

    // Attempt to get lyrics using Genius API
    const geniusLyrics = await genius.lyrics(title, artist);
    if (geniusLyrics) {
      return geniusLyrics;
    }

    // Attempt to get lyrics using lyrics-finder
    const lyricsFinderLyrics = await lyricsFinder(title, artist);
    if (lyricsFinderLyrics) {
      return lyricsFinderLyrics;
    }

    // If no lyrics found, throw an error
    throw new Error('No lyrics found for this song.');

  } catch (error) {
    console.error(chalk.red(`Error retrieving lyrics: ${error.message}`));
    return 'No lyrics found for this song.';
  }
};

module.exports = { getLyrics };
```