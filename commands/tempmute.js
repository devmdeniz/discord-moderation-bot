const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");
const settings = require("../settings.json")
exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("If you want use this command; You must have `Ban Members` Permission.");
 if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`ERROR! \`${user.tag}\` is a ADMIN or MOD (have a Ban Members Role).`)
let log = await db.fetch(`mlog_${msg.guild.id}`)
  if (!log) return msg.channel.send("Log channel is not setted. Please use `"+ settings.prefix +"log #tagchannel` Command !") 
var mod = msg.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')
 
  if (!user) return msg.reply('Please mention anyone')
 if (!reason) return msg.reply('Please write a time! examples : 1s/1m/1h/1d/1w')
if (!sebep) return msg.reply('Please write a reason!')
 
 
 
  let mute = msg.guild.roles.find(r => r.name === "muted");
        
  let mutetime = args[1]
if(!mute){
      mute = await msg.guild.createRole({
        name: "muted",
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
 
 
  await user.addRole(mute.id);
msg.channel.send(``)
  let mutezaman = args[1]
.replace(`d`," Day")
.replace(`s`," Second")
.replace(`h`," Hour")
.replace(`m`," Minute")
.replace(`w`," Week")
  msg.channel.send(`${user} is now Muted for, ${mutezaman} time!`)
db.set(`muted_${msg.guild.id + user.id}`, 'muted')
db.set(`channeltime_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                        
  const muteembed = new Discord.RichEmbed()
        .setTitle('Penal: Mute')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderatör', `${mod}`,true)
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
  aliases: ["tempmute","mutechannel"],
  permLevel: 0
};
 
exports.help = {
  name: "channelmute",
  description: "",
  usage: ""
};