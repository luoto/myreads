import React from 'react';
import Book from './Book';

function Shelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => {
            const bookProps = {
              id: book.id,
              title: book.title,
              authors: book.authors,
              thumbnail: book.imageLinks.thumbnail,
              shelf: book.shelf,
              moveShelf: props.moveShelf
            };

            return (
              <li key={book.id}>
                <Book {...bookProps} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default Shelf;
