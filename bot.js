const Discord = require("discord.js");
const client = new Discord.Client(); 
const prefix = 'PH'
/////
/////  
/////
const Util = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const ytdl = require('ytdl-core');
const fs = require('fs');
/////
/////
/////
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`- Panda H , Music🎸 '`,"http://twitch.tv/Mohamed192837465")
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});
/////
/////
/////
client.on('message', message => {
    if (message.content === 'HHelp') {
        let helpEmbed = new Discord.RichEmbed()
        .setTitle('**أوامر الميوزك...**')
        .addField('**__Play__**', '**لتشغيل اغنية**')
        .addField('**__Join__**', '**دخول رومك الصوتي**')
        .addField('**__Disconnect__**', '**الخروج من رومك الصوتي**')
        .addField('**__Skip__**', '**تخطي الأغنية**')
        .addField('**__Pause__**', '**ايقاف الاغنية مؤقتا**')
        .addField('**__Resume__**', '**تكملة الاغنية**')
        .addField('**__Queue__**', '**اظهار قائمة التشغيل**')
	.addField('**__Np__**', '**اظهار الاغنية اللي انت مشغلها حاليا**')
	.addField('**__Vol__**', '**لتغيير درجة الصوت 100 - 0**')
      message.channel.send(helpEmbed);
    }
});
/////
/////
/////
client.on('message', message => {
                                if(!message.channel.guild) return;
                        if (message.content.startsWith('ping')) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setColor('RANDOM')
                        .addField('**Time Taken:**',msg + " ms 📶 ")
                        .addField('**WebSocket:**',api + " ms 📶 ")
         message.channel.send({embed:embed});
                        }
                    });

/////

const adminprefix = "$";
const devs = ['368768446327947265,481890802788859924'];

client.on('message', message => {
if(message.content === adminprefix + "restart") {
      if (!devs.includes(message.author.id)) return;
          message.channel.send(` Restarting : ${message.author.username}`);
        console.log(`⚠️ جاري اعادة تشغيل البوت... ⚠️`);
        client.destroy();
        child_process.fork(__dirname + "/bot.js");
        console.log(`تم اعادة تشغيل البوت`);
    }
  
  });

/////
/////
/////
client.on('message', message => {
 if(message.content.startsWith(prefix + "Join")) {
message.member.voiceChannel.join();
}
});
/////
/////
/////

/////
/////
/////
client.on('ready', () => {
    client.user.setStatus("idle");
 
 });
/////
/////
/////
client.on('message', message => {
if (message.content.startsWith(prefix + "Uptime")) {
   let uptime = client.uptime;

   let days = 0;
   let hours = 0;
   let minutes = 0;
   let seconds = 0;
   let notCompleted = true;

   while (notCompleted) {

       if (uptime >= 8.64e+7) {

           days++;
           uptime -= 8.64e+7;

       } else if (uptime >= 3.6e+6) {

           hours++;
           uptime -= 3.6e+6;

       } else if (uptime >= 60000) {

           minutes++;
           uptime -= 60000;

       } else if (uptime >= 1000) {
           seconds++;
           uptime -= 1000;

       }

       if (uptime < 1000)  notCompleted = false;

   }

   message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");


}
});
/////
/////
/////


/////
/////
/////


/////
/////
/////

client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
    
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
        
        if (!voiceChannel) return msg.channel.send("**لا أستطيع العثور عليك في أي روم صوتي**");
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        
        if (!permissions.has('CONNECT')) {

			return msg.channel.send("**ليس لدي برمشن دخول كافية للانضمام إلى رومك الصوتي**");
        }
        
		if (!permissions.has('SPEAK')) {

			return msg.channel.send("**ليس لدي برمشن تكلم كافية للتحدث في رومك الصوتي**");
		}

		if (!permissions.has('EMBED_LINKS')) {

			return msg.channel.sendMessage("**ليس لدي برمشن كافية لإدخال عناوين URL**")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            

			for (const video of Object.values(videos)) {
                
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, msg, voiceChannel, true); 
            }
			return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
		} else {

			try {

                var video = await youtube.getVideo(url);
                
			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right: **: نتائج بحث **| **__YouTube__**")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                    
					.setColor("#ee9404")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
					
/////////////////					
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('**لم تختار رقم**');
                    }
                    
					const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    
				} catch (err) {

					console.error(err);
					return msg.channel.send("**لم اجد آي نتآئج**");
				}
			}

            return handleVideo(video, msg, voiceChannel);
            
        }
        
	} else if (command === `skip`) {

		if (!msg.member.voiceChannel) return msg.channel.send("**يجب ان تكون في روم صوتي لتشغيل اوامر الموسيقى**");
        if (!serverQueue) return msg.channel.send("**ليس هناك قائمة انتظار للتخطي**");

		serverQueue.connection.dispatcher.end('**حسنا , تخطي**');
        return undefined;
        
	} else if (command === `stop`) {

		if (!msg.member.voiceChannel) return msg.channel.send("**يجب ان تكون في روم صوتي لتشغيل اوامر الموسيقى**");
        if (!serverQueue) return msg.channel.send("**ليس هناك قائمة انتظار للتوقيف**");
        
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**حسنًا , تم إيقافه وفصله عن الروم الصوتي الخاص بك**');
        return undefined;
        
	} else if (command === `vol`) {

		if (!msg.member.voiceChannel) return msg.channel.send("**يجب ان تكون في روم صوتي لتشغيل اوامر الموسيقى**");
		if (!serverQueue) return msg.channel.send('**يمكنك فقط استخدام هذا الأمر أثناء تشغيل الموسيقى**');
        if (!args[1]) return msg.channel.send(`**مُستوى الصوت** | **__${serverQueue.volume}__**`);
        
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
        
        return msg.channel.send(`**مُستوى الصوت الأن** | **__${args[1]}__**`);

	} else if (command === `np`) {

		if (!serverQueue) return msg.channel.send('**لا يوجد قائمة انتظار**');
		const embedNP = new Discord.RichEmbed()
	    .setDescription(`Now playing **${serverQueue.songs[0].title}**`)
        return msg.channel.sendEmbed(embedNP);
        
	} else if (command === `queue`) {
		
		if (!serverQueue) return msg.channel.send('**لا يوجد قائمة انتظار**');
		let index = 0;
//	//	//
		const embedqu = new Discord.RichEmbed()
        .setTitle("**أغاني قائمة الانتظار** :")
        .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#ee9404")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('**حسنًا , متوقف مؤقتًا**');
		}
		return msg.channel.send('**لا يوجد قائمة انتظار لإيقاف مؤقت**');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            return msg.channel.send('**حسنا , استؤنفت**');
            
		}
		return msg.channel.send('**قائمة الانتظار فارغة**');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	

	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}!`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Can't join this channel: ${error}!`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`**${song.title}**, just added to the queue! `);
	} 
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`**__${song.title}__**, **تم تشغيل الاغنية بنجاح**`);
}
/////
/////
/////
client.login(process.env.BOT_TOKEN);
