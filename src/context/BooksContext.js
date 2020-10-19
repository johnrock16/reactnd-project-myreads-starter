import React, { createContext, useState } from 'react';

const defaultValue={
  booksShelf:[],
  books:[],
  refreshBooks:false,
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

  return(
    <BooksContext.Provider value={{
      books,
      booksShelf,
      setBooks,
      setBooksShelf,
      setState,
      refreshBooks,
      refresh
    }}>
      {children}
    </BooksContext.Provider>
  )
}