module.exports = {
    name: 'raid_boss',
    description: 'BOSS EVENT',
    usage: 'PREFIX + RAID',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, resin, mora) {

        // Attack
        const sender = message.author;
        const fs = require('fs');
        const { calcStats, getWeaponDamage } = require('../../functions.js');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        const RaidCooldown = 3600000;
        if (msg_arr[1] === 'ATK') {
            try {
                if (!userData.lastBossEvent)
                userData.lastBossEvent = 0;
                if (Date.now() - userData.lastBossEvent > RaidCooldown) {
                    userData.lastBossEvent = Date.now() - Date.now() % RaidCooldown;

                        var gemGained = 15 + 3 * Math.floor(userData.level/5);
                        var atkDamage = 15 + 3 * Math.floor(userData.level/5);
                        userData.primogems += gemGained;
                        message.channel.send(`\nBạn đã gây ${atkDamage} sát thương lên Childe và nhận được ${gemGained} Gems trước khi bị giết. Số Gems hiện tại là ${userData.primogems} Gems!`);
                        return [userData, resin, mora];
                }else {
                    const cond = Math.floor((RaidCooldown - Date.now() + userData.lastBossEvent)/3600000) > 1;
                    const hoursRemaining = `${Math.ceil((RaidCooldown - Date.now() + userData.lastBossEvent)/(3600000))} giờ`;
                    const minsRemaining = `${Math.ceil((RaidCooldown - Date.now() + userData.lastBossEvent)/(60000))} phút`;
                    message.channel.send(`<@${sender.id}> Đội bạn đã chết. Hãy đợi hồi sinh sau ${cond ? hoursRemaining : minsRemaining}.`);
                }
            return [userData, resin, mora];
        }catch (err) { console.log(err) }
    }

    // Heal
    if (msg_arr[1] === 'HEAL') {
        try {
            if (!userData.lastBossEvent)
            userData.lastBossEvent = 0;
            if (Date.now() - userData.lastBossEvent > RaidCooldown) {
                userData.lastBossEvent = Date.now() - Date.now() % RaidCooldown;
                    var moraGained = 11250 + 250 * Math.floor(userData.level/5);
                    var healDamage = 15 + 3 * Math.floor(userData.level/5);
                    mora += moraGained;
                    message.channel.send(`\nBạn đã gây Heal ${healDamage} cho Zhongli và nhận được ${moraGained} Mora trước khi bị giết. Số Mora hiện tại là ${mora} Mora!`);
                    return [userData, resin, mora];
            }else {
                const cond = Math.floor((RaidCooldown - Date.now() + userData.lastBossEvent)/3600000) > 1;
                const hoursRemaining = `${Math.ceil((RaidCooldown - Date.now() + userData.lastBossEvent)/(3600000))} giờ`;
                const minsRemaining = `${Math.ceil((RaidCooldown - Date.now() + userData.lastBossEvent)/(60000))} phút`;
                message.channel.send(`<@${sender.id}> Đội bạn đã chết. Hãy đợi hồi sinh sau ${cond ? hoursRemaining : minsRemaining}.`);
            }
        return [userData, resin, mora];
    }catch (err) { console.log(err) }
}


        return [userData, resin, mora];
	},
}