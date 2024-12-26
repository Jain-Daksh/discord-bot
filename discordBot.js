const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on('messageCreate', (message) => {
  console.log(message.content, 'message')
})
client.on('messageCreate', (message) => {
  if (message.author.bot) return null;
  message.reply({
    content: 'hi from bot',

  })
})


// Log in to Discord with your client's token
client.login(process.env.tokenken);
