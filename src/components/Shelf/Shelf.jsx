import React from 'react';
import { arrayToText } from '../../utils';
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
                <Book key={`book${shelfName}${item?.title}${index}`} bookID={item.id} title={item?.title} author={arrayToText(item.authors)} image={item?.imageLinks?.thumbnail} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

export default Shelf;