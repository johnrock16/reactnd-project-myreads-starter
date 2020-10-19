import React from 'react';
import Book from '../Book/Book';

const Shelf= ({shelfName,books})=>{
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((item,index)=>(
              <li>
                <Book key={`book${shelfName}${item?.title}${index}`} title={item?.title} author={item?.authors[0]} image={item?.imageLinks?.thumbnail} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

export default Shelf;