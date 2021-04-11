import React, { Component } from 'react';
import '../stylesheets/QuestionView.scss';

import Question from './Question';
import Search from './Search';
import $ from 'jquery';

class QuestionView extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      page: 1,
      totalQuestions: 0,
      categories: [],
      currentCategory: ''
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    const cards = document.querySelectorAll('.question-card');
    cards.forEach((card, index) => {
      window.setTimeout(() => {
        card.classList.add('show');
      }, 100 * index);
    });
  }

  getQuestions = () => {
    $.ajax({
      url: `/questions?page=${this.state.page}`, //TODO: update request URL
      type: 'GET',
      success: result => {
        this.setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          categories: result.categories,
          currentCategory: result.current_category
        });
        return;
      },
      error: error => {
        alert('Unable to load questions. Please try your request again');
        return;
      }
    });
  };

  selectPage(num) {
    this.setState({ page: num }, () => this.getQuestions());
  }

  createPagination() {
    let pageNumbers = [];
    let maxPage = Math.ceil(this.state.totalQuestions / 10);
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-num ${i === this.state.page ? 'active' : ''}`}
          onClick={() => {
            this.selectPage(i);
          }}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  }

  getByCategory = id => {
    !id
      ? this.getQuestions()
      : $.ajax({
          url: `/categories/${id}/questions`, //Done: update request URL
          type: 'GET',
          success: result => {
            this.setState({
              questions: result.questions,
              totalQuestions: result.total_questions,
              currentCategory: result.current_category
            });
            return;
          },
          error: error => {
            alert('Unable to load questions. Please try your request again');
            return;
          }
        });
  };

  submitSearch = searchTerm => {
    $.ajax({
      url: `/questions/search`, //Done: update request URL
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ search_term: searchTerm }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: result => {
        this.setState({
          questions: result.questions,
          totalQuestions: result.total_results
        });
        return;
      },
      error: error => {
        if (error.status === 404) {
          this.setState({
            questions: [],
            totalQuestions: 0,
            currentCategory: ''
          });
        }
      }
    });
  };

  questionAction = id => action => {
    if (action === 'DELETE') {
      if (window.confirm('are you sure you want to delete the question?')) {
        $.ajax({
          url: `/questions/${id}`, //DONE: update request URL
          type: 'DELETE',
          success: result => {
            this.getQuestions();
          },
          error: error => {
            alert('Unable to load questions. Please try your request again');
            return;
          }
        });
      }
    }
  };
  handleCategoryChange = e => {
    e.preventDefault();
    this.setState({ currentCategory: e.target.value }, () => {
      this.getByCategory(this.state.currentCategory);
    });
  };

  render() {
    return (
      <div className="question-view">
        <section className="questions-header">
          <div className="categories-list">
            <h2
              onClick={() => {
                this.getQuestions();
              }}
            >
              Categories
            </h2>
            <select
              onChange={this.handleCategoryChange}
              value={this.state.currentCategory || ''}
            >
              <option value="">All</option>
              {this.state.categories.map(category => (
                <option
                  value={Object.keys(category)}
                  key={Object.keys(category)}
                >
                  {category[Object.keys(category)]}
                </option>
              ))}
            </select>
          </div>
          <Search submitSearch={this.submitSearch} />
        </section>

        <div className="questions-list">
          <h2>Questions</h2>
          {this.state.totalQuestions ? (
            this.state.questions.map((q, index) => (
              <Question
                key={q.id}
                question={q.question}
                answer={q.answer}
                category={this.state.categories[q.category - 1][q.category]}
                difficulty={q.difficulty}
                questionAction={this.questionAction(q.id)}
                index={index}
              />
            ))
          ) : (
            <h3>No Questions were found!</h3>
          )}
          <div className="pagination-menu">{this.createPagination()}</div>
        </div>
      </div>
    );
  }
}

export default QuestionView;
