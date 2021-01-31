const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");

exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("If you want use this command, you must have `Ban Members` Permission");
 if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`ERROR! \`${user.tag}\` is a Moderator or Admin.`)
let log = await db.fetch(`mlog_${msg.guild.id}`)
if (!log) return msg.channel.send("Log channel is not setted, Please use `"+ settings.prefix +"log #tagchannel` Command!") 
var mod = msg.author
var time = args[1]
 let rson = args.slice(2).join(' ')
 
  if (!user) return msg.reply('You don\'t mention a user')
 if (!time) return msg.reply('Please write a time, Ex : 1s/1m/1h/1d/1w')
if (!rson) return msg.reply('You didn\'t say a reason!')
 
 
 
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
.replace(`d`," Day")
.replace(`s`," Second")
.replace(`h`," Hour")
.replace(`m`," Minute")
.replace(`w`," Week")
  msg.channel.send(`${user} is a jailed , ${mutetime} time!`)
db.set(`jailed_${msg.guild.id + user.id}`, 'jailed')
db.set(`jailtime_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                        
  const muteembed = new Discord.RichEmbed()
        .setTitle('Penal: Jail')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderator', `${mod}`,true)
      .addField('Reason', `\`${rson}\``,true)
      .addField('User', `<@${user.id}>`,true)
      .addField('Time',`\`${mutetime}\``)
  . setColor("RANDOM")
msg.guild.channels.get(log).sendEmbed(muteembed)
 
  setTimeout(function(){
db.delete(`jailed_${msg.guild.id + user.id}`)
    user.removeRole(mute.id)
 msg.channel.send(`<@${user.id}> Now is not a jailed.`)
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