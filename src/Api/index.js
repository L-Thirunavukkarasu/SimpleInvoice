import axios from 'axios';
import qs from 'qs';
import * as Constant from './constants';

//get access token
export const callPostApi = (apiEndPoint, body, header) => {
  console.log('callPostApi', Constant.APP_BASE_URL + apiEndPoint, body, header);
  return axios({
    method: 'POST',
    data: qs.stringify(body),
    headers: header,
    url: Constant.APP_BASE_URL + apiEndPoint,
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

//get invoices
export const getInvoices = (apiEndPoint, header) => {
  console.log('getInvoices', Constant.APP_BASE_URL + apiEndPoint, header);
  return axios({
    method: 'GET',
    headers: header,
    url: Constant.APP_BASE_URL + apiEndPoint,
  })
    .then(response => {
      console.log('getInvoices-response', response);
      return response;
    })
    .catch(error => {
      console.log('getInvoices-error', JSON.stringify(error));
      if (error.response.data) {
        console.log('getInvoices-error data ', error.response.data);
        return error.response.data;
      }
      return error;
    });
};
