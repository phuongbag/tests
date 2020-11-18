module.exports = {
    name: 'buy',
    description: 'Buy',
    usage: 'PREFIX + BUY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, resin, mora) {

        let Moramultiplier = 1;

    // Role Perk
        // Pyro Hunter    
        if (message.member.roles.cache.has('777303018701586513')) {
            Moramultiplier = 1.1;
        }
        // Pyro Dominating Lv.1
        if (message.member.roles.cache.has('777512218450329670')) {
            Moramultiplier = 1.2;
        }
        // Golden Experience Requiem
        if (message.member.roles.cache.has('766797029023154238')) {
            Moramultiplier = 1.1;
        }
        // Pyro Dominating Lv.2
        if (message.member.roles.cache.has('777513139762888704')) {
            Moramultiplier = 1.35;
        }
        // GodLike Lv.1
        if (message.member.roles.cache.has('777513408815300669')) {
            Moramultiplier = 1.5;
        }
        // GodLike Lv.2
        if (message.member.roles.cache.has('777513574557155378')) {
            Moramultiplier = 1.75;
        }

        var antimora = userData.level;

        if (mora < 5000 * parseInt(msg_arr[2]) * (Moramultiplier/2) * (0.47 * antimora)) {
            message.channel.send(`<@${message.member.id}> không đủ Mora. Bạn có ${mora} Mora`);
            return [userData, resin, mora];
        }

        if (resin > 200) {
            message.channel.send(`<@${message.member.id}> resin của bạn vượt quá 200. Bạn còn có ${resin}/200 Resin`);
            return [userData, resin, mora];
        }

        if (resin + (10 * msg_arr[2]) > 200) {
            message.channel.send(`<@${message.member.id}> bạn không thể mua quá 200 Resin. Bạn còn có ${resin}/200 Resin`);
            return [userData, resin, mora];
        }

        if (msg_arr[2] < 1) {
            message.channel.send(`<@${message.member.id}> Số lượng không hợp lệ!`);
            return [userData, resin, mora];
        }

        if (msg_arr[2] > 20) {
            message.channel.send(`<@${message.member.id}> Số lượng không hợp lệ!`);
            return [userData, resin, mora];
        }

        const sender = message.author;
        const fs = require('fs');
        const { calcStats, getWeaponDamage } = require('../../functions.js');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        let resinBaseMora = 5000;
        let resinBaseResin = 10;

        if (msg_arr[1] === 'RESIN') {
            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, resin, mora];
            }

                var msg = `<@${message.author.id}>\n`;

                var moraRemoved = resinBaseMora * parseInt(msg_arr[2]) * (Moramultiplier/2) * (0.47 * antimora);
                var resinGained = resinBaseResin * parseInt(msg_arr[2]);

                // USER MORA REWARDS
                mora -= moraRemoved;
                resin += resinGained;
                msg += `\nBạn đã sử dụng ${moraRemoved} Mora. Số Mora hiện tại là ${mora} Mora`
                msg += `\nBạn đã nhận được ${resinGained} Resin. Resin hiện tại là ${resin}/200 Resin`
                message.channel.send(msg);
                return [userData, resin, mora];
        }

        if (msg_arr[1] === 'TRANSFER') {
            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, resin, mora];
            }
            message.delete();

                // USER MORA REWARDS
                mora -= mmsg_arr[2];
                message.channel.send(msg);
                return [userData, resin, mora];
        }

        return [userData, resin, mora];
	},
}