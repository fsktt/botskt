const chalk = require("chalk");

module.exports.info = "**(fskt only)** run js";
module.exports.param = "js";

function clean(text) { if (typeof(text) === "string") { return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); } else { return text; } }

module.exports.exec = (client, message, args) => {
	if (message.author.id == "316364185430917122") {
		try {
	        const res = eval(args.join(" "));
	        message.channel.send("\n**``OUTPUT:``** " + clean(res));
	        console.log(chalk.yellow("[botskt]:") + ` run returned output: ${clean(res)}`);
	    } catch(err) {
	        message.channel.send("\n**``ERROR:``** " + clean(err));
	        console.log(chalk.yellow("[botskt]:") + ` run returned error:\n—\n${clean(err)}\n—`);
	    }
	}
}