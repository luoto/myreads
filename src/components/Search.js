import React from 'react'

class Search extends React.Component {
  state = {
    books: [],
    booksInShelf: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: [],
        booksInShelf: this.booksToID(books)
      })
    });
  }

  booksToID = (books) => {
    return books.reduce((obj, book) => {
      obj[book.id] = book.shelf;
      return obj;
    }, {});
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.value} onChange={this.search} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.map((book) => {
                const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : null;
                const props = {
                  id: book.id,
                  shelf: book.shelf,
                  title: book.title,
                  authors: book.authors,
                  thumbnail,
                  moveShelf: this.moveShelf
                };

                return (
                  <li key={book.id}>
                    <Book {...props} />
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
