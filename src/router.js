import { socialLinks } from "./commands";
import { messageToUser } from "./utils";

const callCommand = (command, messageInfo) => {
  let result = { sendMessage: false, message: "" };

  switch (command.command) {
    case "vk":
      result = socialLinks("vk");
      break;
    default:
      break;
  }

  return result.sendMessage
    ? messageToUser(messageInfo.user.username, result.message)
    : false;
};

module.exports = {
  call: (command, messageInfo) => {
    callCommand(command, messageInfo);
  }
};
