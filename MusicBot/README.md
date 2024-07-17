# MusicBot - Discord Music Player

## Project Description

MusicBot is a Discord bot designed to play music within Discord servers. It provides features such as queue management, volume control, lyrics display, and integration with various music platforms like YouTube, Spotify, and SoundCloud.

## Prerequisites

* Node.js and npm (or yarn) installed on your system.
* A Discord bot token. (Create a Discord application at [https://discord.com/developers/applications](https://discord.com/developers/applications))
* A MongoDB or PostgreSQL database account (optional, if you want to use database features).

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/MusicBot.git
   cd MusicBot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   * Copy the `.env.example` file to `.env` and fill in the following variables:
      * **DISCORD_TOKEN:** Your Discord bot token.
      * **SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET:** (Optional) Your Spotify client ID and secret.
      * **SOUNDCLOUD_CLIENT_ID, SOUNDCLOUD_CLIENT_SECRET:** (Optional) Your SoundCloud client ID and secret.
      * **GENIUS_ACCESS_TOKEN:** (Optional) Your Genius API access token.
      * **MONGODB_URI:** (Optional) Your MongoDB connection URI if you are using MongoDB.
      * **POSTGRES_URI:** (Optional) Your PostgreSQL connection URI if you are using PostgreSQL.

4. **Start the bot:**
   ```bash
   npm start
   ```

## Using the Bot

* **Join a voice channel:** Use the command `/join` in a text channel to have the bot join your voice channel.
* **Play music:**
    * Use `/play [song name/URL]` to play a song.
    * Use `/play [artist name/playlist name]` to play a playlist.
    * The bot supports YouTube, Spotify, and SoundCloud (optional integrations).
* **Manage the queue:**
    * `/queue`: View the current queue.
    * `/remove [index]`: Remove a track from the queue.
    * `/shuffle`: Shuffle the queue.
    * `/clear`: Clear the entire queue.
* **Control volume:**
    * `/volume up`: Increase volume.
    * `/volume down`: Decrease volume.
    * `/volume [number]`: Set a specific volume level.
* **Display lyrics:** Use `/lyrics` to display the lyrics of the current song.
* **Other commands:**
    * `/leave`: Leave the current voice channel.
    * `/stop`: Stop music playback.
    * `/next`: Skip to the next track.
    * `/help`: View a list of available commands.

## Deployment

* **Heroku:**
    1. Create a Heroku app.
    2. Configure environment variables using the Heroku web interface or the Heroku CLI.
    3. Push your code to the Heroku remote repository.
    4. Run the `heroku open` command to open your Heroku app in the browser.
* **Docker:**
    1. Build a Docker image using the `docker build -t your-image-name .` command.
    2. Push the image to a Docker registry.
    3. Deploy the image to a container orchestration platform like Kubernetes or Docker Swarm.

## Contribution

* Fork the repository.
* Create a new branch for your feature or bug fix.
* Commit your changes.
* Push your branch to your fork.
* Submit a pull request.

## Troubleshooting

* **Error connecting to Discord:** Ensure you have a valid Discord bot token in your `.env` file.
* **Error playing music:** Check your internet connection and make sure the music platform you are using is working properly.
* **Error retrieving lyrics:** Ensure you have a valid Genius API access token in your `.env` file.
* **Error with database:** Verify your database credentials and connection URI in your `.env` file.

## Disclaimer

This README.md is a template and may need to be adjusted based on the specific implementation of the MusicBot project. 
