module.exports = {
    name: 'multi_pull',
    description: 'Make a multi pull',
    usage: 'PREFIX + MULTI',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const { generalBanner, assignItem } = require('../../functions.js');
        const constants = require('../../constants.js');

        try {
            if (userData) {
                if (userData.primogems >= 1600) {
                    var reward = [];
                    let ctr;
                    var msg;
                    for (ctr = 0; ctr < 10; ctr++) {
                        const [tempReward, rarity] = generalBanner(userData.pityCounter4star, userData.pityCounter5star);
                        msg = `\``;
                        for (var i = 0; i < rarity; i++)
                            msg += '⭐';
                        msg += ` ${tempReward}\``;
                        reward.push(msg);

                        userData = assignItem(userData, tempReward);
                        if (constants.generalBanner4Star.includes(tempReward))
                            userData.pityCounter4star = 0;
                        if (constants.generalBanner5Star.includes(tempReward))
                        userData.pityCounter5star = 0;
                        userData.pityCounter4star++;
                        userData.pityCounter5star++;
                    }
                    userData.primogems -= 1600;
                    message.channel.send(`<@${sender.id}>\n\n${reward.sort().reverse().join("\n")}`);    
                    message.channel.send(`https://media1.tenor.com/images/498f8e57fc696aea93ef7b2cd4068197/tenor.gif`);    
                }
                else {
                    message.channel.send(`<@${sender.id}> quá nghèo nên không đủ Gems`);
                }
            }
            else {
                message.channel.send(`<@${sender.id}> quá nghèo nên không đủ Gems`)
            }
            return userData;
        } catch (err) { console.log(err) }
	},
}