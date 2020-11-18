module.exports = {
    name: 'transfer_xp',
    description: 'Transfer XP',
    usage: 'PREFIX + TRANSFER_XP',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, mora, con) {
        const sender = message.author;
        const fs = require('fs');
        const { printCharacters, calcStats, getWeaponDamage, getCharacterData} = require('../../functions.js');
            const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
            var charName1 = msg_arr[1];

            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, resin, mora];
            }

            if (!characterConstants[charName1]){
                message.channel.send(`<@${sender.id}> Nhân vật 1 không tồn tại!`);
                return;
            }

            var charData1 = getCharacterData(userData, charName1);
            if (!charData1) {
                message.channel.send(`<@${sender.id}> Nhân vật 1 không tồn tại`);
                return;
            }

            var charData1 = userData.inventory.characters[characterConstants[charName1].rarity_text][charName1];
            let baseMoraPrice = 10000;

            if (msg_arr[2] < 1) {
                message.channel.send(`<@${message.member.id}> Số lượng không hợp lệ!`);
                return [userData, resin, mora];
            }
    
            if (msg_arr[2] > 10) {
                message.channel.send(`<@${message.member.id}> Bạn không thể mua quá 10 Level mỗi lần!`);
                return [userData, resin, mora];
            }

            if (charData1.level > 20) {
                baseMoraPrice = charData1.level/20 *20000;
            }
            if (charData1.level > 40) {
                baseMoraPrice = charData1.level/40 *30000;
            }
            if (charData1.level > 50) {
                baseMoraPrice = charData1.level/50 *45000;
            }
            if (charData1.level > 100) {
                baseMoraPrice = charData1.level/100 *100000;
            }
            var xpPrice = baseMoraPrice * msg_arr[2];

            if (mora < xpPrice) {
                message.channel.send(`<@${message.member.id}> không có đủ ${xpPrice} Mora để chuyển đổi Level. Bạn có ${mora} Mora`);
                return;
            }
            var moraRemoved = baseMoraPrice * msg_arr[2];

            mora -= moraRemoved;
            charData1.level += msg_arr[2];

            con.query(`SELECT MORA FROM USERDATA WHERE DISCORDID=${message.member.id}`, (err, result, fields) => {
                if (err) throw err;
            con.query(`UPDATE USERDATA SET MORA='${mora}' WHERE DISCORDID=${message.member.id};`)});

            message.channel.send(`\nBạn đã sử dụng ${moraRemoved} Mora. Số Mora hiện tại là ${mora} Mora`);
            message.channel.send(`<@${sender.id}> \n\nĐã chuyển hóa Level của ${charName1} qua ${charName2} thành công!`);
            message.channel.send(`\`\`\`\n${charName1}\nLevel: ${charData1.level}\nConstellation: ${charData1.constellation_level}\nEXP: ${charData1.current_exp}\`\`\``);
            return;
        },
    }