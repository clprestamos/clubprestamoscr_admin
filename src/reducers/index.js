import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import main from './main';
import user from './user';
import users from './users';
import investors from './investors';
import clients from './clients';
import loans from './loans';
import investor from './investor';
import client from './client';
import loansByInvestor from './loansByInvestor';
import loansByClient from './loansByClient';
import investorByLoan from './investorByLoan';
import forgotPassword from './forgotPassword';
import locales from './locales';
import loan from './loan';
import myinvests from './myinvests';

export default combineReducers({
  routing: routerReducer,
  main,
  user,
  users,
  investors,
  clients,
  loans,
  investor,
  loansByInvestor,
  loansByClient,
  investorByLoan,
  client,
  forgotPassword,
  locales,
  loan,
  myinvests,
});
