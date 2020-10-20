import React,{useContext, useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import { getAll } from '../BooksAPI';
import Shelf from '../components/Shelf';
import { BooksContext } from '../context/BooksContext';
import { getBooksShelfs} from '../utils';

const initialState={
  booksShelf:[],
}

const MainScreen= ()=>{
  const [state,setState] = useState(initialState);
  const booksContext= useContext(BooksContext);

  const {booksShelf} = state;


  const getAllBooks=async (forced=true)=>{
    if(!forced && booksContext?.booksShelf.length>0 && booksContext.booksShelf.length>0){
      setState((pv)=>({...pv,booksShelf:booksContext.booksShelf,books:booksContext.books}));
    }
    else{
      const books= await getAll();
      const booksShelf=await getBooksShelfs(books);
  
      setState((pv)=>({...pv,booksShelf,books}));
      booksContext.setState((pv)=>({...pv,books,booksShelf}))
    }
  }

  useEffect(()=>{
    getAllBooks();
  },[])

  useEffect(()=>{
    if(booksContext.refreshBooks){
      booksContext.refresh(false);
      getAllBooks(true)
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

export default MainScreen;