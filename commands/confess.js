const chalk = require("chalk");

// info for the bot
module.exports.info = "**dm the bot this command** confess something privately";
// more info for the bot
module.exports.param = "msg";

// main function
module.exports.exec = (client, message, args) => {
	//make sure current channel is dm
	if (message.channel.type == "dm") {
		// send confirmation message
		console.log(chalk.yellow("[botskt]:") + " new confession :eyes:");
		message.channel.send("nobody will know it was you :revolving_hearts:");
		// forward confession to confessions channel
		client.channels.get("454474461677092874").send(`**\`\`confession from [???]:\`\`** ${message.cleanContent.substring(10)}`);
	// if it isn't dm
	} else {
		// call them idgit
		message.channel.send(`<@${message.author.id}> dm me that you idgit`);
	}
}