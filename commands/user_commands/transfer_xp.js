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
            var charName2 = msg_arr[2];

            if (!characterConstants[charName1]){
                message.channel.send(`<@${sender.id}> Nhân vật 1 không tồn tại!`);
                return;
            }

            if (!characterConstants[charName2]){
                message.channel.send(`<@${sender.id}> Nhân vật 2 không tồn tại!`);
                return;
            }

            var charData1 = getCharacterData(userData, charName1);
            if (!charData1) {
                message.channel.send(`<@${sender.id}> Nhân vật 1 không tồn tại`);
                return;
            }

            var charData2 = getCharacterData(userData, charName2);
            if (!charData2) {
                message.channel.send(`<@${sender.id}> Nhân vật 2 không tồn tại!`);
                return;
            }

            var charData1 = userData.inventory.characters[characterConstants[charName1].rarity_text][charName1];
            var charData2 = userData.inventory.characters[characterConstants[charName2].rarity_text][charName2];
            let baseMoraPrice = 5000;

            if (charData1.level > 20) {
                baseMoraPrice = charData1.level/20 *5000;
            }
            var xpPrice = baseMoraPrice * charData1.level;

            if (mora < xpPrice) {
                message.channel.send(`<@${message.member.id}> không có đủ ${xpPrice} Mora để chuyển đổi Level. Bạn có ${mora} Mora`);
                return;
            }

            if (charData2.level > 1){
                message.channel.send(`<@${message.member.id}>`);
                charData2.level = 1;
            }
            var moraRemoved = baseMoraPrice * charData1.level;

            mora -= moraRemoved;
            charData2.level += charData1.level - 1;
            charData1.level = 1;

            con.query(`SELECT MORA FROM USERDATA WHERE DISCORDID=${message.member.id}`, (err, result, fields) => {
                if (err) throw err;
            con.query(`UPDATE USERDATA SET MORA='${mora}' WHERE DISCORDID=${message.member.id};`)});

            message.channel.send(`\nBạn đã sử dụng ${moraRemoved} Mora. Số Mora hiện tại là ${mora} Mora`);
            message.channel.send(`<@${sender.id}> \n\nĐã chuyển hóa Level của ${charName1} qua ${charName2} thành công!`);
            message.channel.send(`\`\`\`\n${charName1}\nLevel: ${charData1.level}\nConstellation: ${charData1.constellation_level}\nEXP: ${charData1.current_exp} \n\n${charName2}\nLevel: ${charData2.level}\nConstellation: ${charData2.constellation_level}\nEXP: ${charData2.current_exp}\`\`\``);
            return;
        },
    }