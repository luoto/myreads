import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import _ from 'lodash';;

class Search extends React.Component {
  state = {
    books: [],
    booksInShelf: {}
  }

  componentWillMount() {
    this.updateBooks = _.debounce(this.updateBooks, 500);
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

  search = (event) => {
    // cannot put this in the debounce function due to synthetic event pooling done by react
    const query = event.target.value;
    if (query === '') return;

    this.updateBooks(query);
  }

  updateBooks = (query) => {
    BooksAPI.search(query, 5).then((books) => {
      const categorizedBooks = this.catorgorizeBooks(books);
      this.setState(prevState => ({books: categorizedBooks, booksInShelf: prevState.booksInShelf}));
    });
  }

  catorgorizeBooks = (books) => {
    if (books.error === "empty query") return [];
    return books.map((book) => {
      this.state.booksInShelf[book.id] ? book.shelf = this.state.booksInShelf : book.shelf = 'none';
      return book;
    });
  }

  moveShelf = (id, newShelf, currentShelf) => {
    BooksAPI.update({id}, newShelf).then((books) => {
      this.setState(prevState => {
        return prevState.books.map((book) => {
          if (book.id === id) book.shelf = newShelf;
          return book;
        })
      })
    })
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
