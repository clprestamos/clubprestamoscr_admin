import _ from 'lodash';
import moment from 'moment';

export const rules = [
  {
    type: 'email',
    regExp: /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/,
  },
  {
    type: 'tel',
    regExp: /^([0-9]{4})(-?)([0-9]{4})$/, // ####-#### ó ######## o 00000000
  },
  {
    type: 'identification',
    regExp: /^([0-9]{1})(-?)([0-9]{4})(-?)([0-9]{4})$/, // #-0###-0###
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
  {
    type: 'number',
    regExp: /^([0-9])$/,
  },
  {
    type: 'date',
    regExp: /^([0-9]){4}-([0-9]){2}-([0-9]){2}$/,
  },
];

export function getTerms() {
  return [
    { text: '12 meses', value: '12-meses' },
    { text: '18 meses', value: '18-meses' },
    { text: '24 meses', value: '24-meses' },
    { text: '30 meses', value: '30-meses' },
    { text: '36 meses', value: '36-meses' },
  ];
}

export function getReasons() {
  return [
    { text: 'Deuda tarjeta de crédito', value: 'Deuda-tarjeta-de-credito' },
    { text: 'Deudas almacén', value: 'Deudas-almacen' },
    { text: 'Préstamos personales', value: 'Prestamos-personales' },
    { text: 'Viajes', value: 'Viajes' },
    { text: 'Compra de vehículos', value: 'Compra-de-vehiculos' },
  ];
}

export function getAmounts() {
  return [
    { text: '₡ 100 000', value: '100000' },
    { text: '₡ 200 000', value: '200000' },
    { text: '₡ 300 000', value: '300000' },
    { text: '₡ 400 000', value: '400000' },
    { text: '₡ 500 000', value: '500000' },
    { text: '₡ 600 000', value: '600000' },
    { text: '₡ 700 000', value: '700000' },
    { text: '₡ 800 000', value: '800000' },
    { text: '₡ 900 000', value: '900000' },
    { text: '₡ 1 000 000', value: '1000000' },
    { text: '₡ 1 100 000', value: '1100000' },
    { text: '₡ 1 200 000', value: '1200000' },
    { text: '₡ 1 300 000', value: '1300000' },
    { text: '₡ 1 400 000', value: '1400000' },
    { text: '₡ 1 500 000', value: '1500000' },
    { text: '₡ 1 600 000', value: '1600000' },
    { text: '₡ 1 700 000', value: '1700000' },
    { text: '₡ 1 800 000', value: '1800000' },
    { text: '₡ 1 900 000', value: '1900000' },
    { text: '₡ 2 000 000', value: '2000000' },
    { text: '₡ 2 100 000', value: '2100000' },
    { text: '₡ 2 200 000', value: '2200000' },
    { text: '₡ 2 300 000', value: '2300000' },
    { text: '₡ 2 400 000', value: '2400000' },
    { text: '₡ 2 500 000', value: '2500000' },
    { text: '₡ 2 600 000', value: '2600000' },
    { text: '₡ 2 700 000', value: '2700000' },
    { text: '₡ 2 800 000', value: '2800000' },
    { text: '₡ 2 900 000', value: '2900000' },
    { text: '₡ 3 000 000', value: '3000000' },
    { text: '₡ 3 100 000', value: '3100000' },
    { text: '₡ 3 200 000', value: '3200000' },
    { text: '₡ 3 300 000', value: '3300000' },
    { text: '₡ 3 400 000', value: '3400000' },
    { text: '₡ 3 500 000', value: '3500000' },
    { text: '₡ 3 600 000', value: '3600000' },
    { text: '₡ 3 700 000', value: '3700000' },
    { text: '₡ 3 800 000', value: '3800000' },
    { text: '₡ 3 900 000', value: '3900000' },
    { text: '₡ 4 000 000', value: '4000000' },
    { text: '₡ 4 100 000', value: '4100000' },
    { text: '₡ 4 200 000', value: '4200000' },
    { text: '₡ 4 300 000', value: '4300000' },
    { text: '₡ 4 400 000', value: '4400000' },
    { text: '₡ 4 500 000', value: '4500000' },
    { text: '₡ 4 600 000', value: '4600000' },
    { text: '₡ 4 700 000', value: '4700000' },
    { text: '₡ 4 800 000', value: '4800000' },
    { text: '₡ 4 900 000', value: '4900000' },
    { text: '₡ 5 000 000', value: '5000000' },
  ];
}

export function getStates() {
  return [
    { text: 'Nuevo Ingreso', value: 1 },
    { text: 'Pre-Aprobado', value: 2 },
    { text: 'Aprobado', value: 3 },
    { text: 'En espera', value: 4 },
    { text: 'Black List', value: 5 },
  ];
}

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

// Currencies: https://www.currency-iso.org/dam/downloads/lists/list_one.xml

export function amountToMoney(amount) {
  return _.toInteger(amount).toLocaleString('CRC', { style: 'currency', currency: 'CRC' }).replace('CRC', '₡');
}

export function parseDate(date) {
  return moment.utc(new Date(date)).format('YYYY-MM-DD');
}
