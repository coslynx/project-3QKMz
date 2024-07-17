```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show the current music queue')
    .addSubcommand(subcommand =>
      subcommand
        .setName('show')
        .setDescription('Show the current music queue')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a track from the queue')
        .addIntegerOption(option =>
          option
            .setName('index')
            .setDescription('The index of the track to remove')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('shuffle')
        .setDescription('Shuffle the music queue')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('clear')
        .setDescription('Clear the music queue')
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const queue = interaction.client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({ content: 'No music is playing!', ephemeral: true });
    }

    switch (subcommand) {
      case 'show': {
        if (queue.tracks.length === 0) {
          return interaction.reply({ content: 'The queue is empty!', ephemeral: true });
        }

        const currentTrack = queue.current;
        const tracks = queue.tracks.map((track, i) => `${i + 1}. ${track.title}`).join('\n');

        return interaction.reply({
          content: `**Now playing:** ${currentTrack.title}\n\n**Queue:**\n${tracks}`,
          ephemeral: true,
        });
      }
      case 'remove': {
        const index = interaction.options.getInteger('index');

        if (index < 1 || index > queue.tracks.length) {
          return interaction.reply({ content: 'Invalid track index!', ephemeral: true });
        }

        const track = queue.tracks.splice(index - 1, 1)[0];
        await queue.update();

        return interaction.reply({
          content: `Removed **${track.title}** from the queue.`,
          ephemeral: true,
        });
      }
      case 'shuffle': {
        queue.shuffle();
        return interaction.reply({ content: 'Queue shuffled!', ephemeral: true });
      }
      case 'clear': {
        queue.clear();
        return interaction.reply({ content: 'Queue cleared!', ephemeral: true });
      }
      default: {
        return interaction.reply({ content: 'Invalid subcommand!', ephemeral: true });
      }
    }
  },
};
```