import React from 'react'
import PropTypes from "prop-types"
import Bookshelf from "./Bookshelf"

const SHELVES = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want to Read",
  read: "Read"
}

class ListBooks extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired,
    onOpenSearch: PropTypes.func.isRequired
  }

  groupBooksByShelf = (books) => (
    books.reduce((booksByShelf, book) => {
      (booksByShelf[book.shelf] || (booksByShelf[book.shelf] = [])).push(book)
      return booksByShelf;
    }, {})
  );

  render() {

    const { books, onShelfChanged, onOpenSearch } = this.props;

    const groupedBooks = this.groupBooksByShelf(books)

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
        <div className="open-search">
          <button onClick={() => onOpenSearch()}>Add a book</button>
        </div>
      </div>
    );
  }

}

export default ListBooks;
