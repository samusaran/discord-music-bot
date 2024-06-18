module.exports.registerPlayerEvents = (player) => {

    player.events.on('error', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });

    player.events.on('connectionError', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.events.on('playerStart', (queue, track) => {
        queue.metadata.channel.send(`🎶 | Started playing: **${track.title}**`);
    });

    player.events.on('audioTrackAdd', (queue, track) => {
        console.log(`Track ${track.title} queued!`);
    });

    player.events.on('audioTracksAdd', (queue, track) => {
        queue.metadata.channel.send(`🎶 | Track **${track.title}** queued!`);
    });

    player.events.on('botDisconnect', (queue) => {
        queue.metadata.channel.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
    });

    player.events.on('channelEmpty', (queue) => {
        queue.metadata.channel.send('❌ | Nobody is in the voice channel, leaving...');
    });

    player.events.on('emptyQueue', (queue) => {
        queue.metadata.channel.send('✅ | Queue finished!');
        console.log('Queue finished!');
    });

    player.on('debug', (message) => {
        console.log(message);
    });

    player.events.on('debug', (queue, message) => {
        console.log(message);
    });

    player.events.on('playerError', (queue, error) => {
        console.log(error);
    });
};
