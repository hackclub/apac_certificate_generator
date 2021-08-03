const crypto = require("crypto");
const fs = require("fs");

require("dotenv").config();

// the function can hash via both file_path and file_content
// only one option at an implementation must be passed, either file_path or file_content

const create_hash = (file_path, file_content = undefined) => {
  let error = undefined;
  let hash = undefined;

  const hash_key = process.env.HASH_KEY;
  try {
    const content = file_path
      ? fs.readFileSync(file_path, "base64")
      : file_content;

    hash = crypto.createHmac("sha256", hash_key).update(content).digest("hex");
  } catch (err) {
    error = err;
  } finally {
    return { error, hash };
  }
};

module.exports = create_hash;
