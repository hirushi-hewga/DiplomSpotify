const shorten = (text, max = 20) => {
  return text ? text.length > max ? text.slice(0, max) + "..." : text : "";
};

export default shorten;