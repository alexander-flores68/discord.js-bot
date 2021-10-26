import { Client, Intents } from 'discord.js'

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
  ]
})

// Intents.FLAGS.GUILDS is required for use
client.on("ready", () => {
  console.log("Discord bot is ready!")

  const guildId = ""
  const guild = client.guilds.cache.get(guildId)
  let commands = []

  if (guild) {
    commands = guild.commands
  }
  else {
    commands.client.application?.commands
  }

  commands?.create({
    name: "ping",
    description: "responds with 'Pong!'"
  })
  commands?.create({
    name: "hey",
    description: "responds with 'Hello there!'"
  })
  commands?.create({
    name: "commands",
    description: "Gives a list of useable commands with this bot."
  })
})

// FLAGS.GUILD_MESSAGES is required for use
client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) {
    return
  }
  const { commandName } = interaction
  if (commandName === "ping") {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true
    })
  }
  if (commandName === "hey") {
    await interaction.reply({
      content: "Hello there!",
      ephemeral: true
    })
  }
  if (commandName === "commands") {
    await interaction.reply({
      content: `Our full list of commands are: 
        "/ping"
        "/hey"
        "/commands"
      `,
      ephemeral: false
    })
  }
})

// Intents.FLAGS.GUILD_MEMBERS is required for use
client.on("guildMemberAdd", member => {
  
  console.log(`User ${member.user.tag} has joined the server!`)

  let role = member.guild.roles.cache.find(r => r.name === 'Member')

  member.roles.add(role)
})

client.login("")