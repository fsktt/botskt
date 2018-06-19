module.exports.info = "**(music)** check the current song queue";
module.exports.exec = (client, message, args) => {
	var queue = require("./play.js").getQueue();

	if (queue[message.guild.id] === undefined) return message.channel.send(`<@${message.author.id}> queue is empty! add music to the queue with \`\`--add\`\``);

	let ts = [];
	queue[message.guild.id].songs.forEach((song, i) => {
		ts.push(`\`\`${i+1}.\`\` ${song.title} — requested by ${song.requester}`);
	});

	if (ts.length < 1) {
		message.channel.send(`<@${message.author.id}> queue is empty! add music to the queue with \`\`--add\`\``);
	} else {
		message.channel.send(`current queue **[requested by <@${message.author.id}>]** _(${ts.length} currently in the queue${(ts.length > 15 ? ", displaying up to 15" : "")})_:\n${ts.slice(0, 15).join("\n")}`);
	}
}