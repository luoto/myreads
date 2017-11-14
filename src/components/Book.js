import React from 'react';

class Book extends React.Component {
  handleChange = (e) => {
    const newShelf = e.target.value;
    const currentShelf = this.props.shelf;
    this.props.moveShelf(this.props.id, newShelf, currentShelf);
  }
  render() {
    const backgroundImage = this.props.thumbnail ? `url("${this.props.thumbnail}")` : null;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage}}></div>
          <div className="book-shelf-changer">
            <select defaultValue={this.props.shelf || 'none'} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors ? this.props.authors.join(', ') : 'N/A'}</div>
      </div>
    )
  }
}

export default Book;
