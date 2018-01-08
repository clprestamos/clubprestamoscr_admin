import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Dropdown, Label, Icon } from 'semantic-ui-react';

import * as utils from '../../../utils';

import InputField from '../../InputField';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
    };
    autobind(this);
  }
  onChangeProvinces(province) {
    this.props.getCantons(province);
  }
  onChangeCantons(canton) {
    this.props.getDistricts(canton);
  }
  onChangeDistricts() {
    this.props.getZipCode();
  }
  getDropDownItems(itemsArray) {
    return _.map(itemsArray, item => ({ text: item, value: item }));
  }
  handleSubmit() {
    const { clientInfo } = this.props;
    if (
      !this.state.hasErrors &&
      clientInfo.term &&
      clientInfo.reason &&
      clientInfo.amount &&
      clientInfo.province &&
      clientInfo.canton &&
      clientInfo.district &&
      clientInfo.zipCode
    ) {
      this.props.handleSubmit();
    }
  }
  validation({ type, value }) {
    let result = true;
    if (value === '') result = true;
    if (utils.validateExp({ type, value })) result = false;
    this.setState({
      hasErrors: result,
    });
    return result;
  }
  render() {
    const { onChangeField, clientInfo } = this.props;
    const {
      term,
      reason,
      amount,
      province,
      canton,
      district,
      zipCode,
    } = clientInfo;
    const provinces = utils.getDropDownItems(this.props.provinces);
    const cantons = utils.getDropDownItems(this.props.cantons);
    const districts = utils.getDropDownItems(this.props.districts);
    const terms = [
      { text: '12 meses', value: '12-meses' },
      { text: '18 meses', value: '18-meses' },
      { text: '24 meses', value: '24-meses' },
      { text: '30 meses', value: '30-meses' },
      { text: '36 meses', value: '36-meses' },
    ];
    const reasons = [
      { text: 'Deuda tarjeta de crédito', value: 'Deuda-tarjeta-de-credito' },
      { text: 'Deudas almacén', value: 'Deudas-almacen' },
      { text: 'Préstamos personales', value: 'Prestamos-personales' },
      { text: 'Viajes', value: 'Viajes' },
      { text: 'Compra de vehículos', value: 'Compra-de-vehiculos' },
    ];
    const amounts = [
      { text: '₡ 100 000', value: 100000 },
      { text: '₡ 200 000', value: 200000 },
      { text: '₡ 300 000', value: 300000 },
      { text: '₡ 400 000', value: 400000 },
      { text: '₡ 500 000', value: 500000 },
      { text: '₡ 600 000', value: 600000 },
      { text: '₡ 700 000', value: 700000 },
      { text: '₡ 800 000', value: 800000 },
      { text: '₡ 900 000', value: 900000 },
      { text: '₡ 1 000 000', value: 1000000 },
      { text: '₡ 1 100 000', value: 1100000 },
      { text: '₡ 1 200 000', value: 1200000 },
      { text: '₡ 1 300 000', value: 1300000 },
      { text: '₡ 1 400 000', value: 1400000 },
      { text: '₡ 1 500 000', value: 1500000 },
      { text: '₡ 1 600 000', value: 1600000 },
      { text: '₡ 1 700 000', value: 1700000 },
      { text: '₡ 1 800 000', value: 1800000 },
      { text: '₡ 1 900 000', value: 1900000 },
      { text: '₡ 2 000 000', value: 2000000 },
      { text: '₡ 2 100 000', value: 2100000 },
      { text: '₡ 2 200 000', value: 2200000 },
      { text: '₡ 2 300 000', value: 2300000 },
      { text: '₡ 2 400 000', value: 2400000 },
      { text: '₡ 2 500 000', value: 2500000 },
      { text: '₡ 2 600 000', value: 2600000 },
      { text: '₡ 2 700 000', value: 2700000 },
      { text: '₡ 2 800 000', value: 2800000 },
      { text: '₡ 2 900 000', value: 2900000 },
      { text: '₡ 3 000 000', value: 3000000 },
      { text: '₡ 3 100 000', value: 3100000 },
      { text: '₡ 3 200 000', value: 3200000 },
      { text: '₡ 3 300 000', value: 3300000 },
      { text: '₡ 3 400 000', value: 3400000 },
      { text: '₡ 3 500 000', value: 3500000 },
      { text: '₡ 3 600 000', value: 3600000 },
      { text: '₡ 3 700 000', value: 3700000 },
      { text: '₡ 3 800 000', value: 3800000 },
      { text: '₡ 3 900 000', value: 3900000 },
      { text: '₡ 4 000 000', value: 4000000 },
      { text: '₡ 4 100 000', value: 4100000 },
      { text: '₡ 4 200 000', value: 4200000 },
      { text: '₡ 4 300 000', value: 4300000 },
      { text: '₡ 4 400 000', value: 4400000 },
      { text: '₡ 4 500 000', value: 4500000 },
      { text: '₡ 4 600 000', value: 4600000 },
      { text: '₡ 4 700 000', value: 4700000 },
      { text: '₡ 4 800 000', value: 4800000 },
      { text: '₡ 4 900 000', value: 4900000 },
      { text: '₡ 5 000 000', value: 5000000 },
    ];
    return (
      <div className="client-subscription Step2">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field className="address">
            <InputField
              placeholder="Dirección casa de habitación *"
              validation={value => this.validation({ value, type: 'text' })}
              errorMessage="Campo requerido."
              onChangeField={onChangeField}
              name="address"
              isRequired
              defaultValue={clientInfo.address}
            />
          </Form.Field>
          <Form.Field className="address-details">
            <Dropdown
              placeholder="Provincia *"
              selection
              fluid
              compact
              search
              options={provinces}
              onChange={(e, { value }) => {
                this.props.onChangeField({ field: 'province', value });
                this.onChangeProvinces(value);
              }}
              defaultValue={province}
            />
            <Dropdown
              placeholder="Cantón *"
              selection
              fluid
              compact
              search
              options={cantons}
              onChange={(e, { value }) => {
                this.props.onChangeField({ field: 'canton', value });
                this.onChangeCantons(value);
              }}
              defaultValue={canton}
            />
            <Dropdown
              placeholder="Distrito *"
              selection
              fluid
              compact
              search
              options={districts}
              onChange={(e, { value }) => {
                this.props.onChangeField({ field: 'district', value });
                this.onChangeDistricts(value);
              }}
              defaultValue={district}
            />
          </Form.Field>
          <Form.Field className="zipCode">
            <Label>
              <Icon name="mail" />
              {zipCode}
              <Label.Detail>Código Postal</Label.Detail>
            </Label>
          </Form.Field>
          <Form.Field className="relativePhone">
            <InputField
              placeholder="Teléfono de un familiar *"
              validation={value => this.validation({ value, type: 'phone' })}
              errorMessage="Campo requerido. Formato de teléfono ####-#### ó ########."
              inputType="tel"
              onChangeField={onChangeField}
              name="relativePhone"
              isRequired
              defaultValue={clientInfo.relativePhone}
            />
          </Form.Field>
          <Form.Field className="cellphone">
            <InputField
              placeholder="Celular *"
              validation={value => this.validation({ value, type: 'phone' })}
              errorMessage="Campo requerido. Formato de teléfono ####-#### ó ########."
              inputType="tel"
              onChangeField={onChangeField}
              name="cellphone"
              isRequired
              defaultValue={clientInfo.cellphone}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Monto *"
              selection
              fluid
              compact
              options={amounts}
              onChange={(e, { value }) => {
                this.props.onChangeField({ field: 'amount', value });
              }}
              defaultValue={amount}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Plazo *"
              selection
              fluid
              compact
              options={terms}
              onChange={(e, { value }) => {
                this.props.onChangeField({ field: 'term', value });
              }}
              defaultValue={term}
            />
          </Form.Field>
          <Form.Field className="reason">
            <Dropdown
              placeholder="Motivo *"
              selection
              fluid
              compact
              options={reasons}
              onChange={(e, { value }) => {
                this.props.onChangeField({ field: 'reason', value });
              }}
              defaultValue={reason}
            />
          </Form.Field>
          <button type="submit" className="btn default">{this.props.btnText}</button>
          <span>Campos obligatorios **</span>
        </Form>
      </div>
    );
  }
}

Step2.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  onChangeField: PropTypes.func.isRequired,
  clientInfo: PropTypes.object.isRequired,
  getCantons: PropTypes.func.isRequired,
  getDistricts: PropTypes.func.isRequired,
  getZipCode: PropTypes.func.isRequired,
  provinces: PropTypes.array.isRequired,
  cantons: PropTypes.array,
  districts: PropTypes.array,
};

export default Step2;
