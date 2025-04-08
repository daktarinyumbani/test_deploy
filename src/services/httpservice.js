// import axios from 'axios';

// export const apiURL = 'http://daktari.test/api/v1/admin/';
export const apiURL = process.env.REACT_APP_API_URL;

// const token = JSON.parse(localStorage.getItem('tokens'));

export const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const myHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
  // 'Authorization': 'Bearer ' + token,
};

// eslint-disable-next-line no-unused-vars
// const imageHeaders = {
//   'Content-Type': 'multipart/form-data',
//   Authorization: `Bearer ${token}`
// };

export async function makeGetRequest(theURL) {
  // eslint-disable-next-line no-shadow
  const token = localStorage.getItem('token');
  const theToken = JSON.parse(token);
  const url = apiURL + theURL;
  myHeaders.Authorization = `Bearer ${theToken.token.plainTextToken}`;

  // return axios.get(url, {
  //   responseType: 'application/json'
  // });
  return fetch(url, {
    method: 'GET',
    headers: myHeaders
  });
}

export async function makePostRequest(theURL, theBody, theMethod = 'POST') {
  // eslint-disable-next-line no-shadow
  const token = localStorage.getItem('token');
  const theToken = JSON.parse(token);
  const url = apiURL + theURL;
  myHeaders.Authorization = `Bearer ${theToken.token.plainTextToken}`;
  return fetch(url, {
    method: theMethod,
    headers: myHeaders,
    body: theBody
  });
}
