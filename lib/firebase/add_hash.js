const firebase = require("firebase");

const db = require("./firebase");
const add = require("./add");

const add_hash = async (hash) => {
  const done = await add("hashes", {
    hash,
  });
  return done;
};

module.exports = add_hash;
