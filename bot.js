const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.data.name, command);  
}

bot.once('ready', c => {
    console.log(`Login successful - ${c.user.tag}`);
});

bot.on('interactionCreate', async interaction =>{
    if(!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'Error!', ephemeral: true});
    }

});

bot.login(token);
