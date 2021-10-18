const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('epic')
        .setDescription('Replies with epic!'),
    async execute(interaction){
        await interaction.reply('Epic indeed!');    
    },
};