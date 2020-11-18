const characters6Star = ['Stormterror', 'Paimon'];
const characters5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee', 'Venti', 'Zhongli', 'Childe'];
const characters4Star = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor', 'Diona', 'Xinyan'];

const bows4star = ['Alley-Hunter', 'Blackcliff-Warbow', 'Compound-Bow', 'Favonius-Warbow', 'Prototype-Crescent', 'Royal-Bow', 'Rust', 'Sacrificial-Bow', 'The-Stringless', 'The-Viridescent-Hunt'];
const catalyst4star = ['Blackcliff-Amulet', 'Eye-of-Perception', 'Favonius-Codex', 'Mappa-Mare', 'Prototype-Malice', 'Royal-Grimoire', 'Scrificial-Fragments', 'Solar-Pearl', 'The-Widsith', 'Wine-and-Song'];
const claymore4star = ['Blackcliff-Slasher', 'Favonius-Greatsword', 'Lithic-Blade', 'Prototype-Aminus', 'Rainslasher', 'Royal-Greatsword', 'Sacrificial-Greatsword', 'Serpent-Spine', 'The-Bell', 'Whiteblind'];
const polearm4star = ['Crescent-Pike', 'Deathmatch', 'Dragon\'s-Bane', 'Favonius-Lance', 'Lithic-Spear', 'Prototype-Grudge'];
const sword4star = ['Blackcliff-Longsword', 'Favonius-Sword', 'Iron-Sting', 'Lion\'s-Roar', 'Prototype-Rancour', 'Royal-Longsword', 'Sacrificial-Sword', 'The-Alley-Flash', 'The-Black-Sword', 'The-Flute'];
const weapons6Star = ['Excalibur', 'Muramasa'];
const weapons5Star = ['Wolf\'s-Gravestone', 'Aquila-Favonia', 'Lost-Prayer-to-the-Sacred-Winds', 'Skyward-Blade', 'Skyward-Pride', 'Skyward-Harp', 'Primordial-Jade-Winged-Spear', 'Amos\'-Bow', 'Memory-of-Dust', 'Vortex-Vanquisher', 'The-Unforged'];
const weapons4Star = [...bows4star, ...catalyst4star, ...claymore4star, ...polearm4star, ...sword4star];
const weapons3Star = ['Debate-Club', 'Cold-Steel', 'Sharpshooter\'s-Oath', 'Magic-Guide', 'Harbringer-of-Dawn', 'Raven-Bow', 'Ferrous-Shadow', 'Slingshot'];

const consumables = ['4-Star-Weapon', '5-Star-Weapon'];
const allWeapons = [...weapons3Star, ...weapons4Star, ...weapons5Star, ...weapons6Star];
const allCharacters = [...characters6Star, ...characters5Star, ...characters4Star];

const generalBanner6Star = [...characters6Star, ...weapons6Star];
const generalBanner5Star = [...characters5Star, ...weapons5Star];
const generalBanner4Star = [...characters4Star, ...weapons4Star];
const generalBanner4StarCharacters = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor', 'Diona', 'Xinyan'];
const generalBanner4StarWeapons = [...weapons4Star];

const kleeBanner5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee'];

module.exports = {
    // STATE CONSTANTS
    userInitialState: {
        messageSent: 0,
        primogems: 0,
        pityCounter4star: 1,
        pityCounter5star: 1,
        lastDaily: 0,
        lastWeekly: 0,
        lastMonthly: 0,
        lastEvent: 0,
        lastBossEvent: 0,
        lastUpdateGems: 0,
        level: 1,
        exp: 0,
        party: [],
        inventory: {
            characters: {},
            weapons: {},
            consumables: {},
        },
    },
    characterInitialState: { 
        rank: 1,
        level: 1,
        constellation_level: 0,
        current_exp: 0,
        current_health: 1,
        equipped_item: "",
    },
    weaponInitialState: {
        rank: 1,
        level: 1,
        constellation_level: 0,
        stored_exp: 0,
        stored_rank: 0,
        isEquipped: "",
    },

    // CHARACTER, WEAPON, AND BANNER CONSTANTS
    characters6Star: characters6Star,
    characters5Star: characters5Star,
    characters4Star: characters4Star,
    generalBanner6Star: generalBanner6Star,
    generalBanner5Star: generalBanner5Star,
    generalBanner4Star: generalBanner4Star,
    generalBanner4StarCharacters: generalBanner4StarCharacters,
    generalBanner4StarWeapons: generalBanner4StarWeapons,
    kleeBanner5Star: kleeBanner5Star,
    weapons6Star: weapons6Star,
    weapons5Star: weapons5Star,
    weapons4Star: weapons4Star,
    weapons3Star: weapons3Star,
    weapons: allWeapons,
    characters: allCharacters,
    consumables: consumables,

    // BASE VALUE CONSTANTS

    // Boss

    bossGeoBaseARExp: 300,
    bossGeoBaseCharExp: 200,
    bossGeoBaseAtk: 1100,
    bossGeoBaseHp: 950,
    bossGeoBaseGem: 10,
    bossGeoBaseMora: 5500,

    bossAnemoBaseARExp: 320,
    bossAnemoBaseCharExp: 550,
    bossAnemoBaseAtk: 500,
    bossAnemoBaseHp: 700,
    bossAnemoBaseMora: 5500,

    bossCryoBaseAtk: 500,
    bossCryoBaseHp: 700,
    bossCryoBaseMora: 6000,

    bossPyroBaseAtk: 1500,
    bossPyroBaseHp: 1500,
    bossPyroBaseMora: 5500,

    // Raid

    raidBaseARExp: 100, 
    raidBaseAtk: 100, 
    raidBaseCharExp: 100, 
    raidBaseHp: 1000, 
    raidBaseMora: 5000,

    // LEYLINE OUTCROPS CONSTANTS

    leylineOutcropsBaseARExp: 100,
    leylineOutcropsBaseCharExp: 100,
    leylineOutcropsBaseMora: 2750,
    leylineOutcropsBaseAtk: 250,
    leylineOutcropsBaseHp: 475,

    charLevelUpBaseExp: 100,
    weaponLevelUpBaseExp: 100,
    ARLevelUpBaseExp: 800,
}