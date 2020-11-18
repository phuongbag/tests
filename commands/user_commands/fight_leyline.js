module.exports = {
    name: 'fight_leyline',
    description: 'Fight Leylines',
    usage: 'PREFIX + LEYLINE',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, resin, mora) {

        let resinReduce = 0;
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
            resinReduce = 2;
        }
        // Pyro Dominating Lv.2
        if (message.member.roles.cache.has('777513139762888704')) {
            Moramultiplier = 1.35;
            resinReduce = 5;
        }
        // GodLike Lv.1
        if (message.member.roles.cache.has('777513408815300669')) {
            Moramultiplier = 1.5;
            resinReduce = 10;
        }
        // GodLike Lv.2
        if (message.member.roles.cache.has('777513574557155378')) {
            Moramultiplier = 1.75;
            resinReduce = 10;
        }

        if (resin < 20 - resinReduce) {
            message.channel.send(`<@${message.member.id}> không đủ resin. Bạn còn có ${resin}/200 Resin`);
            return [userData, resin, mora];
        }

        const sender = message.author;
        const fs = require('fs');
        const { calcStats, getWeaponDamage } = require('../../functions.js');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        const { 
            leylineOutcropsBaseARExp, 
            leylineOutcropsBaseAtk, 
            leylineOutcropsBaseCharExp, 
            leylineOutcropsBaseHp, 
            leylineOutcropsBaseMora,
            charLevelUpBaseExp,
            ARLevelUpBaseExp,
        } = require('../../constants.js');

        if (msg_arr[1] === 'MORA') {
            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Nhập số hợp lệ`);
                return [userData, resin, mora];
            }
            var leylineAtk = leylineOutcropsBaseAtk * (1 + 1.8 * parseInt(msg_arr[2]));
            var leylineHp = leylineOutcropsBaseHp * (1 + 0.1 * parseInt(msg_arr[2]));

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
                var expGained = leylineOutcropsBaseARExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var charExpGained = leylineOutcropsBaseCharExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var moraGained = leylineOutcropsBaseMora * (1 + 0.25 * parseInt(msg_arr[2])) * Moramultiplier;

                // USER MORA REWARDS
                mora += moraGained;
                msg += `\nBạn đã nhận được ${moraGained} Mora. Số Mora hiện tại là ${mora} Mora`

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
                return [userData, resin - 20 + resinReduce, mora];
            }
            else {
                message.channel.send(`<@${sender.id}> Zhongli đã cố tới cứu team bạn nhưng... Team bạn đã bị thịt bỡi Slime lv.1. Hãy nâng cấp nhân vật và vũ khí để sống sót lâu hơn tới khi Zhongli tới kịp.`);
                return [userData, resin - 20 + resinReduce, mora];
            }
        }
        return [userData, resin, mora];
	},
}