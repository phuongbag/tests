module.exports = {
    name: 'give_all_primogems',
    description: 'Give Primogems to All',
    usage: 'PREFIX + GIVEALL',
    args: true,
    dmAllow: true,
    channels: [],
	execute: (message, msg_arr, con) => {
        if (/^\d+$/.test(msg_arr[1]) && msg_arr[1] !== undefined && message.member.id === '322916364731940875') {
            con.query(`SELECT * FROM USERDATA`, (err, result, fields) => {
                if (err) throw err;
                var userData;
                var userID;
                result.forEach((item) => {
                    var userData = JSON.parse(item.DATA.toString());
                    var userID = item.DISCORDID;
                    console.log(userID);
                    userData.primogems += parseInt(msg_arr[1]);
                    userData = JSON.stringify(userData).replace(/'/g,"\\'");
                    con.query(`UPDATE USERDATA SET DATA='${userData}' WHERE DISCORDID=${userID};`, (err) => {
                        console.log('After update');
                        console.log(err);
                        console.log(userID);
                    });
                });
                message.channel.send(`Successfully given ${msg_arr[1]} to all users.`);
                return;
            });
        }
    },
}