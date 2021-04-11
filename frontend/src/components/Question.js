import React, { Component } from 'react';
import '../stylesheets/Question.scss';

class Question extends Component {
  icons = {
    science: 'fas fa-microscope',
    art: 'fas fa-palette',
    geography: 'fas fa-atlas',
    entertainment: 'fas fa-tv',
    history: 'fas fa-landmark',
    sports: 'far fa-futbol'
  };

  flipVisibility = e => {
    e.target.parentElement.classList.toggle('flipped');
  };

  render() {
    const { question, answer, category, difficulty } = this.props;
    return (
      <div className="question-card">
        <div className="Question-holder">
          <div className="Question">
            <i className={this.icons[category.toLowerCase()]}></i>
            {question}
          </div>
          <div className="Question-status">
            <div className="difficulty">Difficulty: {difficulty}</div>
          </div>
        </div>
        <div className="answer-holder">{answer}</div>
        <i
          className="fas fa-trash delete icon btn"
          onClick={() => this.props.questionAction('DELETE')}
        />
        <i
          className="fas fa-redo flip-btn icon btn"
          onClick={this.flipVisibility}
        />
      </div>
    );
  }
}

export default Question;
