const { SlashCommand, CommandOptionType } = require('slash-create');
const { Player} = require('discord-player');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'play',
            description: 'Play a song from youtube',
            options: [
                {
                    name: 'query',
                    type: CommandOptionType.STRING,
                    description: 'The song you want to play',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');
        const player = Player.singleton(client);

        await ctx.defer();

        const guild = client.guilds.cache.get(ctx.guildID);
        const channel = guild.channels.cache.get(ctx.channelID);
        const query = ctx.options.query;

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: ctx
                }
            });

            return ctx.sendFollowUp(`**${track.title}** enqueued!`);
        } catch (e) {
            // let's return error if something failed
            return ctx.sendFollowUp(`Something went wrong: ${e}`);
        }
    }
};
