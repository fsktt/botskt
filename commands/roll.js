const chalk = require("chalk");

module.exports.info = "roll a number (1-100 by default, or 1-a number if specified)";
module.exports.param = "[max]";

module.exports.exec = (client, message, args) => {
	var max = +args[0];

	if (isNaN(max) || !max) {
		max = 100;
	}

	var num = Math.floor(Math.random() * Math.floor(max));

	console.log(chalk.yellow("[botskt]:") + ` ${message.author.username} rolled a ${num}`);
	message.channel.send(`<@${message.author.id}> rolled a ${num}`);

}