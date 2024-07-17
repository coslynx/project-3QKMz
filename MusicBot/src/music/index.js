```javascript
const { joinVoiceChannel } = require('./joinVoiceChannel');
const { playMusic } = require('./playMusic');
const { addToQueue } = require('./addToQueue');
const { skipTrack } = require('./skipTrack');
const { stopMusic } = require('./stopMusic');
const { setVolume } = require('./setVolume');
const { getLyrics } = require('./getLyrics');

const queue = [];
let currentTrack = null;
let dispatcher = null;
let connection = null;
let volume = 1;

module.exports = {
  queue,
  currentTrack,
  dispatcher,
  connection,
  volume,

  joinVoiceChannel,
  playMusic,
  addToQueue,
  skipTrack,
  stopMusic,
  setVolume,
  getLyrics,
};

```