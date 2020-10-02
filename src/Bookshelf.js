import React from "react"
import PropTypes from "prop-types"
import Book from "./Book";

const Bookshelf = (props) => {

  const { title, books, onShelfChanged } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      {books && <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => <Book key={book.id} book={book} onShelfChanged={onShelfChanged}/>)}
        </ol>
      </div>}
    </div>
  );
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  onShelfChanged: PropTypes.func.isRequired,
  books: PropTypes.array,
}

export default Bookshelf;
