const chalk = require("chalk");

var rmnd = function(time, msg, message) {
	console.log(chalk.yellow("[botskt]:") + ` reminding ${message.author.username} something in ${time} minutes`)
	setTimeout(() => { message.channel.send(`<@${message.author.id}> hey friendo, ${time} minutes ago you asked me to tell you ${msg}`); }, (time*1000)*60);
}

module.exports.info = "have botskt remind you to do something";
module.exports.exec = (client, message, args) => {
	var time = args[0];
	var msg  = message.cleanContent.substring(message.cleanContent.indexOf(time) + time.length + 1);
	if (isNaN(time) || !time || time < 1) return message.channel.send(`<@${message.author.id}> pls give time (format is \`\`--remind {time (in minutes)} {message}\`\`)`);

	rmnd(time, msg, message);

	message.channel.send("<:blobsalute:454171354212859905>");
}