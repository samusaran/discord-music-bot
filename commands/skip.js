const { useMainPlayer } = require('discord-player');

module.exports = {
    data: {
        name: 'skip',
        description: 'Skip to the current song',

        guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    },


    run: async function ({interaction}) {

        // const { client } = require('..');
        // const player = Player.singleton(client);
        //
        // await interaction.deferReply();
        // const queue = player.nodes.get(ctx.guildID);
        // if (!queue || !queue.isPlaying()) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        // const currentTrack = queue.currentTrack;
        // const success = queue.node.skip();
        // return void ctx.sendFollowUp({
        //     content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
        // });

    }
};
