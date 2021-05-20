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
        //clear and update cache maps
        let tempMapWTR = new Map([...wantToReadMap]);
        tempMapWTR.delete(book.id);
        let tempMapCR = new Map([...currentlyReadingMap]);
        tempMapCR.delete(book.id);
        let tempMapR = new Map([...readMap]);
        tempMapR.delete(book.id);
        switch (value) {
          case "wantToRead":
            book.shelf = "wantToRead";
            tempMapWTR.set(book.id, book);
            break;
          case "currentlyReading":
            book.shelf = "currentlyReading";
            tempMapCR.set(book.id, book);
            break;
          case "read":
            book.shelf = "read";
            tempMapR.set(book.id, book);
            break;
          default:
        }
        //re initialize shelf arrays and add objects from cache
        let tempWTR = [];
        response.wantToRead.forEach((id) => {
          if (tempMapWTR.has(id)) {
            tempWTR.push(tempMapWTR.get(id));
          }
        });

        let tempCR = [];
        response.currentlyReading.forEach((id) => {
          if (tempMapCR.has(id)) {
            tempCR.push(tempMapCR.get(id));
          }
        });

        let tempR = [];
        response.read.forEach((id) => {
          if (tempMapR.has(id)) {
            tempR.push(tempMapR.get(id));
          }
        });

        console.log(tempWTR);
        console.log(tempCR);
        console.log(tempR);
        setWantToRead(tempWTR);
        setCurrentlyReading(tempCR);
        setRead(tempR);
        setWantToReadMap(tempMapWTR);
        setCurrentlyReadingMap(tempMapCR);
        setReadMap(tempMapR);
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
      BooksAPI.search(e)
        .then((result) => {
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
        })
        .catch((error) => {
          console.log(error.message);
          setSearchResults([]);
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
                  wantToReadMap={wantToReadMap}
                  currentlyReadingMap={currentlyReadingMap}
                  readMap={readMap}
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
                  wantToReadMap={wantToReadMap}
                  currentlyReadingMap={currentlyReadingMap}
                  readMap={readMap}
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
