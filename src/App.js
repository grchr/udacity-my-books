import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookApp from "./BookApp";
import SearchPage from "./SearchPage";
import * as BooksAPI from "./BooksAPI";

function App() {
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

  //Search Page props
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log("init");
    loadInitialData();
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

  const handleShelfChangeAction = (value, book) => {
    BooksAPI.update(book, value)
      .then((response) => {
        //first remove the item from any existing shelves
        if (wantToReadMap.has(book.id)) {
          let tempMap = new Map([...wantToReadMap]);
          tempMap.delete(book.id);
          setWantToReadMap(tempMap);
          let array = [...wantToRead];
          let index = array.indexOf(book);
          if (index != -1) {
            array.splice(index, 1);
            setWantToRead(array);
          }
        }
        if (currentlyReadingMap.has(book.id)) {
          let tempMap = new Map([...currentlyReadingMap]);
          tempMap.delete(book.id);
          setCurrentlyReadingMap(tempMap);
          let array = [...currentlyReading];
          let index = array.indexOf(book);
          if (index !== -1) {
            array.splice(index, 1);
            setCurrentlyReading(array);
          }
        }
        if (readMap.has(book.id)) {
          let tempMap = new Map([...readMap]);
          tempMap.delete(book.id);
          setReadMap(tempMap);
          let array = [...read];
          let index = array.indexOf(book);
          if (index != -1) {
            array.splice(index, 1);
            setRead(array);
          }
        }
        // now add the item to its new shelf
        switch (value) {
          case "wantToRead":
            console.log("wantToRead");
            let tempMapWTR = new Map([...wantToReadMap]);
            tempMapWTR.set(book.id, book);
            setWantToReadMap(tempMapWTR);
            setWantToRead((oldWantToRead) => [...oldWantToRead, book]);
            break;
          case "currentlyReading":
            console.log("currentlyReading");
            let tempMapCR = new Map([...currentlyReadingMap]);
            tempMapCR.set(book.id, book);
            setCurrentlyReadingMap(tempMapCR);
            setCurrentlyReading((oldCurrentlyReading) => [
              ...oldCurrentlyReading,
              book,
            ]);
            break;
          case "read":
            console.log("read");
            let tempMapR = new Map([...readMap]);
            tempMapR.set(book.id, book);
            setReadMap(tempMapR);
            setRead((oldRead) => [...oldRead, book]);
            break;
          case "none":
            //do nothing. just delete the item from every shelf
            break;
          default:
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const searchAction = (e) => {
    if (!e) {
      setSearchValue("");
      setSearchResults([]);
    } else {
      setSearchValue(e);
      BooksAPI.search(e).then((result) => {
        if (result) {
          const finalResult = result.filter((book) => {
            return (
              book.authors !== undefined &&
              book.authors.length !== 0 &&
              book.title !== undefined &&
              book.imageLinks !== undefined &&
              book.imageLinks.smallThumbnail !== undefined
            );
          });
          setSearchResults(finalResult);
        }
      }).catch((error) => {
      });
    }
  };

  return (
    <div className="app">
      <Router>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <BookApp
                  wantToRead={wantToRead}
                  read={read}
                  currentlyReading={currentlyReading}
                  handleShelfChangeAction={handleShelfChangeAction}
                />
              )}
            />
            <Route
              path="/search"
              component={() => (
                <SearchPage
                  handleShelfChangeAction={handleShelfChangeAction}
                  searchResults={searchResults}
                  searchAction={searchAction}
                  searchValue={searchValue}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
