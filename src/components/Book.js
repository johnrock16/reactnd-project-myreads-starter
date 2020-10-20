import React from 'react';
import BookOptionsButton from './BookOptionsButton';

const Book=({bookID,title,author,image, shelf})=>{
  return(
    <div className="book">
      <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${image})` }}/>
          <BookOptionsButton bookID={bookID} bookShelf={shelf}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  )
}

export default Book;