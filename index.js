const dotenv = require('dotenv');
const path = require('path');
const { CommandKit } = require('commandkit');
const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { registerPlayerEvents } = require('./events');

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const player = new Player(client);
registerPlayerEvents(player);
player.extractors.loadDefault((ext) => ext == "YouTubeExtractor");

const commandKit = new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands')
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_CLIENT_TOKEN);

module.exports = {
    client,
    commandKit
};
