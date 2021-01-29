// enable-pnpm-------------------------------------------------------------
const settings = require("./settings.json");
const chalk = require("chalk");
const Discord = require("discord.js");
const discord = require("discord.js");
const db = require("quick.db");
const client = new discord.Client({
  disableEveryone: true,
  disabledEvents: ["TYPING_START"]
});
const fs = require("fs");
const { stripIndents, oneLine } = require("common-tags");
const moment = require("moment");
const snekfetch = require("snekfetch");
require("./util/eventLoader")(client);
const { join } = require("path");
const { readdirSync } = require("fs");
const ms = require("ms");
const { PREFIX } = require("./settings.json");
const secret = require("./secret.json");

var prefix = settings.prefix;
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

//============================================================================================
//Important
//============================================================================================

//============================================================================================
//Important
//============================================================================================

//============================================================================================
//Important
//============================================================================================

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} commands to be installed.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === settings.owner) permlvl = 4;
  if (message.author.id === settings.owner2) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

//============================================================================================
//Important
//============================================================================================

//============================================================================================
//Important
//============================================================================================

//============================================================================================
//Important
//===========================================================================================
client.on('guildMemberAdd', async(member) => {
  let mute = member.guild.roles.find(r => r.name === "muted");
 let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
 let süre = db.fetch(`süre_${member.id + member.guild.id}`)
 if (!mutelimi) return;
 if (mutelimi == "muteli") {
 member.addRole(mute.id)
  
 member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
  setTimeout(function(){
 db.delete(`muteli_${member.guild.id + member.id}`)
     member.send(`<@${member.id}> Muten açıldı.`)
     member.removeRole(mute.id);
   }, ms(süre));
 }
 })



 client.on('guildMemberAdd', async(member) => {
  let mute = member.guild.roles.find(r => r.name === "voicemuted");
 let mutelimi = db.fetch(`sesmuteli_${member.guild.id + member.id}`)
 let süre = db.fetch(`sessüre_${member.id + member.guild.id}`)
 if (!mutelimi) return;
 if (mutelimi == "sesmuteli") {
 member.addRole(mute.id)
  
 member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
  setTimeout(function(){
 db.delete(`sesmuteli_${member.guild.id + member.id}`)
     member.send(`<@${member.id}> Sesli Susturman açıldı.`)
     member.removeRole(mute.id);
   }, ms(süre));
 }
 })

 client.on('guildMemberAdd', async(member) => {
  let mute = member.guild.roles.find(r => r.name === "jailed");
 let mutelimi = db.fetch(`jailed_${member.guild.id + member.id}`)
 let süre = db.fetch(`jailtime_${member.id + member.guild.id}`)
 if (!mutelimi) return;
 if (mutelimi == "jailed") {
 member.addRole(mute.id)
  
 member.send("Jailliyken sunucudan ciktigin icin tekrardan mutelendin!")
  setTimeout(function(){
 db.delete(`jailed_${member.guild.id + member.id}`)
     member.send(`<@${member.id}> Hapis Cezan Kaldırıldı.`)
     member.removeRole(mute.id);
   }, ms(süre));
 }
 })
 

client.login(secret.TOKEN);
