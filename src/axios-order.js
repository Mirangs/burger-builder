import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mirangs-burger-builder.firebaseio.com'
});

export default instance;