const { ApplicationCommandOptionType } = require('discord.js');
const { useMainPlayer } = require('discord-player');

const data = {
    name: 'play',
    description: 'Play a song from youtube',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'The song you want to play',
            required: true
        }
    ],
};

async function run({interaction}) {

    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;
    const query = interaction.options.getString('query', true);

    await interaction.deferReply();

    try {
        const {track} = await player.play(channel, query, {
            nodeOptions: {
                metadata: interaction
            }
        });

        return interaction.editReply(`**${track.title}** enqueued!`);
    } catch (e) {
        // let's return error if something failed
        return interaction.editReply(`Something went wrong: ${e}`);
    }
}


module.exports = { data, run };
