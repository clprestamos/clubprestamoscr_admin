import React, { Component } from 'react';
import _ from 'lodash';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'semantic-ui-react';

import * as MainActionCreators from '../actions/';
import * as Users from '../actions/Users';

import CardComponent from '../components/Dashboard/Card';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      Users,
    }, dispatch);
    autobind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(push('/dashboard'));
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Users.getAllUsers());
  }
  handleLink(link) {
    const { dispatch } = this.props;
    dispatch(push(link));
  }
  render() {
    const clientes = _.chain(this.props.users.data)
      .filter({ roleId: 1 })
      .orderBy(['lastUpdate'], ['asc'])
      .take(3)
      .value();
    const inversionistas = _.chain(this.props.users.data)
      .filter({ roleId: 2 })
      .orderBy(['lastUpdate'], ['asc'])
      .take(3)
      .value();
    const users = _.chain(this.props.users.data)
      .orderBy(['lastUpdate'], ['asc'])
      .take(3)
      .value();
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>Acá se va mostrar lo último en actualizaciones de cada categoría.</p>
        <div className="cards">
          <Card.Group>
            <CardComponent
              headerText="Inversionistas"
              headerLink="/dashboard/inversionistas"
              bottomText="Ver todos los inversionistas"
              bottomLink="/dashboard/inversionistas"
              handleLink={this.handleLink}
              data={inversionistas}
            />
            <CardComponent
              headerText="Clientes"
              headerLink="/dashboard/clientes"
              bottomText="Ver todos los clientes"
              bottomLink="/dashboard/clientes"
              handleLink={this.handleLink}
              data={clientes}
            />
            <CardComponent
              headerText="Usuarios"
              headerLink="/dashboard/usuarios"
              bottomText="Ver todos los usuarios"
              bottomLink="/dashboard/usuarios"
              handleLink={this.handleLink}
              data={users}
            />
          </Card.Group>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing.location,
  authData: state.user,
  users: state.users,
});

export default withRouter(connect(mapStateToProps)(Dashboard));
