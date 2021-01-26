const Discord = require('discord.js')
const db = require('quick.db');
 
exports.run = async (client, message, args) => {
 
 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('If you want use this command; you must have **Manage Messages** Permission')
  .setColor("0000A0")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let mlog = message.mentions.channels.first()
  let sıfırla = db.fetch(`mlog_${message.guild.id}`)
if(args[0] === "reset") {
    if(!sıfırla) {
      message.channel.send(`Log channel already not setted.`)
                    
      return
    }
    db.delete(`mlog_${message.guild.id}`)
    message.channel.send(`Log channel setted succesfully.`)
              
    return
  }
  if (!mlog) {
    return message.channel.send(
    `Please tag a channel`)                     
  }
  db.set(`mlog_${message.guild.id}`, mlog.id)
  message.channel.send(`✅|Log channel setted successfully for ${mlog}`)
  };
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setlog'],
    permLevel: 0
}
 
exports.help = {
    name: 'log',
    description: '',
    usage: ''
}