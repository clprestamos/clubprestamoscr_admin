import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactFilestack from 'filestack-react';

import * as UploadFile from '../../actions/UploadFile';

class UploadButton extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      UploadFile,
    }, dispatch);
    autobind(this);
  }
  onSuccess(result) {
    const { filesUploaded } = result;
    const { dispatch, userId } = this.props;
    const avatar = filesUploaded[0].url;
    dispatch(UploadFile.uploadFile({ userId, avatar }));
  }
  render() {
    const basicOptions = {
      accept: 'image/*',
      fromSources: ['facebook', 'instagram', 'local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
      minFiles: 1,
      lang: 'es',
    };
    return (
      <ReactFilestack
        apikey={process.env.REACT_APP_FILESTACK_API_KEY}
        buttonText="Click me"
        buttonClass="classname"
        options={basicOptions}
        onSuccess={this.onSuccess}
        render={({ onPick }) => this.props.render(onPick)}
      />
    );
  }
}

UploadButton.propTypes = {
  userId: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
};

export default withRouter(connect()(UploadButton));
