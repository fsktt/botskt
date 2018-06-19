const chalk = require("chalk");

module.exports.info = "get a (mentioned) user's avatar";
module.exports.param = "@user";

module.exports.exec = (client, message, args) => {
	if (message.mentions.users.size == 0) return message.channel.send(`<@${message.author.id}> who??`);

	var user = message.mentions.users.first();
	message.channel.send(`${user.username}'s avatar: ${user.avatarURL}`);
	
	console.log(chalk.yellow("[botskt]:") + ` ${user.username}'s avatar was requested by ${message.author.username}`);
}