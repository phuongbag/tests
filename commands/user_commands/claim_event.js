module.exports = {
    name: 'claim_event',
    description: 'CLAIM EVENT',
    usage: 'PREFIX + CLAIM',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, resin, mora) {

        // Mora Event
        const sender = message.author;
        const fs = require('fs');
        const { calcStats, getWeaponDamage } = require('../../functions.js');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        const EventCooldown = 21600000;
        const UpdateCooldown = 8.64e+7 * 90;
        if (msg_arr[1] === 'MORA') {
            try {
                if (!userData.lastEvent)
                userData.lastEvent = 0;
                if (Date.now() - userData.lastEvent > EventCooldown) {
                    userData.lastEvent = Date.now() - Date.now() % EventCooldown;

                        var moraGained = 45000 + 1000 * Math.floor(userData.level/5);
                        mora += moraGained;
                        message.channel.send(`\nBạn đã nhận được ${moraGained} Mora từ sự kiện mùa Cryo. Số Mora hiện tại là ${mora} Mora!`);
                        return [userData, resin, mora];
                }else {
                    const cond = Math.floor((EventCooldown - Date.now() + userData.lastEvent)/3600000) > 1;
                    const hoursRemaining = `${Math.ceil((EventCooldown - Date.now() + userData.lastEvent)/(3600000))} giờ`;
                    const minsRemaining = `${Math.ceil((EventCooldown - Date.now() + userData.lastEvent)/(60000))} phút`;
                    message.channel.send(`<@${sender.id}> đã tham gia sự kiện mùa Cryo. Hãy tham gia tiếp tiếp sau ${cond ? hoursRemaining : minsRemaining}.`);
                }
            return [userData, resin, mora];
        }catch (err) { console.log(err) }
    }

    // Resin Event
    if (msg_arr[1] === 'RESIN') {
        try {
            if (!userData.lastEvent)
            userData.lastEvent = 0;
            if (Date.now() - userData.lastEvent > EventCooldown) {
                userData.lastEvent = Date.now() - Date.now() % EventCooldown;
                    var resinGained = 45 + 10 * Math.floor(userData.level/5);
                    resin += resinGained;
                    message.channel.send(`\nBạn đã nhận được ${resinGained} Resin từ sự kiện mùa Cryo. Resin hiện tại là ${resin} Resin!`);
                    return [userData, resin, mora];
            }else {
                const cond = Math.floor((EventCooldown - Date.now() + userData.lastEvent)/3600000) > 1;
                const hoursRemaining = `${Math.ceil((EventCooldown - Date.now() + userData.lastEvent)/(3600000))} giờ`;
                const minsRemaining = `${Math.ceil((EventCooldown - Date.now() + userData.lastEvent)/(60000))} phút`;
                message.channel.send(`<@${sender.id}> đã tham gia sự kiện mùa Cryo. Hãy tham gia tiếp tiếp sau ${cond ? hoursRemaining : minsRemaining}.`);
            }
        return [userData, resin, mora];
    }catch (err) { console.log(err) }
}

        if (msg_arr[1] === 'UPDATE') {
        try {
            if (!userData.lastUpdateGems)
            userData.lastUpdateGems = 0;
            if (Date.now() - userData.lastUpdateGems > UpdateCooldown) {
                userData.lastUpdateGems = Date.now() - Date.now() % UpdateCooldown;
                    var updateGained = 64000;
                    userData.primogems += updateGained;
                    message.channel.send(`\nBạn đã nhận được ${updateGained} Gems. Resin hiện tại là ${userData.primogems} Gems!`);
                    return [userData, resin, mora];
            }else {
                message.channel.send(`<@${sender.id}> đã nhận rồi, mỗi người chỉ có thể nhận 1 lần!`);
            }
        return [userData, resin, mora];
    }catch (err) { console.log(err) }
}

        return [userData, resin, mora];
	},
}