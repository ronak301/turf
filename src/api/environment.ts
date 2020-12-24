import { isLocalhost, isDemo } from 'utils';

interface ApiEnvironment {
  apiUrl?: string;
}

const apiEnvironment: ApiEnvironment = {};

switch (true) {
  case isLocalhost():
    apiEnvironment.apiUrl = 'https://jsonplaceholder.typicode.com';
    break;

  case isDemo():
    apiEnvironment.apiUrl = 'https://api.example.isdemo.se';
    break;

  default:
    apiEnvironment.apiUrl = process.env.REACT_APP_API_URL;
}

export default apiEnvironment;
