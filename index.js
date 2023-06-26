const dotenv = require('dotenv');
const path = require('path');
const { SlashCreator, GatewayServer } = require('slash-create');

const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { registerPlayerEvents } = require('./events');
const { generateDocs } = require('./docs');
const { YouTubeExtractor } = require('@discord-player/extractor');

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const player = Player.singleton(client);
registerPlayerEvents(player);
player.extractors.register(YouTubeExtractor, {});

const creator = new SlashCreator({
    applicationID: process.env.DISCORD_CLIENT_ID,
    token: process.env.DISCORD_CLIENT_TOKEN,
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    console.log('Generating docs...');
    generateDocs(creator.commands);
});

creator
    .withServer(
        new GatewayServer(
            (handler) => client.ws.on('INTERACTION_CREATE', handler)
        )
    )
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .syncCommands();

client.login(process.env.DISCORD_CLIENT_TOKEN);

module.exports = {
    client,
    creator
};
