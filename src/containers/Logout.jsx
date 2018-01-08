import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Container } from 'semantic-ui-react';
import Logo from '../components/Header/Logo';

// import * as service from '../service';

import * as Login from '../actions/Login';
import * as MainActionCreators from '../actions/';

class Logout extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      Login,
      MainActionCreators,
    }, dispatch);
    this.state = {
      isAuth: true,
    };
    autobind(this);
  }
  componentWillMount() {
    this.setState({
      isAuth: this.props.authData.isAuth,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.authData.data === null) {
      this.setState({
        isAuth: false,
      });
    }
  }
  logout() {
    const { dispatch } = this.props;
    dispatch(Login.logout());
  }
  cancel() {
    this.props.history.goBack();
  }
  render() {
    const logoutComponent = this.state.isAuth ? (
      <div className="logout">
        <Container fluid>
          <Logo />
          <div className="logout-box">
            <div className="box">
              <div className="divider" />
              <h3>Cerrar sesión</h3>
              <p>¿Desea cerrar su sesión?</p>
              <button className="btn default" onClick={this.logout}>Cerrar</button>
              <button onClick={this.cancel} type="button" className="cancel">Cancelar</button>
            </div>
          </div>
        </Container>
      </div>
    ) : (
      <Redirect to="/login" />
    );
    return logoutComponent;
  }
}

const mapStateToProps = state => ({
  authData: state.user,
});

export default withRouter(connect(mapStateToProps)(Logout));
