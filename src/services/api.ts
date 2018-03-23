import axios from 'axios';

const API_ROOT = 'https://call-club.herokuapp.com/api/';

function callApi(endpoint: string, schema: {}) {
  const fullUrl = (!endpoint.includes(API_ROOT)) ? API_ROOT + endpoint : endpoint;

  return axios.post(fullUrl, schema)
    .then(({ data }) => data)
    .catch((err: Error) => {
      throw new Error(err.message || 'Something bad happened');
    });

}

export const userLogin = (query: object) => callApi(`user/login`, query);