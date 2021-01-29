const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");

exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("Bu komudu kullanabilmek için `Ban` yetkisine sahip olmanız gerek.");
 if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`Hata! \`${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`)
let log = await db.fetch(`mlog_${msg.guild.id}`)
if (!log) return msg.channel.send("Log kanalı ayarlanmadı, lütfen `"+ settings.prefix +"log #kanaletiket` Komutunu kullanın !") 
var mod = msg.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')
 
  if (!user) return msg.reply('Kullanıcı Etiketlemedin')
 if (!reason) return msg.reply('Süre Belirtmedin! Seçeneklerin : 1s/1m/1h/1d/1w')
if (!sebep) return msg.reply('Sebep Belirtmedin!')
 
 
 
  let mute = msg.guild.roles.find(r => r.name === "jail");
        
  let mutetime = args[1]
if(!mute){
      mute = await msg.guild.createRole({
        name: "jail",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
 
    }
 
 
  await(user.addRole(mute.id));
msg.channel.send(``)
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  msg.channel.send(`${user} Adlı Kişi , ${mutezaman} hapse girdi!`)
db.set(`jailed_${msg.guild.id + user.id}`, 'jailed')
db.set(`jailtime_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                        
  const muteembed = new Discord.RichEmbed()
        .setTitle('Ceza: Jail')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderatör', `${mod}`,true)
      .addField('Sebep', `\`${sebep}\``,true)
      .addField('Kullanıcı', `<@${user.id}>`,true)
      .addField('Süre',`\`${mutezaman}\``)
  . setColor("RANDOM")
msg.guild.channels.get(log).sendEmbed(muteembed)
 
  setTimeout(function(){
db.delete(`jailed_${msg.guild.id + user.id}`)
    user.removeRole(mute.id)
 msg.channel.send(`<@${user.id}> Hapis yasağın kaldırıldı.`)
  }, ms(mutetime));
 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["jailed"],
  permLevel: 0
};
 
exports.help = {
  name: "jail",
  description: "",
  usage: ""
};