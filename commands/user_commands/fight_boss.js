module.exports = {
    name: 'fight_boss',
    description: 'Fight boss',
    usage: 'PREFIX + BOSS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, resin, mora) {

        let resinReduce = 0;

    // Role Perk
        // Golden Experience Requiem
        if (message.member.roles.cache.has('766797029023154238')) {
            resinReduce = 2;
        }
        // Pyro Dominating Lv.2
        if (message.member.roles.cache.has('777513139762888704')) {
            resinReduce = 5;
        }
        // GodLike Lv.1
        if (message.member.roles.cache.has('777513408815300669')) {
            resinReduce = 10;
        }
        // GodLike Lv.2
        if (message.member.roles.cache.has('777513574557155378')) {
            resinReduce = 10;
        }

        if (resin < 40 - resinReduce) {
            message.channel.send(`<@${message.member.id}> không đủ resin. Bạn còn có ${resin}/200 Resin`);
            return [userData, resin, mora];
        }

        const sender = message.author;
        const fs = require('fs');
        const { calcStats, getWeaponDamage } = require('../../functions.js');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        const { 
            bossGeoBaseARExp, 
            bossGeoBaseAtk, 
            bossGeoBaseCharExp, 
            bossGeoBaseHp,
            bossGeoBaseGem,
            bossGeoBaseMora,
            bossAnemoBaseARExp,
            bossAnemoBaseCharExp,
            bossAnemoBaseAtk,
            bossAnemoBaseHp,
            bossAnemoBaseMora,
            bossPyroBaseAtk,
            bossPyroBaseHp,
            bossPyroBaseMora,
            bossCryoBaseAtk,
            bossCryoBaseHp,
            bossCryoBaseMora,
            charLevelUpBaseExp,
            ARLevelUpBaseExp,
        } = require('../../constants.js');


        // Geo Boss

        if (msg_arr[1] === 'GEO') {
            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, resin, mora];
            }

            if (mora < 5500 + (5500 * 0.5 * parseInt(msg_arr[2]))) {
                message.channel.send(`<@${message.member.id}> không đủ Mora. Bạn có ${mora} Mora`);
                return [userData, resin, mora];
            }

            var leylineAtk = bossGeoBaseAtk * (1 + 1.5 * parseInt(msg_arr[2]));
            var leylineHp = bossGeoBaseHp * (1 + 0.1 * parseInt(msg_arr[2]));
            var bossLevel = (10 + 10 * parseInt(msg_arr[2]));
            var bossATK = bossGeoBaseAtk * (1 + 1.4 * parseInt(msg_arr[2]));
            var bossHP = bossGeoBaseHp * (0.9 + (0.1 * parseInt(msg_arr[2])));

            var totalAtk = 0;
            var totalHp = 0;

            var msg = `<@${message.author.id}>\n`;

            partyList = userData.party;

            if(!partyList)
                return [userData, resin, mora];

            partyList.forEach((character) => {
                var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
                const weaponDamage = getWeaponDamage(userData, character);
                var [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
                totalAtk += atk;
                totalHp += hp;
            });

            if (totalAtk > leylineAtk && totalHp > leylineHp) {
                if (userData.exp === undefined) {
                    userData.exp = 0;
                    userData.level = 1;
                }
                var expGained = bossGeoBaseARExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var charExpGained = bossGeoBaseCharExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var gemGained = bossGeoBaseGem * (1 + 1 * parseInt(msg_arr[2]));
                var moraRemoved = bossGeoBaseMora + (5500 * 0.5 * parseInt(msg_arr[2]));

                // USER MORA REWARDS
                mora -= moraRemoved;
                msg += `\nBạn đã sử dụng ${moraRemoved} Mora. Số Mora hiện tại là ${mora} Mora`

                // USER MORA REWARDS
                userData.primogems += gemGained;
                msg += `\nBạn đã nhận được **${gemGained} Gems**. Số Gem hiện tại là ${userData.primogems} Gems!`

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
                return [userData, resin - 40 + resinReduce, mora];
            }
            else {
                resin += resinReduce;
                message.channel.send(`<@${sender.id}> Zhongli đã cố tới cứu team bạn nhưng... Team bạn đã bị thịt bỡi Slime lv.1. Hãy nâng cấp nhân vật và vũ khí để sống sót lâu hơn tới khi Zhongli tới kịp.`);
                message.channel.send(`Cấp của boss Geo hiện tại là ${bossLevel}, Có số Atk khoảng ${bossATK} và khoảng ${bossHP} cùng với 100 máu trắng!`)
                return [userData, resin - 40 + resinReduce, mora];
            }
        }

        // Anemo Boss

        if (msg_arr[1] === 'ANEMO') {
            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, resin, mora];
            }

            if (mora < 5500 + (5500 * 0.5 * parseInt(msg_arr[2]))) {
                message.channel.send(`<@${message.member.id}> không đủ Mora. Bạn có ${mora} Mora`);
                return [userData, resin, mora];
            }

            var leylineAtk = bossAnemoBaseAtk * (1 + 1.4 * parseInt(msg_arr[2]));
            var leylineHp = bossAnemoBaseHp * (1 + 0.1 * parseInt(msg_arr[2]));
            var bossLevel = (10 + 10 * parseInt(msg_arr[2]));
            var bossATK = bossAnemoBaseAtk * (1 + 1.3 * parseInt(msg_arr[2]));
            var bossHP = bossAnemoBaseHp * (0.9 + (0.1 * parseInt(msg_arr[2])));
            

            var totalAtk = 0;
            var totalHp = 0;

            var msg = `<@${message.author.id}>\n`;

            partyList = userData.party;

            if(!partyList)
                return [userData, resin, mora];

            partyList.forEach((character) => {
                var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
                const weaponDamage = getWeaponDamage(userData, character);
                var [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
                totalAtk += atk;
                totalHp += hp;
            });

            if (totalAtk > leylineAtk && totalHp > leylineHp) {
                if (userData.exp === undefined) {
                    userData.exp = 0;
                    userData.level = 1;
                }
                var expGained = bossAnemoBaseARExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var charExpGained = bossAnemoBaseCharExp * (1 + 0.75 * parseInt(msg_arr[2]));
                var moraRemoved = bossAnemoBaseMora + (5500 * 0.5 * parseInt(msg_arr[2]));

                // USER MORA REWARDS
                mora -= moraRemoved;
                msg += `\nBạn đã sử dụng ${moraRemoved} Mora. Số Mora hiện tại là ${mora} Mora!`

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
                return [userData, resin - 40 + resinReduce, mora];
            }
            else {
                resin += resinReduce;
                message.channel.send(`<@${sender.id}> Zhongli đã cố tới cứu team bạn nhưng... Team bạn đã bị thịt bỡi Slime lv.1. Hãy nâng cấp nhân vật và vũ khí để sống sót lâu hơn tới khi Zhongli tới kịp.`);
                message.channel.send(`Cấp của boss Anemo hiện tại là ${bossLevel}, Có số Atk khoảng ${bossATK} và khoảng ${bossHP} cùng với 85 máu trắng!`)
                return [userData, resin - 40 + resinReduce, mora];
            }
        }

        // Pyro Boss

        if (msg_arr[1] === 'PYRO') {
            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, resin, mora];
            }

            if (mora < 5500 + (5500 * parseInt(msg_arr[2]))) {
                message.channel.send(`<@${message.member.id}> không đủ Mora. Bạn có ${mora} Mora`);
                return [userData, resin, mora];
            }

            var leylineAtk = bossPyroBaseAtk * (1 + 2 * parseInt(msg_arr[2]));
            var leylineHp = bossPyroBaseHp * (1 + 0.2 * parseInt(msg_arr[2]));
            var bossLevel = (30 + 10 * parseInt(msg_arr[2]));
            var bossATK = bossPyroBaseAtk * (1 + 1.9 * parseInt(msg_arr[2]));
            var bossHP = bossPyroBaseHp * (0.9 + (0.2 * parseInt(msg_arr[2])));

            var totalAtk = 0;
            var totalHp = 0;

            var msg = `<@${message.author.id}>\n`;

            partyList = userData.party;

            if(!partyList)
                return [userData, resin, mora];

            partyList.forEach((character) => {
                var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
                const weaponDamage = getWeaponDamage(userData, character);
                var [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
                totalAtk += atk;
                totalHp += hp;
            });

            if (totalAtk > leylineAtk && totalHp > leylineHp) {
                if (userData.exp === undefined) {
                    userData.exp = 0;
                    userData.level = 1;
                }
                var moraRemoved = bossPyroBaseMora * parseInt(msg_arr[2]);

                // USER MORA REWARDS
                mora -= moraRemoved;
                msg += `\nBạn đã sử dụng ${moraRemoved} Mora. Số Mora hiện tại là ${mora} Mora!`
                msg += `\nBạn đã đánh bại Boss Pyro level ${msg_arr[2]}! Yo, <@322916364731940875> Trao thưởng nè!`
                msg += `\n**Lưu ý: Mỗi người chỉ có thể nhận quà mỗi level, 1 lần!**`
                msg += '\n';
                message.channel.send(msg);
                return [userData, resin - 40 + resinReduce, mora];
            }
            else {
                resin += resinReduce;
                message.channel.send(`<@${sender.id}> Zhongli đã cố tới cứu team bạn nhưng... Team bạn đã bị thịt bỡi Slime lv.1. Hãy nâng cấp nhân vật và vũ khí để sống sót lâu hơn tới khi Zhongli tới kịp.`);
                message.channel.send(`Cấp của boss Pyro hiện tại là ${bossLevel}, Có số Atk khoảng ${bossATK} và khoảng ${bossHP} cùng với 500 máu trắng!`)
                return [userData, resin - 40 + resinReduce, mora];
            }
        }

        
        return [userData, resin, mora];
	},
}