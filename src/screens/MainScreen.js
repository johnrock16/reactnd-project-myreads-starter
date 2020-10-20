import React,{useContext, useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Shelf from '../components/Shelf';
import { BooksContext } from '../context/BooksContext';

const initialState={
  booksShelf:[],
}

const MainScreen= ()=>{
  const [state,setState] = useState(initialState);
  const booksContext= useContext(BooksContext);

  const {booksShelf} = state;

  const listAllBooks=async (forced=false)=>{
    const listBooks=await booksContext.getAllBooks(forced);
    setState((pv)=>({...pv,booksShelf:listBooks.booksShelf,books:listBooks.books}))
  }

  useEffect(()=>{
    listAllBooks();
  },[])

  useEffect(()=>{
    if(booksContext.refreshBooks){
      booksContext.refresh(false);
      listAllBooks(true)
    }
  },[booksContext.refreshBooks])

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
      {
        booksShelf.map((item,index)=>(
          <Shelf key={`shelf${index}`} shelfName={item[0].shelf} books={item}/>
        ))
      }
      </div>
      <div className="open-search">
        <Link to='/search'><button>Add a book</button></Link>
      </div>
    </div>
  )
}

export default React.memo(MainScreen);