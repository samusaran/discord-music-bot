const { SlashCommand } = require('slash-create');
const {Player} = require("discord-player");
const {client} = require("../index");

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'np',
            description: 'See what\'s currently being played',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');
        const player = Player.singleton(client);

        await ctx.defer();

        const queue = client.player.nodes.get(ctx.guildID);
        if (!queue || !queue.isPlaying())
            return await ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return await ctx.sendFollowUp({
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **${queue.currentTrack.title}**! (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                        }
                    ],
                    color: 0xffffff
                }
            ]
        });
    }
};
