import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Shelf from '../components/Shelf';
import { BooksContext } from '../context/BooksContext';


const MainScreen= ()=>{
  const booksContext= useContext(BooksContext);
  const {booksShelf} = booksContext.state;

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
      {
        (typeof booksShelf !== 'undefined' && booksShelf.length>0) ? 
          booksShelf.map((item,index)=>(
            <Shelf key={`shelf${index}`} shelfName={item[0].shelf} books={item}/>
          ))
        :
        <span>Sorry but We don't find any book or shelf in your list</span>
      }
      </div>
      <div className="open-search">
        <Link to='/search'><button>Add a book</button></Link>
      </div>
    </div>
  )
}

export default React.memo(MainScreen);