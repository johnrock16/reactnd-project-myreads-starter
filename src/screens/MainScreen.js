import React,{useContext, useEffect,useReducer} from 'react';
import {Link} from 'react-router-dom';
import Shelf from '../components/Shelf';
import { BooksContext } from '../context/BooksContext';
import BookReducer,{initialStateBookReducer} from '../reducer/BooksReducer';


const MainScreen= ()=>{
  const [state,dispatch] = useReducer(BookReducer, initialStateBookReducer);
  const booksContext= useContext(BooksContext);

  const {booksShelf} = state;

  useEffect(()=>{
    if(booksContext.refreshBooks) booksContext.refresh(false); 
    const listAllBooks =async ()=>dispatch({type: 'listAllBooks', payload: await booksContext.getAllBooks(booksContext.refresh)});
    listAllBooks();
  },[booksContext])

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