import apisauce from 'apisauce'

const serviceBase = 'http://localhost:3001/api/';

const create = (baseURL = serviceBase) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  return api;
}

// let's return back our create method as the default.
export default {
  create
}
