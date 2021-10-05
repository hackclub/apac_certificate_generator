/** @format */

const dotenv = require("dotenv");
dotenv.config();

const harsh_id = process.env.HARSH_ID;
const athul_id = process.env.ATHUL_ID;

const isProd = process.env.PROD == "true";

module.exports.harsh_id = harsh_id;

module.exports.auth_people = [harsh_id];

module.exports.person_to_sign = isProd ? athul_id : harsh_id;

module.exports.oauth_token = isProd
  ? process.env.OAUTH_TOKEN
  : process.env.DEV_OAUTH_TOKEN;

module.exports.app_token = isProd
  ? process.env.APP_TOKEN
  : process.env.DEV_APP_TOKEN;

module.exports.monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
