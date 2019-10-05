export default social => {
  const links = {
    vk: "https://vk.com/aminovmaksim"
  };

  switch (social) {
    case "vk":
      return { sendMessage: true, message: links.vk };
    default:
      break;
  }
};
