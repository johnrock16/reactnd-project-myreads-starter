import React, { createContext, useState } from 'react';
import { getBooksShelfs} from '../utils';
import { getAll } from '../BooksAPI';

const defaultValue={
  booksShelf:[],
  books:[],
  refreshBooks:false,
  setBooks:()=>{},
  setBooksShelf:()=>{},
  setState:()=>{},
  refresh:()=>{},
  getAllBooks:()=>({books:[],booksShelf:[]}),
}

export const BooksContext= createContext(defaultValue);

export const BooksContextProvider=({children})=>{

  const [state,setState] = useState(defaultValue);

  const {books,booksShelf,refreshBooks} = state;

  const setBooks= (books)=>{
    setState((pv)=>({...pv,books}))
  }

  const setBooksShelf= (booksShelf)=>{
    setState((pv)=>({...pv,booksShelf}))
  }

  const refresh=(v)=>{
    setState((pv)=>({...pv,refreshBooks:v}))
  }

  const getAllBooks=async (forced=true)=>{
    if(!forced && booksShelf.length>0 && booksShelf.length>0){
      return {booksShelf,books};
    }
    else{
      const books= await getAll();
      const booksShelf=await getBooksShelfs(books);
      return {booksShelf,books};
    }
  }

  return(
    <BooksContext.Provider value={{
      books,
      booksShelf,
      setBooks,
      setBooksShelf,
      setState,
      refreshBooks,
      refresh,
      getAllBooks
    }}>
      {children}
    </BooksContext.Provider>
  )
}