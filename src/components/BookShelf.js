import React from 'react';
import * as BooksAPI from '../BooksAPI';
import Header from './Header';
import Shelf from './Shelf';

class BookShelf extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books: books }));
  }
  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf;
