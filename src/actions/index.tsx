/* ------------- all actions ------------- */
import * as othersActions from './others';
import * as authActions from './auth';
import * as profileActions from './profile';
import * as requestActions from './request';
import * as bidActions from './bid';

/* ------------- assign ------------- */
export const ActionCreators = Object.assign(
  {},
  othersActions,
  authActions,
  profileActions,
  requestActions,
  bidActions,
);
