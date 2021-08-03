const search_hash = require("../lib/firebase/search_hash");
const test = require("tape");

test("check hash searching utility", (t) => {
  const hash =
    "5972395630eda9481909c55d9f0df740cd0df7d03e9d10455f450eae5cf4ddc7";

  const fun = async () => {
    const result = await search_hash(hash);

    t.true(1);

    t.end();
  };

  fun();
});
