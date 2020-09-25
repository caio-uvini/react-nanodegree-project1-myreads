import React from "react"
import PropTypes from "prop-types"

class BookshelfChanger extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired
  }

  state = {
    shelf: ""
  }

  handleOnChange = (event) => {

    const newShelf = event.target.value;

    this.updateShelf(newShelf);
    this.props.onShelfChanged(this.props.book, newShelf);
  }

  updateShelf = (newValue) => this.setState(() => ({ shelf: newValue }))

  componentDidMount() {
    this.updateShelf(this.props.book.shelf);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.shelf} onChange={this.handleOnChange}>
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
