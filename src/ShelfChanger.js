import React, { useState, useEffect } from "react";

const ShelfChanger = (props) => {

    return(
        <div className="book-shelf-changer">
          <select defaultValue="move" onChange={(e) => {
              props.action(e.target.value);
          }}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead" >Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
    )

}

export default ShelfChanger;
