```javascript
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');

const addToQueue = async (client, message, track) => {
  const voiceChannel = message.member.voice.channel;
  const serverQueue = client.queue.get(message.guild.id);

  try {
    // If the track is a URL, use it directly. Otherwise, search for it on YouTube.
    if (track.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/)) {
      const videoInfo = await ytdl.getInfo(track);
      const song = {
        title: videoInfo.videoDetails.title,
        url: track,
      };
      // Add the song to the queue
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel,
          connection: null,
          songs: [],
          volume: 100,
          playing: true,
        };
        client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
          const connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          playMusic(client, message.guild);
        } catch (error) {
          console.error(`Could not join voice channel: ${error}`);
          client.queue.delete(message.guild.id);
          return message.channel.send('I cannot join your voice channel.');
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} has been added to the queue!`);
      }
    } else {
      const searchResults = await ytsr(track);
      const video = searchResults.items[0];

      if (!video) return message.channel.send('No results found.');

      const song = {
        title: video.title,
        url: video.url,
      };

      // Add the song to the queue
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel,
          connection: null,
          songs: [],
          volume: 100,
          playing: true,
        };
        client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
          const connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          playMusic(client, message.guild);
        } catch (error) {
          console.error(`Could not join voice channel: ${error}`);
          client.queue.delete(message.guild.id);
          return message.channel.send('I cannot join your voice channel.');
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} has been added to the queue!`);
      }
    }
  } catch (error) {
    console.error(error);
    return message.channel.send('An error occurred while adding the song to the queue.');
  }
};

module.exports = addToQueue;
```