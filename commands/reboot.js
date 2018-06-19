const chalk = require("chalk");

module.exports.info = "**(fskt only)** reboot botskt";

module.exports.exec = (client, message, args) => {
	if (message.author.id == "316364185430917122") {
		console.log(chalk.bgGreen("[botskt]:") + " rebooting");
		message.channel.send("rebooting, sec").then(msg => client.destroy()).then(() => client.login(require("../data.json").token));
	}
}