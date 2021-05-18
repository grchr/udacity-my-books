import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const SearchPage = (props) => {

  const handleShelfChangeAction = (value, book) => {
    props.handleSearchShelfChangeAction(value, book);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={(e) => {
            props.handleSearchShelfChangeAction(e);
          }}/>

        </div>
      </div>
      <BookShelf title={"Search Results"} books={props.searchResults} handleShelfChangeAction={handleShelfChangeAction}/>
    </div>
  )
}

export default SearchPage;