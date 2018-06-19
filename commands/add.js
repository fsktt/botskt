const yt = require("ytdl-core");
const chalk = require("chalk");

module.exports.info = "**(music)** add a youtube link/id to the url";
module.exports.exec = (client, message, args) => {
	let queue = require("./play.js").getQueue();
	let url = args[0];

	if (url == "" || url === undefined) return message.channel.send(`<@${message.author.id}> you didn't put a link/id <:moon2A:454854432903921696>`);
	yt.getInfo(url, (err, info) => {
		if (err) return message.channel.send(`<@${message.author.id}> oh no <:moon2L:454854433294254080>\n\`\`\`${err}\`\`\``);

		if (!queue.hasOwnProperty(message.guild.id)) {
			require("./play.js").modifyQueue("reset");
		}

		require("./play.js").modifyQueue("add", url, message, info);
		queue = require("./play.js").getQueue();
		console.log(chalk.blue("[botskt]:") + ` ${message.author.username} added ${info.title} to the queue.`)
		message.channel.send(`<@${message.author.id}> added \`\`${info.title}\`\` to the queue <:blobsalute:454171354212859905>`);
	});
}