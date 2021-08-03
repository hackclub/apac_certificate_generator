const test = require("tape");
const create_hash = require("../lib/hash");

test("check if hash is working properly", (t) => {
  t.plan(1);

  const { hash } = create_hash("./assets/file1.pdf");

  t.equal(
    hash,
    "2910904c0610f4e81bd7a2e1e7f6f24eeced79dc5062ac3550cfded9f29a932d"
  );
});
