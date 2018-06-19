module.exports.info = "responds if botskt is alive";

const prettyms = require("pretty-ms");
const chalk = require("chalk");

module.exports.exec = (client, message, args, timestamp) => {
	console.log(chalk.green("[botskt]:") + " o/");
	message.channel.send(`howdy hey, here are some stats:\n—\nruntime: \`\`${prettyms(Math.floor((Date.now() - timestamp)), {verbose: true})}\`\`\nlatency: \`\`${(Date.now() - message.createdTimestamp)/1000} seconds\`\`\nmember count: \`\`${message.guild.memberCount}\`\`\nnode.js version: \`\`${process.version}\`\``);
}