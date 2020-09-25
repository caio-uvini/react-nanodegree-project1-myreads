import React from "react"
import PropTypes from "prop-types"
import Book from "./Book";

class Bookshelf extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onShelfChanged: PropTypes.func.isRequired,
    books: PropTypes.array,
  }

  render() {

    const { title, books, onShelfChanged } = this.props;

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

}

export default Bookshelf;
