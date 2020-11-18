module.exports = {
    name: 'check_resin',
    description: 'Check your amount of Resins',
    usage: 'PREFIX + RESINS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, resin) {
        const sender = message.author;
    
        try {
            message.channel.send(`<@${sender.id}>\n${resin}/200  Resin`);
        } catch (err) { console.log(err) }
	},
}