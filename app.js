require('dotenv').config();
const Discord = require("discord.js");
const inspirobot = new Discord.Client();
const request = require("request");
const token = process.env.DISCORD_API_TOKEN;

inspirobot.login(token);

inspirobot.on('ready', () => {
  console.log(`Logged in as ${inspirobot.user.tag}!`);
  inspirobot.user.setGame('!help');
});

inspirobot.on('message', msg => {
  if (msg.content === '!inspirome') {
    request('http://inspirobot.me/api?generate=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        msg.channel.send({
          embed: {
            color: 3447003,
            description: "Here's a motivational image for you! :wink:",
            image: {
              url: body
            }
          }
        });
      }
      else {
        var errimage = 'http://inspirobot.me/website/images/inspirobot-dark-green.png';
        msg.channel.send({
          embed: {
            color: 3447003,
            description: "Unfortunately we can't inspire you at the moment. :frowning2:",
            image: {
              url: errimage
            }
          }
        });
      }
    });
  } else if (msg.content === '!help') {
    msg.channel.send({
      embed: {
        color: 3447003,
        title: "InspiroBot Help Command",
        description: "Type **!help** to see available command",
        fields: [{
          name: "Commands",
          value: "**!inspirome** - Display motivational image"
        }]
      }
    });
  }
});