import _ from 'lodash';

export const rules = [
  {
    type: 'email',
    regExp: /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/,
  },
  {
    type: 'phone',
    regExp: /^([0-9]{4})(-?)([0-9]{4})$/, // ####-#### ó ######## o 00000000
  },
  {
    type: 'identification',
    regExp: /^([0-9]{1})-([0-9]{4})-([0-9]{4})|([0-9]{9})$/, // #-0###-0###
  },
  {
    type: 'password',
    regExp: /^[A-Za-z\d\s@$!%*?&.()-_]{8,16}$/, // Min 8, Max 16
  },
  {
    type: 'text',
    regExp: /^([a-zA-Záéíóúñ]\s?)*$/,
  },
  {
    type: 'clientAccount',
    regExp: /^([0-9]{15})$/,
  },
  {
    type: 'iban',
    regExp: /^([0-9]{22})$/,
  },
];

export function getRegExp(type) {
  const item = _.find(rules, { type });
  return item.regExp;
}

export function validateExp({ type, value }) {
  const regExp = getRegExp(type);
  if (regExp.test(value)) return true;
  return false;
}

export function getDropDownItems(itemsArray) {
  if (itemsArray) {
    return _.map(itemsArray, item => ({ text: item, value: item }));
  }
  return [];
}
