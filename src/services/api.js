import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '16846852-36d31872340aa79693bfa0a07';

axios.defaults.baseURL = BASE_URL;

export const fetchPicture = (name, page) =>
    axios.get(`?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
.catch(error => {
               if (!error.response) {
                   throw new Error(error.response.statusText);
               }
           });