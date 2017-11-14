import React from 'react';
import * as BooksAPI from '../BooksAPI';
import Header from './Header';
import Shelf from './Shelf';

class BookShelf extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books: books }));
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
    const books = this.state.books;

    return (
      <div>
      <div className="list-books">
        <Header />
        <div className="list-books-content">
          <div>
            <Shelf id="currentlyReading" shelfTitle="Currently Reading" books={books.filter(book => book.shelf === 'currentlyReading')} moveShelf={this.moveShelf}/>
            <Shelf id="wantToRead" shelfTitle="Want to Read" books={books.filter(book => book.shelf === 'wantToRead')} moveShelf={this.moveShelf}/>
            <Shelf id="read" shelfTitle="Read" books={books.filter(book => book.shelf === 'read')} moveShelf={this.moveShelf}/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default BookShelf;
