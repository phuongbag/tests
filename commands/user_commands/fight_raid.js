module.exports = {
    name: 'fight_raid',
    description: 'Fight Raid',
    usage: 'PREFIX + RAID',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, userData3, msg_arr, resin, mora, resin3, mora3) {
        if (resin < 20) {
            message.channel.send(`<@${message.member.id}> không đủ resin. Bạn còn có ${resin}/200 Resin`);
            return [userData, userData3, resin, mora, resin3, mora3];
        }

        const sender = message.author;
        const fs = require('fs');
        const { calcStats, getWeaponDamage } = require('../../functions.js');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        const { 
            raidBaseARExp, 
            raidBaseAtk, 
            raidBaseCharExp, 
            raidBaseHp, 
            raidBaseMora,
            charLevelUpBaseExp,
            ARLevelUpBaseExp,
        } = require('../../constants.js');
        const targetUser3 = msg_arr[3].slice(3, 30).split('>')[0];
        var userData3;
        con.query(`SELECT * FROM USERDATA WHERE DISCORDID=${targetUser3}`, (err, result, fields) => {
            if (err) throw err;
            userData3 = JSON.parse(result[0].DATA.toString());
            if (userData3) {
            var resin3 = result[0].RESIN;
            var mora3 = result[0].MORA;

        if (msg_arr[1] === 'TEST') {

            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, userData3, resin, mora, resin3, mora3];
            }   

            var leylineAtk = raidBaseAtk * (1 + parseInt(msg_arr[2]));
            var leylineHp = raidBaseHp * (1 + parseInt(msg_arr[2]));

            var totalAtk = 0;
            var totalHp = 0;

            var msg = `<@${message.author.id}>\n`;

            partyList = userData.party;
            partyList3 = userData3.party;

            if(!partyList)
                return [userData, userData3, resin, mora, resin3, mora3];
            if(!partyList3)
                return [userData, userData3, resin, mora, resin3, mora3];

            if (partyList.length > 4) {
                partyList = partyList.slice(0, 4);
                userData.party = partyList;
            }
            if (partyList3.length > 4) {
                partyList3 = partyList3.slice(0, 4);
                userData3.party = partyList3;
            }

            partyList.forEach((character) => {
                var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
                const weaponDamage = getWeaponDamage(userData, character);
                var [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
                totalAtk += atk;
                totalHp += hp;
            });

            partyList3.forEach((character) => {
                var charData3 = userData3.inventory.characters[characterConstants[character].rarity_text][character];
                const weaponDamage = getWeaponDamage(userData3, character);
                var [atk3, hp3] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData3.level, charData3.constellation_level, weaponDamage);
                totalAtk3 += atk3;
                totalHp3 += hp3;
            });

            if (totalAtk + totalAtk3 > leylineAtk && totalHp > leylineHp + totalHp3) {
                if (userData.exp === undefined) {
                    userData.exp = 0;
                    userData.level = 1;
                }
                var expGained = raidBaseARExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var charExpGained = raidBaseCharExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var moraGained = raidBaseMora * (1 + 0.25 * parseInt(msg_arr[2]));
                var debugAtk = totalAtk + totalAtk3;
                var debugHp = totalHp + totalAtk3;

                // USER MORA REWARDS
                mora += moraGained;
                msg += `\nBạn đã nhận được ${moraGained} Mora. Số Mora hiện tại là ${mora} Mora`
                msg += `\nDebug Atk ${debugAtk}. Debug Hp ${debugHp}`

                // USER EXP REWARDS
                var oldARLevel = userData.level;
                userData.exp += expGained;
                msg += `\nBạn nhận được ${expGained} AR Exp`
                while (userData.exp >= ARLevelUpBaseExp * userData.level) {
                    userData.exp -= ARLevelUpBaseExp * userData.level;
                    userData.level++;
                }

                if (oldARLevel !== userData.level) {
                    msg += ` và Leveled up từ ${oldARLevel} -> ${userData.level}`;
                }

                msg += '\n';

                // CHARACTER EXP REWARDS
                partyList.forEach((character) => {
                    var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
                    var oldLevel = charData.level;
                    charData.currentExp += charExpGained;
                    while (charData.currentExp >= charLevelUpBaseExp * charData.level) {
                        charData.currentExp -= charLevelUpBaseExp * charData.level;
                        charData.level++;
                    }
                    msg += `\n${character} Nhận được ${charExpGained} EXP`
                    if (oldLevel !== charData.level)
                        msg += ` và Leveled up từ ${oldLevel} -> ${charData.level}`;
                })
                message.channel.send(msg);
                return [userData, resin - 20, mora];
            }
            else {
                message.channel.send(`<@${sender.id}> Zhongli đã cố tới cứu team bạn nhưng... Team bạn đã bị thịt bỡi Slime lv.1. Hãy nâng cấp nhân vật và vũ khí để sống sót lâu hơn tới khi Zhongli tới kịp.`);
                return [userData, resin - 20, mora];
            }
        }}});
        return [userData, userData3, resin, mora, resin3, mora3];
	},
}