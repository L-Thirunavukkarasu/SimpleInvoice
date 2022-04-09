import axios from 'axios';
import qs from 'qs';
const BASE_API_URL = 'https://sandbox.101digital.io/';

export const callPostApi = (apiEndPoint, body, header) => {
  console.log('callPostApi', BASE_API_URL + apiEndPoint, body, header);
  return axios({
    method: 'POST',
    data: qs.stringify(body),
    headers: header,
    url: BASE_API_URL + apiEndPoint,
  })
    .then(response => {
      console.log('callPostApi-response', response);
      return response;
    })
    .catch(error => {
      console.log('callPostApi-error', JSON.stringify(error));
      if (error.response.data) {
        console.log('callPostApi-error data ', error.response.data);
        return error.response.data;
      }
      return error;
    });
};
