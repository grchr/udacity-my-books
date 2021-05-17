import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

const BookApp = (props) => {
  //Initial book list
  const [books, setBooks] = useState([]);
  //Book lists per shelf
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  //Book maps per shelf
  const [wantToReadMap, setWantToReadMap] = useState(new Map());
  const [readMap, setReadMap] = useState(new Map());
  const [currentlyReadingMap, setCurrentlyReadingMap] = useState(new Map());

  useEffect(() => {
    // setWantToRead([]);
    // setCurrentlyReading([]);
    // setRead([]);
    loadInitialData();

    return () => {};
  }, []);

  const loadInitialData = () => {
    let data = BooksAPI.getAll();
    data.then((a) => {
      setBooks(a);
      let tempWTR = [];
      let tempWTRMap = new Map();
      let tempCR = [];
      let tempCRMap = new Map();
      let tempR = [];
      let tempRMap = new Map();
      a.filter((book) => {
        switch (book.shelf) {
          case "wantToRead":
            //Instead of this, I use temp arrays and maps which I set at the end
            //setWantToRead(oldWantToRead => [...oldWantToRead, book]);
            if (wantToReadMap.has(book.id)) {
              break;
            }
            tempWTR.push(book);
            tempWTRMap.set(book.id, book);
            break;
          case "currentlyReading":
            //setCurrentlyReading( oldCurrentlyReading => [...oldCurrentlyReading, book]);
            if (currentlyReadingMap.has(book.id)) {
              break;
            }
            tempCR.push(book);
            tempCRMap.set(book.id, book);
            break;
          case "read":
            //setRead(oldRead => [...oldRead, book]);
            if (readMap.has(book.id)) {
              break;
            }
            tempR.push(book);
            tempRMap.set(book.id, book);
            break;
          default:
            console.log("No shelf found for: " + book.id + ": " + book.title);
        }
      });

      setWantToRead(tempWTR);
      setWantToReadMap(tempWTRMap);
      setCurrentlyReading(tempCR);
      setCurrentlyReadingMap(tempCRMap);
      setRead(tempR);
      setReadMap(tempRMap);
    });
  };

  return (
    <div>
      <BookShelf title={"Currently Reading"} books={currentlyReading} />
      <BookShelf title={"Want to Read"} books={wantToRead} />
      <BookShelf title={"Read"} books={read} />
      <div className="open-search">
        <Link to="/search">Add a Book</Link>
        <div></div>
      </div>
    </div>
  );
};

export default BookApp;
