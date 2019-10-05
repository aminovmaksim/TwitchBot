import config from "config";

module.exports = {
  options: {
    debug: config.get("options.debug")
  },
  connection: {
    cluster: config.get("connection.cluster"),
    reconnect: config.get("connection.reconnect")
  },
  identity: {
    username: config.get("bot.username"),
    password: config.get("bot.oauth_token")
  },
  channels: config.get("channels"),
  client_id: config.get("client_id")
};
