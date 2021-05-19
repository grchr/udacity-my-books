import React, { useState, useEffect } from "react";
import ShelfChanger from "./ShelfChanger";

const BookItem = (props) => {


  const handleShelfChangeAction = (e) => {
    props.handleShelfChangeAction(e, props.book);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${props.book.imageLinks.smallThumbnail}")`,
          }}
        ></div>
        <ShelfChanger action={handleShelfChangeAction} defaultShelf={props.book.shelf ? props.book.shelf : 'none'}/>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors.join(', ')}</div>
    </div>
  );
};

export default BookItem;
