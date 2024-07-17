```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  settings: {
    defaultVolume: { type: Number, default: 50 }, // Default volume level
    commandPrefix: { type: String, default: '/' }, // Command prefix
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

```