import React, { useState, useEffect } from "react";
import BookItem from "./BookItem";

const BookShelf = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(props.books);
  }, [props.books]);

  const handleShelfChangeAction = (value, book) => {
    props.handleShelfChangeAction(value, book);
  };

  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => {
                return (
                  <li key={book.id}>
                    <BookItem
                      book={book}
                      handleShelfChangeAction={handleShelfChangeAction}
                      wantToReadMap={props.wantToReadMap}
                      currentlyReadingMap={props.currentlyReadingMap}
                      readMap={props.readMap}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
