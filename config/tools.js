const crypto = require("crypto");
const tools = {
  genString: (len) => {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let str = "";
    for(let x = 0; x < len; x++ ){
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  },
  validateEmail: (email) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
  },
  splitURL: (url, toLower = true) => {
    if( toLower ) url = url.toLowerCase();

    return url.split("/").filter(item => Boolean(item));
  }
};

module.exports = tools;