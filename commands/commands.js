module.exports.info = "get a list all commands";

const rr = require("require-reload");
const chalk = require("chalk");

module.exports.exec = (client, message, args) => {
	var arr = [];

	let commands = require("fs").readdirSync(__dirname);
	for (let cmd in commands) {
		let cmmd = rr(require)(__dirname + "/" + commands[cmd]);
		let param = "";

		if (cmmd.param) {
			param = cmmd.param;
		}

		arr.splice(arr.length + 1, 0, `**\`\`--${commands[cmd].replace(".js", "")} ${param}\`\`**: ${cmmd.info}`);
	}

	console.log(chalk.yellow("[botskt]:") + ` ${message.author.username} requested the commands.`);
	message.channel.send(`here's all of the commands for now, parameters wrapped in brackets are optional:\n—\n${arr.join("\n")}`);
}