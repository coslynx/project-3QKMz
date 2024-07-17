```javascript
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = async (channel) => {
  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    // Send a message to the channel confirming joining
    await channel.send(`Joined voice channel: ${channel.name}`);

    // Return the connection object
    return connection;
  } catch (error) {
    // Handle errors
    console.error(`Error joining voice channel: ${error}`);
    await channel.send(`Error joining voice channel. Please check my permissions.`);
  }
};

```