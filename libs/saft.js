var crypto = require("crypto");
var config = require("../config/index");

function encrypt(str) {
  var cipher = crypto.createCipher("aes256", config.secret_key);
  var enc = cipher.update(str, "utf8", "hex");
  enc += cipher.final("hex");
  return enc;
}

function decrypt(str) {
  var decipher = crypto.createDecipher("aes256", config.secret_key);
  var dec = decipher.update(str, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

module.exports = {
  encrypt,
  decrypt
};
