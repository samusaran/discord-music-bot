const { SlashCommand, CommandOptionType } = require('slash-create');
const { useMainPlayer } = require('discord-player');

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

        const player = useMainPlayer();
        const channel = ctx.member.voice.channel;
        const query = ctx.options.getString('query', true);

        await ctx.defer();

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
