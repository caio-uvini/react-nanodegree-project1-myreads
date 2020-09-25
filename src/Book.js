import React from "react"
import PropTypes from "prop-types"
import BookshelfChanger from "./BookshelfChanger";

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired
  }

  render() {

    const { book, onShelfChanged } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: book.imageLinks && `url(${book.imageLinks.thumbnail})`
            }}/>
            <BookshelfChanger book={book} onShelfChanged={onShelfChanged}/>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}
        </div>
      </li>
    );
  }

}

export default Book;
