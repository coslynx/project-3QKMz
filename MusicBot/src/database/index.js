```javascript
const mongoose = require('mongoose');
const User = require('./user');
const Playlists = require('./playlists');
const Settings = require('./settings');

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    const postgresURI = process.env.POSTGRES_URI;

    if (mongoURI) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB!');
    } else if (postgresURI) {
      // Implement PostgreSQL connection logic here
      console.log('Connected to PostgreSQL!');
    } else {
      console.log('No database URI found. Skipping database connection.');
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

module.exports = {
  connectToDatabase,
  User,
  Playlists,
  Settings,
};
```