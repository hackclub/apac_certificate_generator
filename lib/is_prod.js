/** @format */

require('dotenv').config();

const isProd = () => process.env.PROD == 'true';

module.exports = isProd;
