const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");
const settings = require("../settings.json");

exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("if you want use this command; you must have `BAN MEMBERS` Permission.");
 if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`ERROR! \`${user.tag}\` is a ADMIN or MOD (have a Ban Members Permission).`)
let log = await db.fetch(`vlog_${msg.guild.id}`)
  if (!log) return msg.channel.send("Log Channel is not setted! If you want set, you can use `"+ settings.prefix +"log #tagchannel` command !") 
var mod = msg.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')
 
  if (!user) return msg.reply('Please mention anyone')
 if (!reason) return msg.reply('Please write a time! examples : 1s/1m/1h/1d/1w')
if (!sebep) return msg.reply('Please write a reason!')
 
 
 
  let mute = msg.guild.roles.find(r => r.name === "voicemuted");
        
  let mutetime = args[1]
if(!mute){
      mute = await msg.guild.createRole({
        name: "voicemuted",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          CONNECT: false,
          SPEAK: false,
          USE_VAD: false
        });
      });
 
    }
 
 
  await user.addRole(mute.id);
msg.channel.send(``)
  let mutezaman = args[1]
  .replace(`d`," Day")
  .replace(`s`," Second")
  .replace(`h`," Hour")
  .replace(`m`," Minute")
  .replace(`w`," Week")
    msg.channel.send(`${user} is now Muted for, ${mutezaman} time!`)
db.set(`muted_${msg.guild.id + user.id}`, 'voicemuted')
db.set(`time_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                        
  const muteembed = new Discord.RichEmbed()
  .setTitle('Penal: Voice Mute')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderator', `${mod}`,true)
      .addField('Reason', `\`${sebep}\``,true)
      .addField('User', `<@${user.id}>`,true)
      .addField('Time',`\`${mutezaman}\``)
  . setColor("RANDOM")
msg.guild.channels.get(log).sendEmbed(muteembed)
 
  setTimeout(function(){
db.delete(`muted_${msg.guild.id + user.id}`)
    user.removeRole(mute.id)
 msg.channel.send(`<@${user.id}> now can speak.`)
  }, ms(mutetime));
 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["voice-mute"],
  permLevel: 0
};
 
exports.help = {
  name: "vmute",
  description: "",
  usage: ""
};