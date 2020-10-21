import React, { createContext, useReducer, useEffect } from 'react';
import { getBooksShelfs} from '../utils';
import { getAll } from '../BooksAPI';
import BookReducer, { initialStateBookReducer } from '../reducer/BooksReducer';

export const BooksContext= createContext(initialStateBookReducer);

export const BooksContextProvider=({children})=>{

  const [state,dispatch] = useReducer(BookReducer, initialStateBookReducer);

  const refresh=(v)=>{dispatch({type: 'refresh', payload: v})}

  useEffect(()=>{
    if(state.refreshBooks) state.refresh(false); 
    const getAllBooks=async (forced=true)=>{
      if(!forced && state.booksShelf.length>0 && state.booksShelf.length>0){
        return {booksShelf:state.booksShelf,books:state.books};
      }
      const books= await getAll();
      const booksShelf=await getBooksShelfs(books);
      return {booksShelf,books};
    }
    const listAllBooks =async ()=>dispatch({type: 'listAllBooks', payload: await getAllBooks(refresh)});
    listAllBooks();
  },[state]);

  

  return(
    <BooksContext.Provider value={{
      state,
      dispatch,
      refresh,
    }}>
      {children}
    </BooksContext.Provider>
  )
}