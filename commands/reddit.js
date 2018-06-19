module.exports.info = "return a random post from a provided subreddit";
module.exports.param = "r/subreddit";

const request = require("request");
const chalk   = require("chalk");

module.exports.exec = (client, message, args) => {
	var r, parsed;
	r = request.get(`https://reddit.com/r/${message.cleanContent.substring(11)}/random`, function (err, res, body) {
        parsed = r.uri.href;
        message.channel.send(parsed).then(() => {
        	console.log(chalk.yellow("[botskt]:") + ` random post from r/${message.cleanContent.substring(11)} requested by ${message.author.username}`);
        });
    });
}