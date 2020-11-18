module.exports = {
    name: 'check_primogems',
    description: 'Check your amount of Primogems',
    usage: 'PREFIX + GEMS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
    
        try {
            message.channel.send(`<@${sender.id}>\n${userData.primogems} Gems`);
        } catch (err) { console.log(err) }
	},
}