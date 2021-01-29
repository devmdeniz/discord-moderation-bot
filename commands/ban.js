
const Discord = require('discord.js');
const db = require('quick.db');
const slog = require("../slog.json")

exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry: Bu komudu kullanabilmek için `Üyeleri Yasakla` yetkisine sahip olmanız gerek.");
    let reason = args.slice(1).join(' ')
    if (!args[0]) return message.channel.send(":no_entry: Yasaklamak istediğiniz kullanıcıyı etiketleyiniz.")
    let user = message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user

    if (!user) return message.channel.send(`${slog.basarisiz} Etiketlediğin kullanıcıyı sunucuda bulamadım.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`${slog.basarisiz} Etiketlediğin kullanıcıyı sunucuda bulamadım.`)
    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${process.env.basarisiz} Kendi yetkimin üstündeki kişileri yasaklayamam.`)
    if (!reason) reason = 'Neden belirtilmemiş.'
  
    message.channel.send(`${user.tag}, adlı kullanıcıyı sunucudan yasaklayacağım emin misiniz? Eminseniz \`e\` işlemi iptal etmek ise \`h\` olarak cevaplayınız.`)
        let uwu = false;
            while (!uwu) {
                if (choice == 'hayır' || choice == 'h') return message.channel.send('🚀 İşlem iptal **edildi.**')
                if (choice !== 'evet' && choice !== 'e') {
                message.channel.send('❓ Lütfen sadece **evet (e)** veya **hayır (h)** ile cevap verin.')
                }
                if (choice == 'evet' || choice == 'e') uwu = true
                }
                if (uwu) {
                try {
                await member.ban(reason + ` | Yetkili: ${message.author.tag} - ${message.author.id}`)
  
                message.channel.send(`${slog.basarili} **${user.tag}** adlı kullanıcı sunucudan yasaklandı.`)
                user.send(`**${message.guild.name}** adlı sunucudan **banlandınız!**\n*Sebep:* \`\`\`${reason}\`\`\``)


				var mod = message.author

				const muteembed = new Discord.RichEmbed()
			  .setTitle('Ceza: Sunucudan Yasaklama')
			  .setThumbnail(user.avatarURL||user.defaultAvatarURL)
			  .addField('Moderatör', `${mod}`,true)
			  .addField('Sebep', `\`${reason}\``,true)
			  .addField('Kullanıcı', `${user.tag}`,true)
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