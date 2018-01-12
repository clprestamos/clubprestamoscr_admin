import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import * as MainActionCreators from '../actions/';
import * as Clients from '../actions/Clients';

import ClientList from '../components/ClientList';

class Clientes extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      Clients,
    }, dispatch);
    autobind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Clients.getAllClients());
  }
  handleLink(link) {
    const { dispatch } = this.props;
    dispatch(push(link));
  }
  render() {
    return (
      <div className="clients">
        <h1>Clientes</h1>
        <div className="content">
          <ClientList clientList={this.props.clients.data} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing.location,
  clients: state.clients,
});

export default withRouter(connect(mapStateToProps)(Clientes));
