const {
  CommandInteraction,
  EmbedBuilder,
  version,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
const os = require("systeminformation");
const { msToDuration, formatBytes } = require("../../../handlers/functions");

module.exports = {
  name: "stats",
  description: `See  bot stats`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.EmbedLinks,
  category: "Information",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    let memory = await os.mem();
    let cpu = await os.cpu();
    let cpuUsage = await (await os.currentLoad()).currentLoad;
    let osInfo = await os.osInfo();
    let TotalRam = formatBytes(memory.total);
    let UsageRam = formatBytes(memory.used);

    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setTitle("__**Stats:**__")
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(
            `> ** Please support me at ** 
 • [Twitter](https://twitter.com/janus_matsuda) or [Youtube](https://www.youtube.com/) `
          )
          .addFields([
            {
              name: `Memory`,
              value: `\`${UsageRam} / ${TotalRam}\``,
            },
            {
              name: `Uptime`,
              // value: `<t:${Math.floor(
              //   Date.now() / 1000 - client.uptime / 1000
              // )}:R>`,
              value: `\`${msToDuration(client.uptime)}\``,
            },
            {
              name: `Users`,
              value: `\`${client.guilds.cache.size} \``,
              inline: true,
            },
            {
              name: `Servers`,
              value: `\`${client.guilds.cache.size}\``,
              inline: true,
            },
            {
              name: `Channels`,
              value: `\`${client.channels.cache.size}\``,
              inline: true,
            },
            {
              name: `Node | Discoes version`,
              value: `\`\`\`ini\n${process.version} | v${version}\`\`\``,
              inline: true,
            },
            {
              name: `Ping`,
              value: `\`\`\`ini\n${client.ws.ping}ms\`\`\``,
            },
            {
              name: `CPU usage`,
              value: `\`\`\`ini\n${Math.floor(cpuUsage)}%\`\`\``,
            },
            {
              name: `Platform`,
              value: `\`\`\`ini\n${osInfo.platform}\`\`\``,
              inline: true,
            },
            {
              name: `CPU`,
              value: `\`\`\`ini\n${cpu.brand} | ${osInfo.arch}\`\`\``,
            },
          ])
          .setFooter(client.getFooter(interaction.user)),
      ],
    });
  },
};
