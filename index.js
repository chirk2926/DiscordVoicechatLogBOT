const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const token = 'token';
const channelId = 'channelID';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.member.user.bot) return; //BOT自身の操作は無視
  const member = newState.member;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  if (!oldChannel && newChannel) { //VC参加時
    const userName = member.displayName;
    const channelName = newChannel.name;
    const embed = new MessageEmbed()
      .setTitle(`${userName} がボイスチャンネルに参加しました`)
      .setDescription(`チャンネル名: ${channelName}`)
      .setColor('GREEN')
      .setTimestamp();
    client.channels.cache.get(channelId).send({ embeds: [embed] });
  } else if (oldChannel && !newChannel) { //VC退出時
    const userName = member.displayName;
    const channelName = oldChannel.name;
    const embed = new MessageEmbed()
      .setTitle(`${userName} がボイスチャンネルから退出しました`)
      .setDescription(`チャンネル名: ${channelName}`)
      .setColor('RED')
      .setTimestamp();
    client.channels.cache.get(channelId).send({ embeds: [embed] });
  } else if (oldChannel && newChannel && oldChannel.id !== newChannel.id) { //VC移動時
    const userName = member.displayName;
    const oldChannelName = oldChannel.name;
    const newChannelName = newChannel.name;
    const embed = new MessageEmbed()
      .setTitle(`${userName} がボイスチャンネルを移動しました`)
      .setDescription(`移動前: ${oldChannelName}\n移動後: ${newChannelName}`)
      .setColor('YELLOW')
      .setTimestamp();
    client.channels.cache.get(channelId).send({ embeds: [embed] });
  }
});

client.login(token);
