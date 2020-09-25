import React from "react"
import PropTypes from "prop-types"
import * as BooksAPI from "./BooksAPI";

class BookshelfChanger extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired
  }

  handleOnChange = (event) => {
    BooksAPI.update(this.props.book, event.target.value)
      .then(() => this.props.onShelfChanged());
  }

  render() {

    const { book } = this.props;

    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={this.handleOnChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }

}

export default BookshelfChanger;
