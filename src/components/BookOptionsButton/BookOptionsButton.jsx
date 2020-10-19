import React, { useContext } from 'react';
import { update } from '../../BooksAPI';
import { BooksContext } from '../../context/BooksContext';

const BookOptionsButton = ({bookID})=>{

    const booksContext= useContext(BooksContext);

    const onSelect = async (event)=>{
        await update(bookID,event.target.value)
        booksContext.refresh(true);
    }

    return(
        <div className="book-shelf-changer">
          <select onChange={onSelect}>
              <option value="move" selected disabled>Move to...</option>
              <option value="currentlyReading">Current Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
          </select>
        </div>
    )
}

export default BookOptionsButton;