const { Routes, REST } = require('discord.js');

const registerCommands = async (clientId, token) => {
  const commands = [
    {
      name: 'ping',
      description: 'Replies with pong',
    },
    {
      name: 'createuser',
      description: 'Create a new user',
      options: [
        {
          type: 3,
          name: 'username',
          description: 'Enter the username',
          required: true,
        },
        {
          type: 3,
          name: 'email',
          description: 'Enter the email address',
          required: true,
        },

      ],
    },
    {
      name: 'ppgetuser',
      description: 'Get user data by userID',
      options: [
        {
          type: 3,
          name: 'username',
          description: 'Enter the user ID (username)',
          required: true,
        },
      ],
    },
  ];

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('Registering commands...');
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log('Commands registered successfully!');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
};

module.exports = { registerCommands };
