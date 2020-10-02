import React, { Component } from 'react'
import { Route } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  replaceBook = (books, updatedBook) => (
    [...books.filter(book => book.id !== updatedBook.id), updatedBook]
  )

  onShelfChanged = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(prevState => ({
        books: this.replaceBook(prevState.books, { ...book, shelf: shelf })
      }));
    });
  }

  refreshBooks = () => {
    BooksAPI.getAll().then(books => this.setState(() => ({
      books: books
    })));
  }

  componentDidMount() {
    this.refreshBooks();
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onShelfChanged={this.onShelfChanged}/>
        )}/>

        <Route path={"/search"} render={() => (
          <SearchBooks booksInShelves={this.state.books} onShelfChanged={this.onShelfChanged}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
