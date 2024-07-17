```javascript
const {  VoiceConnectionStatus  } = require("discord.js");

module.exports = async (client, message) => {
  const queue = client.player.getQueue(message.guild.id);

  if (!queue) {
    return message.reply("There is no music playing in this server!");
  }

  try {
    queue.destroy();
    await queue.connection.disconnect();
    message.reply("Stopped the music!");
  } catch (error) {
    console.error("Error stopping music:", error);
    message.reply("Something went wrong stopping the music. Please try again!");
  }
};
```