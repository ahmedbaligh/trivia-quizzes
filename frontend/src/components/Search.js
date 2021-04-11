import React, { Component } from 'react';
import { debounce } from 'lodash';

class Search extends Component {
  state = {
    query: ''
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
      <form className="search-form">
        <input
          placeholder="Search questions..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default Search;
