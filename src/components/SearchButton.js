import React from 'react'

class SearchButton extends React.Component {
  render() {
    return (
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    )
  }
}
