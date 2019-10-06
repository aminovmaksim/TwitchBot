import client from "./client";
import { resolve } from "./commandResolver";
import * as config from "./config";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

client.connect();

var channels; // contains id for each channel
var viewers; // contains array of viewers of each channel

init();

// Commands
client.on("chat", (channel, user, message, self) => {
  if (user.username === config.identity.username) { // bot message
    return;
  }

  if (!isAlreadyViewer(channel, user.username)) {
    proceedNewViewer(channel, user.username);
    client.action(channel, user.username + hello[Math.floor(Math.random() * hello.length)]);
  }

  message = message.toLowerCase();

  if (message.includes("zortan") || message.includes("зортан")) {
    if (message.includes("бот") || message.includes("mrdestructoid")) {
      client.action(channel, user.username + bot_angry[Math.floor(Math.random() * bot_angry.length)]);
      return;
    }
    client.action(channel, user.username + default_answers[Math.floor(Math.random() * default_answers.length)]);
  }
});


// Initialize when bot has been launched
function init() {
  channels = [];
  viewers = [];
  for (var i = 0; i < client.channels.length; i++) {
    channels[i] = httpGetChannelId(client.channels[i]);
    viewers[i] = httpGetViewers(client.channels[i]);
  }
}

// If stream is offline then clear viewers array
setInterval(function() {
  for (var i = 0; i < channels.length; i++) {
    if (!isStreamOnline(channels[i])) {
      viewers[i] = [];
    }
  }
}, 600000);

// Get current stream viewers
function httpGetViewers(channel) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `https://tmi.twitch.tv/group/user/${channel}/chatters`, false);
  xmlHttp.setRequestHeader("Client-ID", config.client_id);
  xmlHttp.send(null);

  var response = JSON.parse(xmlHttp.responseText);
  var v = response.chatters.viewers;
  v = v.concat(response.chatters.vips);
  v = v.concat(response.chatters.moderators);

  return v;
}

// Get channel Id
function httpGetChannelId(channel) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `https://api.twitch.tv/helix/users?login=${channel}`, false);
  xmlHttp.setRequestHeader("Client-ID", config.client_id);
  xmlHttp.send(null);

  var response = JSON.parse(xmlHttp.responseText);
  return response.data[0].id;
}

// Check whether stream is online or not
function isStreamOnline(channelId) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `https://api.twitch.tv/helix/streams?user_id=${channelId}`, false);
  xmlHttp.setRequestHeader("Client-ID", config.client_id);
  xmlHttp.send(null);

  var response = JSON.parse(xmlHttp.responseText);
  if (response['data'].length === 0) {
    console.log(`DEBUG: Stream ${channelId} is offline`);
    return false;
  } else {
    console.log(`DEBUG: Stream ${channelId} is online`);
    return true;
  }
}

function isAlreadyViewer(channel, username) {
  var i = client.channels.indexOf(channel);
  return containsObject(username, viewers[i]);
}

function proceedNewViewer(channel, username) {
  var i = client.channels.indexOf(channel);
  viewers[i].push(username);
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
  ", приветик!!! muldZdarova ",
  ", дарова muldZdarova ",
  ", muldZdarova muldZdarova muldZdarova ",
  ", привет muldZdarova",
  ", привеееет muldZdarova",
  ", хай muldZdarova",
  ", ку muldZdarova",
  ", друтути muldZdarova",
  ", хеллоу muldZdarova",
  ", хай muldZdarova",
  ", хаю-хай muldZdarova",
  ", привет muldZdarova, как дела?",
  ", дарова muldZdarova",
  ", дароуууу muldZdarova",
  ", АХОЙЙ muldZdarova",
  ", алоха muldZdarova"
]

const bot_angry = [
  ", сам ты бот",
  ", я не бооот",
  ", да вы достали называть меня ботом",
  ", да я бот и че ты мне сделаешь? а?",
  ", еще раз назовешь меня ботом, я уйду (нет)",
  ", херасе, вот это новости",
  ", и че?",
  ", все высказал?",
  ", легче стало?",
  ", еще я филантроп, гений и просто кодзима",
  ", тут сыглы",
  ", сам ты бот MrDestructoid"
]

const default_answers = [
  ", я чет хз на самом деле",
  ", наверное скорее да, чем нет",
  ", я в этом не разбираюсь, да и оно мне собственно до пизды",
  ", а что ты сам думаешь?",
  ", а к этому вопросу я не готовился",
  ", надо разобраться в этом вопросе",
  ", на все воля божья",
  ", ну а хули?",
  ", я не знаю",
  ", ну, это как посмотреть",
  ", я вас услышал",
  ", нет",
  ", точно нет",
  ", спорненько ...",
  ", ну такое",
  ", не видишь, я бухаю??? ",
  ", чо?",
  ", а что бы на это сказал Иисус?",
  ", я в этом не разбираюсь, да и оно мне собственно до пизды",
  ", извините, я не говорю по-еблански",
  ", ты сейчас серьезно?",
  ", потому что гладиолус",
  ", а зачем ?",
  ", потому что конь в ванной",
  ", потому что ТАК ЗАДУМАНО",
  ", потому что крокодил ходит лежа"
]

