import React, { Component } from 'react';
import $ from 'jquery';

import '../stylesheets/FormView.scss';

class FormView extends Component {
  constructor(props) {
    super();
    this.state = {
      question: '',
      answer: '',
      difficulty: 1,
      category: 1,
      categories: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: `/categories`,
      type: 'GET',
      success: result => {
        this.setState({ categories: result.categories });
        return;
      },
      error: error => {
        alert('Unable to load categories. Please try your request again');
        return;
      }
    });
  }

  submitQuestion = event => {
    event.preventDefault();
    if (this.state.answer && this.state.question) {
      $.ajax({
        url: '/questions', //DONE: update request URL
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          question: this.state.question,
          answer: this.state.answer,
          difficulty: this.state.difficulty,
          category: this.state.category
        }),
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: result => {
          document.getElementById('add-question-form').reset();
          alert('You`ve successfully added a new question!');
          return;
        },
        error: error => {
          alert('Unable to add question. Please try your request again');
          return;
        }
      });
    } else
      alert(
        'some information is missing, please complete the form before submitting'
      );
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <form onSubmit={this.submitQuestion} id="add-question-form">
        <fieldset className="form-view">
          <legend>
            <h2>Add a New Trivia Question</h2>
          </legend>
          <input
            placeholder="Enter a question..."
            type="text"
            name="question"
            onChange={this.handleChange}
          />
          <input
            placeholder="Enter an answer..."
            type="text"
            name="answer"
            onChange={this.handleChange}
          />
          <label>
            Difficulty:{' '}
            <select name="difficulty" onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Category:{' '}
            <select name="category" onChange={this.handleChange}>
              {this.state.categories.map(category => {
                return (
                  <option
                    key={Object.keys(category)}
                    value={Object.keys(category)}
                  >
                    {category[Object.keys(category)]}
                  </option>
                );
              })}
            </select>
          </label>
          <button type="submit" className="button">
            Add Question
          </button>
        </fieldset>
      </form>
    );
  }
}

export default FormView;
