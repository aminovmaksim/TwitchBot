import client from "./client";
import { resolve } from "./commandResolver";
const axios = require('axios');

client.connect();

// viewers will be dropped every 24 hours
var viewers;
init_viewers();
setInterval(function() {
  viewers = []
}, 86400000);

setInterval(function() {
  JSON.stringify(viewers)
}, 10000);


// Commands
client.on("chat", (channel, user, message, self) => {
  if (user.username === "zortan3301") { // bot message
    return;
  }

  if (!containsObject(user.username, viewers)) {
    viewers.push(user.username);
    client.action(channel, user.username + hellos[Math.floor(Math.random() * hellos.length)]);
  }

  // if message has symbol whats mean command - !
  if (message.indexOf("!") !== -1) {
    resolve(channel, user, message);
    return;
  }
});

// client.on("join", function (channel, username, self) {
//   if (username === "zortan3301") // bot came
//     return;
  
//   other_bots.forEach(function(nick) {
//     console.log(username + " : " + nick) // ignore other bots
//     if (username === nick)
//       return;
//   })

//   client.action(channel, username + hellos[Math.floor(Math.random() * hellos.length)]);
// });

function init_viewers() {
  var url_string = "https://tmi.twitch.tv/group/user/pray_play/chatters";
  axios.get(url_string)
  .then(function (response) {
    viewers = response['data']['chatters']['viewers'];
    console.log(JSON.stringify(viewers));
  })
  .catch(function (error) {
    console.log(error);
  });
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }

  return false;
}

const hellos = [
  ", приветик!!! prayplHello",
  ", дарова prayplHello",
  " prayplHello prayplHello prayplHello",
  ", привет prayplHello",
  ", привеееет prayplHello",
  " prayplHello хай",
  " ку prayplHello"
]

const other_bots = [
  'moobot',
  'streamelements'
]
