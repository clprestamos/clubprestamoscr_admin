import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import main from './main';
import clientSubscription from './clientSubscription';
import investorSubscription from './investorSubscription';
import recaptcha from './recaptcha';
import user from './user';
import forgotPassword from './forgotPassword';
import contactUs from './contactUs';
import locales from './locales';
import clientProfile from './clientProfile';
import loan from './loan';
import investorProfile from './investorProfile';
import opportunities from './opportunities';
import myinvests from './myinvests';

export default combineReducers({
  routing: routerReducer,
  main,
  user,
  recaptcha,
  forgotPassword,
  clientSubscription,
  investorSubscription,
  contactUs,
  locales,
  clientProfile,
  loan,
  investorProfile,
  opportunities,
  myinvests,
});
