const { useQueue} = require('discord-player');

module.exports = {
    data: {
        name: 'skip',
        description: 'Skip to the current song',

        guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    },


    run: async function ({interaction}) {

        await interaction.deferReply();

        const queue = useQueue(interaction.guildId);
        if (!queue || !queue.isPlaying()) return void interaction.editReply({ content: '❌ | No music is being played!' });

        const currentTrack= queue.currentTrack;
        const success= queue.node.skip();
        await interaction.editReply({
            content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
        });
    }
};
