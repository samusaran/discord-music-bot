const { EqualizerConfigurationPreset, useQueue} = require('discord-player');

module.exports = {
    data: {
        name: 'bassboost',
        description: 'BASSBOOST',

        guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    },


    run: async function ({interaction}) {

        await interaction.deferReply();

        const queue = useQueue(interaction.guildId);
        if (!queue || !queue.isPlaying()) return void interaction.editReply({ content: '❌ | No music is being played!' });

        queue.filters.equalizer.setEQ(EqualizerConfigurationPreset.FullBass);

        await interaction.editReply({
            content: `${this.container.client.dev.success} | **Equalizer** bass-boosted **`
        });
    }
};
