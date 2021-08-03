const create_hash = require("../lib/hash");
const path = require("path");

const file_path = path.resolve(__dirname, "../file.pdf");
const file_path_1 = path.resolve(__dirname, "../file_1.pdf");

const hash = create_hash(file_path);
const hash1 = create_hash(file_path_1);

console.log(hash);
console.log(hash1);
