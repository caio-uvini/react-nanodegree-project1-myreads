import React from 'react'
import PropTypes from "prop-types"
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";

class ListBooks extends React.Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    onOpenSearch: PropTypes.func.isRequired
  }

  state = {
    books: {}
  }

  componentDidMount() {
    this.refreshBooks();
  }

  refreshBooks = () => {
    BooksAPI.getAll().then(books => {
      const groupedBooks = this.groupBooksByShelf(books);
      this.setState(() => ({
        books: groupedBooks
      }))
    })
  }

  groupBooksByShelf = (books) => (
    books.reduce((booksByShelf, book) => {
      (booksByShelf[book.shelf] || (booksByShelf[book.shelf] = [])).push(book)
      return booksByShelf;
    }, {})
  );

  render() {

    const { shelves, onOpenSearch } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <Bookshelf
                key={shelf.id}
                title={shelf.title}
                books={this.state.books[shelf.id]}
                onShelfChanged={this.refreshBooks}
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
