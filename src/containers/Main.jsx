import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { Sidebar, Menu, Icon, Responsive, Image, Dropdown } from 'semantic-ui-react';
import {
  Redirect,
  Link,
  withRouter,
} from 'react-router-dom';

import Logo from '../components/Header/Logo';
import Modal from '../components/Modal';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import Inversionistas from './Inversionistas';
import Clientes from './Clientes';
import Prestamos from './Prestamos';
import Perfil from './Perfil';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.routing.location.pathname,
      isModalOpen: false,
    };
    autobind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.routing.location.pathname !== this.state.activeItem) {
      this.setState({
        activeItem: nextProps.routing.location.pathname,
      });
    }
  }
  handleModalOpen() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleItemClick(to) {
    const { dispatch } = this.props;
    dispatch(push(to));
  }
  render() {
    const adminItems = [
      {
        name: 'dashboard',
        text: 'Dashboard',
        url: '/dashboard',
      },
      {
        name: 'inversionistas',
        text: 'Inversionistas',
        url: '/dashboard/inversionistas',
      },
      {
        name: 'clientes',
        text: 'Clientes',
        url: '/dashboard/clientes',
      },
      {
        name: 'prestamos',
        text: 'Préstamos',
        url: '/dashboard/prestamos',
      },
      {
        name: 'perfil',
        text: 'Perfil',
        url: '/dashboard/perfil',
      },
    ];
    const trigger = (
      <span>
        <Image src="https://react.semantic-ui.com/assets/images/wireframe/square-image.png" avatar />
      </span>
    );
    const logoutItem = (
      <Menu.Item position="right" className="item-logout">
        <Link to={{
            pathname: '/logout',
            state: {
              from: this.props.location.pathname,
            },
          }}
        >
          <Icon name="log out" />
        </Link>
      </Menu.Item>
    );
    if (!this.props.authData.isAuth) {
      return <Redirect to="/login" />;
    }
    const { section } = this.props.match.params;
    return (
      <div className="main-content">
        <Menu stackable>
          <Menu.Item position="left" name="home" className="item-logo">
            <Logo />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item position="right">
              <Dropdown trigger={trigger} pointing="top right" icon={null}>
                <Dropdown.Menu>
                  <Modal
                    className="modal"
                    trigger={<Dropdown.Item onClick={this.handleModalOpen}>Cambiar contraseña</Dropdown.Item>}
                    isOpen={this.state.isModalOpen}
                    onClose={this.handleModalOpen}
                    component={<ForgotPassword closeSelf={this.handleModalOpen} />}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            {logoutItem}
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            visible
            animation="push"
            vertical
            pointing
            secondary
          >
            {adminItems.map((menuItem, index) => (
              <Menu.Item
                as={Link}
                key={index} // eslint-disable-line
                name={menuItem.name}
                active={this.state.activeItem === menuItem.url}
                onClick={() => this.handleItemClick(menuItem.url)}
                to={menuItem.url}
                className={menuItem.icon ? 'icon' : ''}
              >
                {menuItem.icon ? <Icon name={menuItem.icon} /> : ''}
                {menuItem.text}
              </Menu.Item>
            ))}
            <Responsive maxWidth={600}>
              <Menu.Item
                as={Link}
                to={{
                  pathname: '/logout',
                  state: {
                    from: '/dashboard',
                  },
                }}
              >
                <Icon name="log out" /> Logout
              </Menu.Item>
              <Modal
                className="modal"
                trigger={<Menu.Item onClick={this.handleModalOpen}><Icon name="setting" /> Cambiar contraseña</Menu.Item>}
                isOpen={this.state.isModalOpen}
                onClose={this.handleModalOpen}
                component={<ForgotPassword closeSelf={this.handleModalOpen} />}
              />
            </Responsive>
          </Sidebar>
          <Sidebar.Pusher>
            { !section ? <Dashboard /> : '' }
            { section && section === 'dashboard' ? <Dashboard /> : '' }
            { section && section === 'inversionistas' ? <Inversionistas /> : '' }
            { section && section === 'clientes' ? <Clientes /> : '' }
            { section && section === 'prestamos' ? <Prestamos /> : '' }
            { section && section === 'perfil' ? <Perfil /> : '' }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.user,
  routing: state.routing,
});

export default withRouter(connect(mapStateToProps)(Main));
