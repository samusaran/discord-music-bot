const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueryType } = require('discord-player');
const playdl = require("play-dl");

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'playnext',
            description: 'Add a song to the top of the queue',
            options: [
                {
                    name: 'query',
                    type: CommandOptionType.STRING,
                    description: 'The song you want to play next',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if(!queue.createStream) {
            queue.createStream = async (track, source, _queue) => {
                if (source === "youtube") {
                    return (await playdl.stream(track.url, process.env.COOKIES)).stream;
                }
            };
        }

        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });

        const query = ctx.options.query;
        const searchResult = await client.player
            .search(query, {
                requestedBy: ctx.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('he');
            });

        if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'No results were found!' });
        queue.insert(searchResult.tracks[0]);
        await ctx.sendFollowUp({ content: '⏱ | Loading your track...' });
    }
};
