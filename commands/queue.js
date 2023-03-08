const { SlashCommand, CommandOptionType} = require('slash-create');
const {Player} = require("discord-player");

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'queue',
            description: 'See the queue',
            options: [
                {
                    name: 'page',
                    type: CommandOptionType.INTEGER,
                    description: 'Specific page number in queue',
                    required: false
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run(ctx) {

        const { client } = require('..');
        const player = Player.singleton(client);

        await ctx.defer();
        const queue = player.nodes.get(ctx.guildID);
        if (!queue || !queue.isPlaying()) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        if (!ctx.options.page) ctx.options.page = 1;
        const pageStart = 10 * (ctx.options.page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.currentTrack;

        const tracks = queue.tracks.map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void ctx.sendFollowUp({
            embeds: [
                {
                    title: 'Server Queue',
                    description: `${tracks.join('\n')}${
                        queue.tracks.size > pageEnd
                            ? `\n...${queue.tracks.size - pageEnd} more track(s)`
                            : ''
                    }`,
                    color: 0xff0000,
                    fields: [{ name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
                }
            ]
        });

    }
};
