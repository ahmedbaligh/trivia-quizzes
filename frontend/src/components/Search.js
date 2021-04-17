import React, { Component } from 'react';
import { debounce } from 'lodash';

class Search extends Component {
  state = { query: '' };

  handleInputChange = debounce(() => {
    this.setState({ query: this.search.value }, () =>
      this.props.submitSearch(this.state.query.trim())
    );
  }, 1000);

  render() {
    return (
      <input
        type="text"
        placeholder="Search questions"
        ref={input => (this.search = input)}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default Search;
