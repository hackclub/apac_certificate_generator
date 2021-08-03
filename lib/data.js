/** @format */

const dotenv = require("dotenv");
dotenv.config();

const harsh_id = process.env.HARSH_ID;
const athul_id = process.env.ATHUL_ID;

const isProd = process.env.PROD == "true";

module.exports.harsh_id = harsh_id;

module.exports.auth_people = [harsh_id];

module.exports.person_to_sign = isProd ? athul_id : harsh_id;

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
