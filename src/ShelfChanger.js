import React, { useState, useEffect } from "react";

const ShelfChanger = (props) => {

  useEffect(() => {
    console.log("Shelf changer");
    console.log(props.defaultShelf);
  }, [])

    return(
        <div className="book-shelf-changer">
          <select defaultValue={props.defaultShelf} onChange={(e) => {
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
