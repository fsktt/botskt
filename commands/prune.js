const chalk = require("chalk");

module.exports.info = "**(mod only)** delete x messages";
module.exports.param = "x";

module.exports.exec = (client, message, args) => {
	if (message.member.roles.find("name", "funky fools")) {
		let count = parseInt(message.content.substring(8));

	    message.channel.fetchMessages({limit: 100}).then(messages => {
	        let a = messages.array();
	        a.length = count + 1;
	        a.map(m => m.delete().catch(console.error));
	    });

	    console.log(chalk.red("[botskt]:") + ` (${message.author.id}) @${message.author.tag} pruned ${count} messages in #${message.channel.name}`);
	}
}