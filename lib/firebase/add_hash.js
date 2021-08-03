const firebase = require("firebase");

const db = require("./firebase");
const add = require("./add");

const is_prod = require("../is_prod");

const add_hash = async (hash) => {
  const done = await add(is_prod() ? "hashes" : "test_hashes", {
    hash,
  });
  return done;
};

module.exports = add_hash;
