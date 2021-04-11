import React, { Component } from 'react';
import { debounce } from 'lodash';

class Search extends Component {
  state = {
    query: ''
  };

  getInfo = event => {
    event.preventDefault();
    this.props.submitSearch(this.state.query);
  };

  handleInputChange = debounce(() => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        this.props.submitSearch(this.state.query);
      }
    );
  }, 100);

  render() {
    return (
      <form className="search-form" onSubmit={this.getInfo}>
        <input
          placeholder="Search questions..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <input type="submit" value="Submit" className="button" />
      </form>
    );
  }
}

export default Search;
