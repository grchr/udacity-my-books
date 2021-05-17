import React, { useState, useEffect } from "react";

const BookItem = (props) => {

    const [book, setBook] = useState();

    useEffect(() => {
        setBook(props);
    })


  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: 'url("")',
          }}
        ></div>
        <div className="book-shelf-changer">
          <select>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  );
};

export default BookItem;
