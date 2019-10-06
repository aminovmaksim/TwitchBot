import client from "./client";
import { resolve } from "./commandResolver";
import * as config from "./config";
const axios = require('axios');

client.connect();

var viewers;
init_viewers();
isStreamLive();

// Check if stream is online every 10 minutes
setInterval(function() {
  isStreamLive();
}, 600000);

// Commands
client.on("chat", (channel, user, message, self) => {
  if (user.username === "zortan3301") { // bot message
    return;
  }

  // if (!containsObject(user.username, viewers)) {
  //   viewers.push(user.username);
  //   client.action(channel, user.username + hello[Math.floor(Math.random() * hello.length)]);
  // }

  // if message has symbol whats mean command - !
  if (message.indexOf("!") !== -1) {
    resolve(channel, user, message);
    return;
  }
});

// client.on("join", function (channel, username, self) {
//   if (username === "zortan3301") // that is me
//     return;

//   client.action(channel, username + hellos[Math.floor(Math.random() * hello.length)]);
// });

// clear viewers array if stream is offline
function isStreamLive() {
  var url_string = "https://api.twitch.tv/helix/streams?user_id=138140188"; // user_id (https://api.twitch.tv/helix/users?login=<USERNAME>)
  axios.get(url_string, {
    headers: {
      "Client-ID" : config.client_id
    }
  })
  .then(function (response) {
    // console.log(response['data']);
    var res = response['data']
    if (res['data'].length === 0) {
      console.log("DEBUG: Stream is offline");
      viewers = [];
    } else {
      console.log("DEBUG: Stream is online");
      return;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Initialize viewers array when bot has been launched
function init_viewers() {
  var url_string = "https://tmi.twitch.tv/group/user/pray_play/chatters";
  axios.get(url_string)
  .then(function (response) {
    viewers = response['data']['chatters']['viewers'];
    viewers.concat(other_bots);
    viewers.concat(response['data']['chatters']['vips']);
    viewers.concat(response['data']['chatters']['moderators']);
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

const hello = [
  ", приветик!!! prayplHello",
  ", дарова prayplHello",
  ", prayplHello prayplHello prayplHello",
  ", привет prayplHello",
  ", привеееет prayplHello",
  ", хай prayplHello",
  ", ку prayplHello",
  ", друтути prayplHello",
  ", хеллоу prayplHello",
  ", хай prayplHello",
  ", хаю-хай prayplHello",
  ", привет prayplHello, как дела?",
  ", дарова prayplHello",
  ", дароуууу prayplHello"
]

const other_bots = [
  "moobot",
  "streamelements",
  "nightbot",
  "pray_play"
]
