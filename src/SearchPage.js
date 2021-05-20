import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const SearchPage = (props) => {
  useEffect(() => {}, []);

  const handleShelfChangeAction = (value, book) => {
    props.handleShelfChangeAction(value, book);
  };

  const searchBooks = (e) => {
    props.searchAction(e);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={props.searchValue}
            onChange={(e) => {
              searchBooks(e.target.value);
            }}
          />
        </div>
      </div>
      {props.searchResults.length === 0 ? (
        <></>
      ) : (
        <BookShelf
          title={"Search Results"}
          books={props.searchResults}
          handleShelfChangeAction={handleShelfChangeAction}
          wantToReadMap={props.wantToReadMap}
          currentlyReadingMap={props.currentlyReadingMap}
          readMap={props.readMap}
        />
      )}
    </div>
  );
};

export default SearchPage;
