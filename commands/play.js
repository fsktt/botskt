// this file is pretty ugly, not proud of it :(

const ytdl  = require("ytdl-core");
const chalk = require("chalk");
const queue = {};

var leave = false;

// hacky fix for a bug i don't wanna fix
queue["454114682316390400"] = {};
queue["454114682316390400"].playing = false;
queue["454114682316390400"].songs = [];

module.exports.info = "**(music)** play music in the queue";
module.exports.exec = (client, message, args) => {
	if (queue[message.guild.id] === undefined) return message.channel.send(`<@${message.author.id}> add music to the queue with \`\`--add\`\``);
	if (client.voiceConnections.get(message.guild.id)) return message.channel.send(`<@${message.author.id}> already playing`);

	queue[message.guild.id].playing = true;

	var play = function(song) {
		if (leave) return leave = false;

		if (!song || !queue[message.guild.id].songs[0]) {
			if (client.voiceConnections.get(message.guild.id)) {
				console.log(chalk.bgBlue("[botskt]:") + " the queue is empty, leaving channel");
				message.channel.send(`the queue is empty, leaving channel`);
				queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
				return;
			} else {
				message.channel.send(`<@${message.author.id}> the queue is empty!`);
				queue[message.guild.id].playing = false;
				return;
			}
		};

	    var vc = message.member.voiceChannel;
		if (!vc || vc.type !== "voice") {
			message.channel.send(`<@${message.author.id}> couldn't connect to your voice channel <:capitaldcolon:455141433448595477>`);
		}

		if (!client.voiceConnections.get(message.guild.id)) {
			vc.join().then(conn => {
				const connection = conn;
				const stream = ytdl(song.url, {filter: "audioonly"});
		    	const dispatcher = connection.playStream(stream);
				
				console.log(chalk.bgBlue("[botskt]:") + ` connected to ${message.author.username}'s voice channel`)
				message.channel.send(`connected <:blobsalute:454171354212859905>\n—\nthe music commands can be seen below:\n**\`\`--pause\`\`**: pause the audio\n**\`\`--resume\`\`**: resume the audio\n**\`\`--skip\`\`**: skip the audio\n**\`\`--progress\`\`**: get the progress of the current audio\n**\`\`--queue\`\`**: see the queue\n**\`\`--play\`\`**: start playing audio\n**\`\`--leave\`\`**: make botskt leave`);
				console.log(chalk.blue("[botskt]:") + ` now playing ${song.title} (requested by ${song.requester})`);
				message.channel.send(`now playing ${song.title} (requested by ${song.requester})`);

				let filter = m => m.cleanContent.startsWith("--");
				let collector = message.channel.createMessageCollector(filter);
				collector.on("collect", m => {
					let msg = m.cleanContent.toLowerCase();
					if (msg.startsWith("--pause")) {
						message.channel.send(`<@${message.author.id}> paused playback`).then(() => {
							console.log(chalk.blue("[botskt]:") + ` playback paused (requested by ${m.author.username})`);
							dispatcher.pause();
						});
					} else if (msg.startsWith("--resume")) {
						message.channel.send(`<@${message.author.id}> <:blobsalute:454171354212859905>`).then(() => {
							console.log(chalk.blue("[botskt]:") + ` playback resumed (requested by ${m.author.username})`);
							dispatcher.resume();
						});
					} else if (msg.startsWith("--skip")) {
						message.channel.send(`<@${message.author.id}> <:blobsalute:454171354212859905>`).then(() => {
							console.log(chalk.blue("[botskt]:") + ` skipping track (requested by ${m.author.username})`);
							dispatcher.end();
						});
					} else if (msg.startsWith("--progress")) {
						message.channel.send(`<@${message.author.id}> current time: \`\`${Math.floor(dispatcher.time/60000)}:${Math.floor((dispatcher.time%60000)/1000)<10?"0"+Math.floor((dispatcher.time%60000)/1000):Math.floor((dispatcher.time%60000)/1000)}\`\``);
					} else if (msg.startsWith("--leave")) {
						leave = true;
						message.member.voiceChannel.leave();
						message.channel.send(`<@${message.author.id}> <:blobsalute:454171354212859905>`);

						// clear queue
						queue[message.guild.id] = {};
						queue[message.guild.id].playing = false;
						queue[message.guild.id].songs = [];
					}
				});

				dispatcher.on("end", () => {
					collector.stop();
					if (!leave) {
						queue[message.guild.id].songs.shift()
						play(queue[message.guild.id].songs[0]);
					}
				});

				dispatcher.on("error", err => {
					message.channel.send(`<@${message.author.id}> oh no <:moon2L:454854433294254080>\n\`\`\`${err}\`\`\``).then(() => {
						collector.stop();
						queue[message.guild.id].songs.shift()
						play(queue[message.guild.id].songs[0]);
					});
				});
			});
		} else {
			const connection = client.voiceConnections.get(message.guild.id);
			const stream = ytdl(song.url, {filter: "audioonly"});
	    	const dispatcher = connection.playStream(stream);

	    	console.log(chalk.blue("[botskt]:") + ` now playing ${song.title} (requested by ${song.requester})`);
			message.channel.send(`now playing ${song.title} (requested by ${song.requester})`);

		
			let filter = m => m.cleanContent.startsWith("--");
			let collector = message.channel.createMessageCollector(filter);
			collector.on("collect", m => {
				let msg = m.cleanContent.toLowerCase();
				if (msg.startsWith("--pause")) {
					message.channel.send(`<@${message.author.id}> paused playback`).then(() => {
						console.log(chalk.blue("[botskt]:") + ` playback paused (requested by ${m.author.username})`);
						dispatcher.pause();
					});
				} else if (msg.startsWith("--resume")) {
					message.channel.send(`<@${message.author.id}> <:blobsalute:454171354212859905>`).then(() => {
						console.log(chalk.blue("[botskt]:") + ` playback resumed (requested by ${m.author.username})`);
						dispatcher.resume();
					});
				} else if (msg.startsWith("--skip")) {
					message.channel.send(`<@${message.author.id}> <:blobsalute:454171354212859905>`).then(() => {
						console.log(chalk.blue("[botskt]:") + ` skipping track (requested by ${m.author.username})`);
						dispatcher.end();
					});
				} else if (msg.startsWith("--progress")) {
					message.channel.send(`<@${message.author.id}> current time: \`\`${Math.floor(dispatcher.time/60000)}:${Math.floor((dispatcher.time%60000)/1000)<10?"0"+Math.floor((dispatcher.time%60000)/1000):Math.floor((dispatcher.time%60000)/1000)}\`\``);
				} else if (msg.startsWith("--leave")) {
					leave = true;
					console.log(chalk.bgBlue("[botskt]:") + ` leaving voice channel (requested by ${m.author.username})`);
					message.member.voiceChannel.leave();
					message.channel.send(`<@${message.author.id}> <:blobsalute:454171354212859905>`);

					// clear queue
					queue[message.guild.id] = {};
					queue[message.guild.id].playing = false;
					queue[message.guild.id].songs = [];
				}
			});

			dispatcher.on("end", () => {
				collector.stop();
				if (!leave) {
					queue[message.guild.id].songs.shift()
					play(queue[message.guild.id].songs[0]);
				}
			});

			dispatcher.on("error", err => {
				console.log(chalk.bgRed("[botskt]:") + ` music error\n—\n${err}\n—`)
				message.channel.send(`<@${message.author.id}> oh no <:moon2L:454854433294254080>\n\`\`\`${err}\`\`\``).then(() => {
					collector.stop();
					queue[message.guild.id].songs.shift()
					play(queue[message.guild.id].songs[0]);
				});
			});
		}
	}


	play(queue[message.guild.id].songs[0]);
}

module.exports.modifyQueue = (arg, url, message, info) => {
	if (arg == "reset") {
		queue[message.guild.id] = {};
		queue[message.guild.id].playing = false;
		queue[message.guild.id].songs = [];
	} else if (arg == "add") {
		queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
		//console.log(`[botskt]: added ${info.title} to the queue (requested by ${message.author.username})`);
	}
}

module.exports.getQueue = () => {
	return queue;
}