const db = require("./firebase");
const _ = require("ramda");

const fb_add = async (collection, obj) =>
  await db
    .collection(collection)
    .add(obj)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });

const add = _.curry(fb_add);

module.exports = add;
