// info for the bot
module.exports.info = "**dm the bot this command** confess something publicly";
// more info for the bot
module.exports.param = "msg";

// main function
module.exports.exec = (client, message, args) => {
	//make sure current channel is dm
	if (message.channel.type == "dm") {
		// send confirmation message
		message.channel.send("they will know it was you <:blobsweats:454171353784909827>");
		// forward confession to confessions channel
		client.channels.get("454474461677092874").send(`**\`\`confession from ${message.author.username}:\`\`** ${message.cleanContent.substring(10)}`);
	// if it isn't dm
	} else {
		// call them idgit
		message.channel.send(`<@${message.author.id}> dm me that you idgit`);
	}
}