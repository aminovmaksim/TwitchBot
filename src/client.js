import tmi from "tmi.js";
import * as config from "./config";
let client = new tmi.client(config);
// client.activeChannel = config.channels[0];
client.channels = config.channels;

module.exports = client;
