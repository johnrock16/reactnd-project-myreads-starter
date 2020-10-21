import React, { createContext, useReducer, useEffect } from 'react';
import { getBooksShelfs} from '../utils';
import { getAll } from '../BooksAPI';
import BookReducer, { initialStateBookReducer } from '../reducer/BooksReducer';

export const BooksContext= createContext(initialStateBookReducer);

export const BooksContextProvider=({children})=>{

  const [stateReduce,dispatch] = useReducer(BookReducer, initialStateBookReducer);

  const refresh=(v)=>{dispatch({type: 'refresh', payload: v})}

  useEffect(()=>{
    if(stateReduce.refreshBooks) stateReduce.refresh(false); 
    const getAllBooks=async (forced=true)=>{
      if(!forced && stateReduce.booksShelf.length>0 && stateReduce.booksShelf.length>0){
        return {booksShelf:stateReduce.booksShelf,books:stateReduce.books};
      }
      const books= await getAll();
      const booksShelf=await getBooksShelfs(books);
      return {booksShelf,books};
    }
    const listAllBooks =async ()=>dispatch({type: 'listAllBooks', payload: await getAllBooks(refresh)});
    listAllBooks();
  },[stateReduce]);

  

  return(
    <BooksContext.Provider value={{
      stateReduce,
      dispatch,
      refresh,
    }}>
      {children}
    </BooksContext.Provider>
  )
}