import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const BookApp = (props) => {
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);

  useEffect(() => {
    setWantToRead(props.wantToRead);
    setCurrentlyReading(props.currentlyReading);
    setRead(props.read);
  }, []);


  const handleShelfChangeAction = (value, book) => {
    props.handleShelfChangeAction(value,book);
  }

  return (
    <div>
      <BookShelf title={"Currently Reading"} books={currentlyReading} handleShelfChangeAction={handleShelfChangeAction}/>
      <BookShelf title={"Want to Read"} books={wantToRead} handleShelfChangeAction={handleShelfChangeAction}/>
      <BookShelf title={"Read"} books={read} handleShelfChangeAction={handleShelfChangeAction}/>
      <div className="open-search">
        <Link to="/search">Add a Book</Link>
        <div></div>
      </div>
    </div>
  );
};

export default BookApp;
