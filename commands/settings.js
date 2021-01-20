const Discord = require('discord.js')
const db = require('quick.db');
 
exports.run = async (client, message, args) => {
 
 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.')
  .setColor("0000A0")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let mlog = message.mentions.channels.first()
  let sıfırla = db.fetch(`mlog_${message.guild.id}`)
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(`Log Kanalı zaten ayarlı değil.`)
                    
      return
    }
    db.delete(`mlog_${message.guild.id}`)
    message.channel.send(`Log Kanalı başarıyla sıfırlandı.`)
              
    return
  }
  if (!mlog) {
    return message.channel.send(
    `Lütfen log kanalını etiketleyin`)                     
  }
  db.set(`mlog_${message.guild.id}`, mlog.id)
  message.channel.send(`✅|Log Kanalı başarıyla ${mlog} olarak ayarlandı.`)
  };
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['log'],
    permLevel: 0
}
 
exports.help = {
    name: 'log',
    description: '',
    usage: ''
}