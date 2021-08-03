const test = require("tape");
const path = require("path");

const add_hash = require("../lib/firebase/add_hash");
const create_hash = require("../lib/hash");

test("checking if hash is being added", (t) => {
  const file_path = path.resolve(__dirname, "../output.pdf");
  const fun = async () => {
    const { error, hash } = create_hash(file_path);

    await add_hash(hash);
    t.end();
  };

  fun();
});
