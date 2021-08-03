const create_hash = require("../lib/hash");
const path = require("path");

const file_path = path.resolve(__dirname, "../husky.png");

const hash = create_hash(file_path);

console.log(hash);
