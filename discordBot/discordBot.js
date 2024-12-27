const { default: axios } = require('axios');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { registerCommands } = require('./command'); // Import command registration
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Bot event when ready
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Handle messages
client.on('messageCreate', (message) => {
  console.log(message.content, 'message');
});

// Respond to user with "hi from bot"
client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  message.reply({
    content: 'hi from bot',
  });
});

// Handle user creation command
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('ppcreateuser')) {
    try {
      const args = message.content.split(' ').slice(1);
      const userData = {};

      args.forEach((arg) => {
        const [key, value] = arg.split(':');
        if (key && value) {
          userData[key.trim()] = value.trim().replace(/"/g, '');
        }
      });

      const { username, email, password } = userData;

      if (!username || !email || !password) {
        return message.reply(
          'Invalid format! Use `ppcreateuser username:<name> email:<email> password:<password>`'
        );
      }

      const response = await axios.post('http://localhost:3011/api/users', {
        username,
        email,
        password,
      });

      if (response.data.success) {
        message.reply(
          `User created successfully! Username: ${response.data.result.username}, Email: ${response.data.result.email}`
        );
      } else {
        message.reply(`Failed to create user: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.reply(`Failed to create user: ${error.response.data.message}`);
      } else {
        console.error('Error creating user:', error.message);
        message.reply('An error occurred while creating the user. Please try again.');
      }
    }
  }

  if (message.content.startsWith('create')) {
    const url = message.content.split('create')[1];
    return message.reply({
      content: "creating" + url,
    });
  }
});

// Handle interactions (like slash commands)
client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!");
});

// Function to start the bot and login
const startBot = async (token, clientId) => {
  await registerCommands('1321901989071687680', process.env.token);

  client
    .login(process.env.token)
    .then(() => {
      console.log('Discord bot is running...');
    })
    .catch((err) => {
      console.error('Failed to login to Discord:', err);
    });
};

module.exports = { startBot };
