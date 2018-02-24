import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      searchQuery: '',
      value: 'Sin resultados',
    };
  }
  handleChange(e, { searchQuery, value }) {
    this.setState({
      searchQuery,
      value,
    });
  }
  handleSearchChange(e, { searchQuery }) {
    this.setState({
      searchQuery,
    });
  }
  render() {
    const { searchQuery, value } = this.state;
    const stateOptions = _.map(this.props.source, (item) => {
      let baseLink = '/dashboard/clientes';
      if (item.roleId === 1) {
        baseLink = '/dashboard/clientes';
      } else if (item.roleId === 2) {
        baseLink = '/dashboard/inversionistas';
      } else {
        baseLink = '/dashboard/users';
      }
      return {
        key: item.userId,
        text: `${item.name} ${item.lastName}`,
        value: item.userId,
        content: <Link to={`${baseLink}/${item.userId}`}>{`${item.name} ${item.lastName}`}</Link>,
      };
    });
    return (
      <div>
        <Icon name="search" />
        <Dropdown
          onChange={this.handleChange}
          onSearchChange={this.handleSearchChange}
          options={stateOptions}
          text="Búsqueda rápida"
          searchQuery={searchQuery}
          search
          selection
          value={value}
        />
      </div>
    );
  }
}

SearchComponent.propTypes = {
  source: PropTypes.array.isRequired,
};

export default SearchComponent;
