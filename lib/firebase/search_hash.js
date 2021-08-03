const db = require("./firebase");

const is_prod = require("../is_prod");

const search_hash = async (hash) => {
  let result = false;

  await db
    .collection(is_prod ? "hashes" : "test_hashes")
    .where("hash", "==", hash)
    .get()
    .then((qs) => {
      if (!qs.empty) {
        result = true;
      }
    });
  console.log("result is", result);
  return result;
};

module.exports = search_hash;
