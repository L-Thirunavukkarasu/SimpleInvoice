import {API_URL} from '@env';

const devEnvironmentVariables = {
  API_URL,
};

const prodEnvironmentVariables = {
  API_URL,
};

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;
