```javascript
const { Client, VoiceConnection, VoiceChannel } = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

module.exports = async (client, queue) => {
  try {
    if (!queue || !queue.connection || !queue.current) {
      return client.channels.cache.get(queue.textChannel).send('There is no music playing.');
    }

    const connection = queue.connection;
    connection.dispatcher.end();
    
    queue.current = queue.tracks.shift();
    
    if (queue.current) {
      client.channels.cache.get(queue.textChannel).send(`Skipped to the next track: ${queue.current.title}`);
      const stream = ytdl(queue.current.url, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);
      dispatcher.on('finish', () => {
        skipTrack(client, queue);
      });
      dispatcher.on('error', (err) => {
        client.channels.cache.get(queue.textChannel).send('There was an error playing the music.');
        console.error(err);
      });
    } else {
      client.channels.cache.get(queue.textChannel).send('The queue is now empty.');
      connection.disconnect();
    }
  } catch (err) {
    client.channels.cache.get(queue.textChannel).send('There was an error skipping the track.');
    console.error(err);
  }
};
```