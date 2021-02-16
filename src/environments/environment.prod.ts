import { version } from '../../package.json';

export const environment = {
  production: true,
  version: version,
  firebaseConfig: {
    authDomain: 'truckers-against-trafficking.firebaseapp.com',
    databaseURL: 'https://truckers-against-trafficking.firebaseio.com',
    projectId: 'truckers-against-trafficking',
    storageBucket: 'truckers-against-trafficking.appspot.com'
  },
  externalResourcesURL: 'https://app-proxy.truckersagainsttrafficking.org/external-resources/botl/',
  emailVerificationRequired: true
};
