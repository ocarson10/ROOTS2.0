import axios from 'axios';

//const URL = 'https://localhost/api/';
const URL = 'http://localhost:3000';

const instance = axios.create({
  baseURL: URL,
});

export {instance};