```javascript
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'errorHandling',
  execute(interaction, error) {
    console.error(error);

    const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle('Error!')
      .setDescription(`An error occurred: ${error.message}`);

    interaction.reply({ embeds: [embed] });
  },
};
```