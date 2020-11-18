module.exports = {
    name: 'claim_weekly',
    description: 'Claim weekly reward',
    usage: 'PREFIX + WEEKLY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, multiplier) {
        const sender = message.author;
        const weeklyCooldown = 8.64e+7 * 7;
        const weeklyReward = 2400 * multiplier;

        try {
            if (!userData)
                return userData;
            if (!userData.lastWeekly)
                userData.lastWeekly = 0;
            if (Date.now() - userData.lastWeekly > weeklyCooldown) {
                userData.primogems += weeklyReward;
                userData.lastWeekly = Date.now() - Date.now() % weeklyCooldown;
                message.channel.send(`<@${sender.id}> nhận thành công ${weeklyReward} Weklin Gems Pack tuần này!`);
            }
            else {
                const cond = Math.floor((weeklyCooldown - Date.now() + userData.lastWeekly)/3600000) > 48;
                const daysRemaining = `${Math.ceil((weeklyCooldown - Date.now() + userData.lastWeekly)/(3600000)/24)} ngày`;
                const hoursRemaining = `${Math.ceil((weeklyCooldown - Date.now() + userData.lastWeekly)/(3600000))} giờ`;
                message.channel.send(`<@${sender.id}> đã nhận Weklin Gems Pack của tuần này. Hãy nhận nó sau ${cond ? daysRemaining : hoursRemaining}.`);
            }
            return userData;
        } catch (err) { console.log(err) }
	},
}