```javascript
const { VoiceConnection } = require('@discordjs/voice');

/**
 * Sets the volume of the music playback.
 *
 * @param {VoiceConnection} connection The voice connection.
 * @param {number} volume The volume level (0-200).
 */
const setVolume = (connection, volume) => {
  if (volume < 0 || volume > 200) {
    throw new Error('Invalid volume level. Volume must be between 0 and 200.');
  }

  connection.state.subscription.player.volume.setVolume(volume / 100);
};

module.exports = setVolume;
```