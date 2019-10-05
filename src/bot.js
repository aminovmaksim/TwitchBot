import client from "./client";
import { resolve } from "./commandResolver";
client.connect();

// Commands
client.on("chat", (channel, user, message, self) => {
  if (self) return; // bot message

  // if message has symbol whats mean command - !
  if (message.indexOf("!") !== -1) {
    resolve(channel, user, message);
    return;
  }

  client.action(channel, user.username + " написал " + message);
});

client.on("join", function (channel, username, self) {
  if (username === "zortan3301") // bot came
    return;

  client.action(channel, username + hellos[Math.floor(Math.random() * hellos.length)]);
});

const hellos = [
  ", приветик!!! prayplHello",
  ", дарова prayplHello",
  " praypHello prayplHello prayplHello",
  ", привет prayplHello",
  ", привеееет prayplHello",
  " prayplHello хай",
  " ку prayplHello"
]
