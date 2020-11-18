module.exports = {
    name: 'claim_monthly',
    description: 'Claim monthly reward',
    usage: 'PREFIX + MONTHLY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, multiplier) {
        const sender = message.author;
        const monthlyCooldown = 8.64e+7 * 30;
        const monthlyReward = 4800 * multiplier;

        try {
            if (!userData)
                return userData;
            if (!userData.lastMonthly)
                userData.lastMonthly = 0;
            if (Date.now() - userData.lastMonthly > monthlyCooldown) {
                userData.primogems += monthlyReward;
                userData.lastMonthly = Date.now() - (Date.now() % monthlyCooldown);
                message.channel.send(`<@${sender.id}> nhận thành công ${monthlyReward} Montlin Gems Pack tháng này!`);
            }
            else {
                const cond = Math.floor((monthlyCooldown - Date.now() + userData.lastMonthly)/3600000) > 48;
                const daysRemaining = `${Math.ceil((monthlyCooldown - Date.now() + userData.lastMonthly)/(3600000)/24)} ngày`;
                const hoursRemaining = `${Math.ceil((monthlyCooldown - Date.now() + userData.lastMonthly)/(3600000))} giờ`;
                message.channel.send(`<@${sender.id}> đã nhận Montlin Gems Pack của tháng này. Hãy nhận nó sau ${cond ? daysRemaining : hoursRemaining}.`);
            }
            return userData;
        } catch (err) { console.log(err) }
	},
}