const { SlashCommand } = require('slash-create');
const { Player } = require('discord-player');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'stop',
            description: 'Stop the player',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run(ctx) {
        const { client } = require('..');
        const player = Player.singleton(client);

        await ctx.defer();
        const queue = player.nodes.get(ctx.guildID);
        if (!queue || !queue.isPlaying()) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        queue.delete();
        await ctx.sendFollowUp({ content: '🛑 | Stopped the player!' });
    }
};
