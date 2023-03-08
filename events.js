const { VoiceConnectionStatus } = require('@discordjs/voice');

module.exports.registerPlayerEvents = (player) => {

    player.events.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });

    player.events.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.events.on("playerStart", (queue, track) => {
        queue.metadata.send(`🎶 | Started playing: **${track.title}**`);
    });

    player.events.on("audioTrackAdd", (queue, track) => {
        console.log(`Track ${track.title} queued!`);
    });

    player.events.on("audioTracksAdd", (queue, track) => {
        queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
    });

    player.events.on("botDisconnect", (queue) => {
        queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
    });

    player.events.on("channelEmpty", (queue) => {
        queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
    });

    player.events.on("emptyQueue", (queue) => {
        queue.metadata.send("✅ | Queue finished!");
        console.log("Queue finished!");
    });

    player.on("debug", (message) => {
        console.log(message);
    });

    player.events.on("playerError", (queue, error, track) => {
        console.log(error);
    });
};
