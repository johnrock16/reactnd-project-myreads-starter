import React from 'react';
import { arrayToText } from '../utils';
import Book from './Book';

const Shelf= ({shelfName,books})=>{
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((item,index)=>(
              <li  key={`book${shelfName}${item?.title}${index}`}>
                <Book bookID={item.id} shelf={item.shelf} title={item?.title} author={arrayToText(item.authors)} image={item?.imageLinks?.thumbnail} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

export default Shelf;