import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const BookApp = (props) => {

  useEffect(() => {
  }, []);


  const handleShelfChangeAction = (value, book) => {
    props.handleShelfChangeAction(value,book);
  }

  return (
    <div>
      <BookShelf title={"Currently Reading"} books={props.currentlyReading} handleShelfChangeAction={handleShelfChangeAction}/>
      <BookShelf title={"Want to Read"} books={props.wantToRead} handleShelfChangeAction={handleShelfChangeAction}/>
      <BookShelf title={"Read"} books={props.read} handleShelfChangeAction={handleShelfChangeAction}/>
      <div className="open-search">
        <Link to="/search">Add a Book</Link>
        <div></div>
      </div>
    </div>
  );
};

export default BookApp;
