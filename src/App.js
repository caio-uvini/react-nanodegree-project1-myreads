import React from 'react'
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  replaceBook = (books, updatedBook) => (
    [...books.filter(book => book.id !== updatedBook.id), updatedBook]
  )

  onShelfChanged = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(prevState => ({
        books: this.replaceBook(prevState.books, { ...book, shelf: shelf })
      }))
    });
  }

  refreshBooks = () => {
    BooksAPI.getAll().then(books => this.setState(() => ({
      books: books
    })))
  }

  componentDidMount() {
    this.refreshBooks();
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            booksInShelves={this.state.books}
            onShelfChanged={this.onShelfChanged}
            onCloseSearch={() => this.setState({ showSearchPage: false })}
          />
        ) : (
          <ListBooks
            books={this.state.books}
            onShelfChanged={this.onShelfChanged}
            onOpenSearch={() => this.setState({ showSearchPage: true })}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
