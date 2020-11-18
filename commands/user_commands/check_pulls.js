module.exports = {
    name: 'check_pulls',
    description: 'Check the number of Pulls you can make',
    usage: 'PREFIX + WISH',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
    
        try {
            message.channel.send(`<@${sender.id}> có ${Math.floor(userData.primogems/160)} Wish`);
        } catch (err) { console.log(err) }
	},
}