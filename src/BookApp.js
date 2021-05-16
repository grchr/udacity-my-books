import React from 'react';
import { Link } from 'react-router-dom';

const BookApp = (props) => {

  return (
    <div>
      <div className="open-search">
        <Link to='/search'>Add a Book</Link>
      </div>
    </div>
  )
}

export default BookApp;