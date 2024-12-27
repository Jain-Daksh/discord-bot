const { Routes, REST } = require('discord.js')

const registerCommands = async (clientId, token) => {
  console.log('token', clientId, token)
  const commands = [{
    name: 'ping',
    description: "Replies with pong"
  },
    // {
    //   name: 'createUser',
    //   description: "create a new user"
    // }
  ]

  const rest = new REST({
    version: '10'
  }).setToken(
    process.env.token
  )


  try {
    console.log("Registering commands...");
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("Commands registered successfully!");
  } catch (error) {
    console.error('Error registering commands:', error);
  }

}





module.exports = { registerCommands };
