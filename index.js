// botskt by fskt
// –
// console color key:
//
// bgGreen - client events (join, leave, ready, reboot)
// bgRed - errors
// red - mod commands (prune, ban, kick)
// bgBlue - music events (join, leave)
// blue - music control (playing, skipping, pausing)
// yellow - fun (roll, reddit, run)

const timestamp = Date.now();
const discord   = require("discord.js");
const chalk    = require("chalk");
const client    = new discord.Client({autoReconnect: true});

const pref  = "--";
const token = require("./data.json").token;

client.on("ready", () => {
	console.log(chalk.bgGreen("[botskt]:") + " ready!");
});

client.on("message", message => {
	if (message.author.id == client.user.id) return;

	var msg = message.cleanContent.toLowerCase();
	if (message.cleanContent.indexOf("<:moon2A:454854432903921696>") !== -1) {
		message.react(message.guild.emojis.get("454854432903921696"));
	//} else if (msg.startsWith("i'm") && msg.indexOf("i'm") !== -1 || msg.startsWith("im ") && msg.indexOf("im ") !== -1) {
	//	message.channel.send(`<@${message.author.id}> hi ${message.cleanContent.substring(msg.indexOf("i\'m") + 4)}, i'm dad <:moon2SMUG:455125614060634123>`);
	} else if (msg.indexOf("dog") !== -1 || msg.indexOf("wolf") !== -1 || msg.indexOf("pup") !== -1) {
		message.channel.send("woof woof! <:doggoblob:454171354074185729>");
	} else if (msg.indexOf("cat") !== -1 || msg.indexOf("kitt") !== -1) {
		message.channel.send("meow! <:blobcat:455637290530766848>");
	} else if (msg.indexOf("bot") !== -1) {
		var mean = ["shit", "bad", "trash", "garbage", "terrible", "horrible", "awful", "fuck", "gay", "homo", "shut"];
		for (word in mean) {
			if (msg.indexOf(mean[word]) !== -1) {
				message.channel.send("<:capitaldcolon:455141433448595477>");
			}
		}

		if (msg.indexOf("fuck botskt") !== -1) {
			message.channel.send("<:capitaldcolon:455141433448595477>");
		} else if (msg.indexOf("thank") !== -1 || msg.indexOf("thx") !== -1 || msg.indexOf("thnk" !== -1)) {
			message.channel.send("<:blobsnuggle:454171354187563008>");
		}
	}

	if (message.cleanContent.startsWith(pref)) {
		let command = message.cleanContent.substring(pref.length).split(" ")[0];
		let params  = message.cleanContent.substring(pref.length + command.length + 1).split(" ");

		let commands = require("fs").readdirSync(__dirname + "/commands/");
		for (let cmd in commands) {
			if (commands[cmd].replace(".js", "") == command) {
				require(__dirname + "/commands/" + commands[cmd]).exec(client, message, params, timestamp);
			}
		}
	}
});

client.on("guildMemberAdd", member => {
	// i already typed this out without using template literals and i can't be asked to retype it with escape characters lol
	console.log(chalk.bgGreen("[botskt]:") + ` someone joined (${member.user.tag})`);
	client.channels.get("454494867498860545").send("``" + member.id + "`` —> ``" + member.user.tag + "``");
});

client.on("guildMemberRemove", member => {
	console.log(chalk.bgGreen("[botskt]:") + ` someone left (${member.user.tag})`);
});

process.on("unhandledRejection", err => {
	// console.error in case i decide to throw this on heroku or smthn
	console.error(chalk.bgRed("[botskt]: uncaught promise error:") +" \n—\n" + err.stack + "\n—");
});

client.login(token);