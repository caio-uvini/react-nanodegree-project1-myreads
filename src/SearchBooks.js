import React, { Component } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import Book from "./Book"
import * as BooksAPI from "./BooksAPI"

class SearchBooks extends Component {

  static propTypes = {
    booksInShelves: PropTypes.array,
    onShelfChanged: PropTypes.func.isRequired
  }

  state = {
    terms: "",
    results: []
  }

  onSearchTermChanged = (event) => {

    const newTerms = event.target.value;

    if (!newTerms) {
      this.setState(() => ({
        terms: "",
        results: []
      }));
      return;
    }

    this.setState(() => ({ terms: newTerms }));

    BooksAPI.search(newTerms).then(books => {
      this.setState(() => ({
        results: (!books || books.error) ? [] : books
      }))
    })
  }

  withShelf = (booksInShelves, booksFromSearch) => (
    booksFromSearch.map(bookFromSearch => {
      const inShelf = booksInShelves.find(bis => bis.id === bookFromSearch.id)
      return { ...bookFromSearch, shelf: inShelf ? inShelf.shelf : "none" }
    })
  )

  render() {

    const { booksInShelves, onShelfChanged } = this.props;

    const booksWithShelf = this.withShelf(booksInShelves, this.state.results);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.terms}
              onChange={this.onSearchTermChanged}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksWithShelf && booksWithShelf.map(book => (
              <Book key={book.id} book={book} onShelfChanged={onShelfChanged}/>)
            )}
          </ol>
        </div>
      </div>
    );
  }

}

export default SearchBooks;
