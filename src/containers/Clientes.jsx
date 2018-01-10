import React, { Component } from 'react';
import autobind from 'react-autobind';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Table, Image, Icon } from 'semantic-ui-react';

import * as MainActionCreators from '../actions/';
import * as Clients from '../actions/Clients';

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
          <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Cédula</Table.HeaderCell>
                <Table.HeaderCell>Celular</Table.HeaderCell>
                <Table.HeaderCell>Fecha de Ingreso</Table.HeaderCell>
                <Table.HeaderCell>View</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.clients.data.map((client, index) => {
                const key = index + 1;
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{client.userId}</Table.Cell>
                    <Table.Cell>
                      <Image src={client.avatar ? client.avatar : 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png'} avatar />
                      <span>{client.name} {client.lastName}</span>
                    </Table.Cell>
                    <Table.Cell>{client.identification}</Table.Cell>
                    <Table.Cell>{client.cellphone}</Table.Cell>
                    <Table.Cell>{`${moment(new Date(client.signupDate)).format('DD-MM-YYYY')}`}</Table.Cell>
                    <Table.Cell><Link to={`/dashboard/clientes/${client.userId}`} onClick={() => this.handleLink(`/dashboard/clientes/${client.userId}`)}><Icon name="eye" /></Link></Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
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
