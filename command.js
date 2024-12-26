const { Rest, Routes, REST } = require('discord.js')


const commands = [{
  name: 'ping',
  description: "Replies with pong"
}]

const rest = new REST({
  version: '01'
}).setToken(
  process.env.token
)


