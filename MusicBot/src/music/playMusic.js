```javascript
const {  ytdl  } = require('ytdl-core');
const {  joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus  } = require('@discordjs/voice');

module.exports = async (client, queue, guild, song) => {
  const connection = joinVoiceChannel({
    channelId: guild.members.cache.get(client.user.id).voice.channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
  });

  const player = createAudioPlayer();

  const stream = ytdl(song.url, { filter: 'audioonly' });
  const resource = createAudioResource(stream);

  player.play(resource);

  connection.subscribe(player);

  player.on(AudioPlayerStatus.Playing, () => {
    queue.current = song;
    client.channels.cache.get(guild.members.cache.get(client.user.id).voice.channel.id).send(`Now playing: **${song.title}**`);
  });

  player.on(AudioPlayerStatus.Idle, () => {
    queue.next();

    if (queue.queue.length > 0) {
      playMusic(client, queue, guild, queue.queue[0]);
    } else {
      connection.destroy();
    }
  });

  player.on('error', (error) => {
    console.error(`Error playing music: ${error}`);
    client.channels.cache.get(guild.members.cache.get(client.user.id).voice.channel.id).send(`An error occurred while playing music: ${error}`);
    queue.next();
  });
};
```