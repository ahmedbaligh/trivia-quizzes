import React, { useRef } from 'react';
import '../stylesheets/Question.scss';

export const icons = {
  science: 'fas fa-atom',
  art: 'fas fa-palette',
  geography: 'fas fa-globe-africa',
  entertainment: 'fas fa-film',
  history: 'fas fa-history',
  sports: 'far fa-futbol'
};

const Question = ({
  id,
  question,
  answer,
  category,
  difficulty,
  onQuestionChange
}) => {
  const cardRef = useRef();

  const flipCard = () => cardRef.current.classList.toggle('flipped');

  const Flip = ({ title, dir }) => (
    <i className={`fas fa-${dir} flip`} title={title} onClick={flipCard} />
  );

  return (
    <div className="question-card" ref={cardRef}>
      <div className="question-holder">
        <div className="question-header">
          <i
            className={`category-icon ${icons[category.toLowerCase()]}`}
            title={category}
          ></i>
          <span className="difficulty">Difficulty: {difficulty}</span>
          <i
            className="fas fa-trash-alt delete icon"
            title="Delete Question"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => onQuestionChange(id)}
          />
        </div>
        <div className="question">
          {question}
          <Flip title="Show Answer" dir="redo" />
        </div>
      </div>

      <div className="answer-holder">
        {answer}
        <Flip title="Show Question" dir="undo" />
      </div>
      {/* <div className="mobile-overlay" onClick={flipCard}></div> */}
    </div>
  );
};

export default Question;
