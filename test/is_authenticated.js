const test = require("tape");
const { is_auth } = require("./index");

test("test working of authentication checking utility", (t) => {
  t.plan(2);

  t.true(is_auth("U010XUNLX40"), "Harsh's Slack ID");

  t.false(is_auth("U120YUCZX42"));
});
