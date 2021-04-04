import React, { Component } from 'react';
import '../stylesheets/Question.scss';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      visibleAnswer: false
    };
  }
  icons = {
    science: 'fas fa-microscope',
    art: 'fas fa-palette',
    geography: 'fas fa-atlas',
    entertainment: 'fas fa-tv',
    history: 'fas fa-landmark',
    sports: 'far fa-futbol'
  };

  flipVisibility() {
    this.setState({ visibleAnswer: !this.state.visibleAnswer });
  }

  render() {
    const { question, answer, category, difficulty } = this.props;
    return (
      <div className="Question-holder">
        <div className="answer-btn-overlay">
          <div
            className="show-answer btn"
            onClick={() => this.flipVisibility()}
          >
            {this.state.visibleAnswer ? 'Show Question' : 'Show Answer'}
          </div>
        </div>
        <div className="Question">
          <i className={this.icons[category.toLowerCase()]}></i>
          {!this.state.visibleAnswer ? question : `Answer: ${answer}`}
        </div>
        <div className="Question-status">
          <div className="difficulty">Difficulty: {difficulty}</div>
          <i
            className="fas fa-trash delete icon btn"
            onClick={() => this.props.questionAction('DELETE')}
          />
        </div>
      </div>
    );
  }
}

export default Question;
