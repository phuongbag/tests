module.exports = {
    name: 'claim_daily',
    description: 'Claim daily reward',
    usage: 'PREFIX + DAILY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, multiplier) {
        const sender = message.author;
        const dailyReward = 800 * multiplier;
        const dailyCooldown = 8.64e+7;

        try {
            if (!userData)
                return userData;
            if (!userData.lastDaily)
                userData.lastDaily = 0;
            if (Date.now() - userData.lastDaily > dailyCooldown) {
                userData.primogems += dailyReward;
                userData.lastDaily = Date.now() - Date.now() % dailyCooldown;            
                message.channel.send(`<@${sender.id}> nhận được ${dailyReward} Gems nhiệm vụ mỗi ngày!`);
            }
            else {
                message.channel.send(`<@${sender.id}> đã nhận được Gems nhiệm vụ hôm nay. Hãy nhận tiếp sau ${Math.ceil((dailyCooldown - Date.now() + userData.lastDaily)/3600000)} hours.`);
            }
        return userData;
    } catch (err) { console.log(err) }
	},
}