import React from 'react'
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf"

const SHELVES = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want to Read",
  read: "Read"
}

const groupBooksByShelf = (books) => (
  books.reduce((booksByShelf, book) => {
    (booksByShelf[book.shelf] || (booksByShelf[book.shelf] = [])).push(book)
    return booksByShelf;
  }, {})
);

const ListBooks = (props) => {

  const { books, onShelfChanged } = props;

  const groupedBooks = groupBooksByShelf(books);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.entries(SHELVES).map(([shelfId, shelfTitle]) => (
            <Bookshelf
              key={shelfId}
              title={shelfTitle}
              books={groupedBooks[shelfId]}
              onShelfChanged={onShelfChanged}
            />
          ))}
        </div>
      </div>
      <Link className="open-search" to="/search">
        <button>Add a book</button>
      </Link>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChanged: PropTypes.func.isRequired
}

export default ListBooks;
