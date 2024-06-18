const { useQueue } = require('discord-player');

module.exports = {
    data: {
        name: 'stop',
        description: 'Stop the player',

        guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    },


    run: async function ({interaction}) {

        await interaction.deferReply();

        const queue = useQueue(interaction.guildId);
        if (!queue || !queue.isPlaying()) return void interaction.editReply({ content: '❌ | No music is being played!' });

        queue.node.stop();
        await interaction.editReply({ content: '🛑 | Stopped the player!' });
    }
};
