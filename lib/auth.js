/** @format */

const { auth_people } = require("./data.js");

const is_authenticated = (user_id) => auth_people.includes(user_id);

module.exports = is_authenticated;
