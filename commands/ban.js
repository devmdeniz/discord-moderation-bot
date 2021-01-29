
const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry: If you want this use command; you must have to  `Ban Members` Permission.");
    let reason = args.slice(1).join(' ')
    if (!args[0]) return message.channel.send(":no_entry: Please mention a user.")
    let user = message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user

    if (!user) return message.channel.send(`I cant find this user.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`I cant find this user.`)
    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`I can't BAN this user because this user is have Manage Messages Permission `)
    if (!reason) reason = 'Please write a reason'
  
    message.channel.send(`Are you sure BAN this user?`)
        let uwu = false;
            while (!uwu) {
                if (choice == 'no' || choice == 'n') return message.channel.send('Proccess Cancelled')
                if (choice !== 'yes' && choice !== 'y' && choice !== 'no' && choice !== 'n') {
                message.channel.send('❓ You can say `yes` or `no`!')
                }
                if (choice == 'yes' || choice == 'y') uwu = true
                }
                if (uwu) {
                try {
                await member.ban(reason + ` | Moderator: ${message.author.tag} - ${message.author.id}`)
  
                message.channel.send(`BANNED USER: **${user.tag}**.`)
                user.send(`**${message.guild.name}** You're banned!**\n*Reason:* \`\`\`${reason}\`\`\``)


				var mod = message.author

				const muteembed = new Discord.RichEmbed()
			  .setTitle('Penal: Ban User')
			  .setThumbnail(user.avatarURL||user.defaultAvatarURL)
			  .addField('Moderator', `${mod}`,true)
			  .addField('Reason', `\`${reason}\``,true)
			  .addField('User', `${user.tag}`,true)
		  	  .setColor("RANDOM")
			msg.guild.channels.get(log).sendEmbed(muteembed)

            } catch(e) {
            message.channel.send(':warning: Bir hata var!')
        }
    } else return console.log('Hata var')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: '',
  usage: 'ban'
};