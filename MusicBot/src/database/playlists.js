```javascript
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  tracks: {
    type: Array,
    default: [],
  },
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = {
  createPlaylist: async (name, owner, tracks) => {
    try {
      const playlist = new Playlist({
        name,
        owner,
        tracks,
      });
      await playlist.save();
      return playlist;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  },

  getPlaylist: async (playlistId) => {
    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return null;
      }
      return playlist;
    } catch (error) {
      console.error('Error getting playlist:', error);
      throw error;
    }
  },

  getPlaylistsByUser: async (userId) => {
    try {
      const playlists = await Playlist.find({ owner: userId });
      return playlists;
    } catch (error) {
      console.error('Error getting playlists by user:', error);
      throw error;
    }
  },

  updatePlaylist: async (playlistId, data) => {
    try {
      const playlist = await Playlist.findByIdAndUpdate(playlistId, data, { new: true });
      if (!playlist) {
        return null;
      }
      return playlist;
    } catch (error) {
      console.error('Error updating playlist:', error);
      throw error;
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      const playlist = await Playlist.findByIdAndDelete(playlistId);
      if (!playlist) {
        return null;
      }
      return playlist;
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw error;
    }
  },
};

```