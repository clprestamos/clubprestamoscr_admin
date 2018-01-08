import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionIcon from '../QuestionIcon';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleAnswerView = this.toggleAnswerView.bind(this);
  }
  toggleAnswerView() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      <div className="question">
        <div className={`question-box ${this.state.isOpen ? 'open' : ''}`}>
          <div className="top-gradient" />
          <QuestionIcon />
          <p>{this.props.question}</p>
        </div>
        <div className={`answer ${this.state.isOpen ? 'open' : ''}`}>
          <p className={`${this.state.isOpen ? 'open' : ''}`}>{this.props.answer}</p>
          <button onClick={this.toggleAnswerView}>{`${this.state.isOpen ? 'Cerrar' : 'Ver respuesta'}`}</button>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Question;
