module.exports = {
    name: 'whale_pull',
    description: 'Make a whale pull',
    usage: 'PREFIX + WHALE',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const { generalBanner, assignItem } = require('../../functions.js');
        const constants = require('../../constants.js');

        try {
            if (userData) {
                if (userData.primogems >= 14400) {
                    let ctr;
                    var msg = '';
                    var reward = {};
                    for (ctr = 0; ctr < 90; ctr++) {
                        const [tempReward, rarity] = generalBanner(userData.pityCounter4star, userData.pityCounter5star);
                        if (!reward[tempReward])
                            reward[tempReward] = {
                                quantity: 1,
                                rarity: rarity,
                            }
                        else {
                            reward[tempReward].quantity++;
                        }
                        userData = assignItem(userData, tempReward);
                        if (constants.generalBanner4Star.includes(tempReward))
                            userData.pityCounter4star = 0;
                        if (constants.generalBanner5Star.includes(tempReward))
                            userData.pityCounter5star = 0;
                        userData.pityCounter4star++;
                        userData.pityCounter5star++;
                    }
                    userData.primogems -= 14400;
                    var sortedReward = [];
                    Object.keys(reward).forEach((item) => {
                        sortedReward.push({
                            name: item,
                            quantity: reward[item].quantity,
                            rarity: reward[item].rarity,
                        });
                    });
                    sortedReward.sort((a, b) => {
                        if (a.rarity > b.rarity)
                            return -1;
                        else if (a.rarity < b.rarity)
                            return 1;
                        return 0;
                    })
                    sortedReward.forEach((item) => {
                        msg += `\``;
                        for (var i = 0; i < item.rarity; i++)
                            msg += '⭐';
                        msg += ` ${item.name} ${item.quantity}x\`\n`;    
                    })
                    message.channel.send(`<@${sender.id}>\n\n${msg}`);
                    message.channel.send(`https://media1.tenor.com/images/dc776f623e1079ad35af08a1899cbd19/tenor.gif`);
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