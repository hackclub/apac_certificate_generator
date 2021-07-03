/** @format */

const { auth_people } = require('./data.js');

const is_authenticated = (user_id) => user_id in auth_people;

export default is_authenticated;
