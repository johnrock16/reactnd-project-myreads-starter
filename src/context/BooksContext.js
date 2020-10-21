import React, { createContext, useReducer, useState, useEffect } from 'react';
import { getBooksShelfs} from '../utils';
import { getAll, search } from '../BooksAPI';
import BookReducer, { initialStateBookReducer } from '../reducer/BooksReducer';

const defaultValue={
  booksShelf:[],
  books:[],
  refreshBooks:false,
  setBooks:()=>{},
  setBooksShelf:()=>{},
  setState:()=>{},
  refresh:()=>{},
}

export const BooksContext= createContext(defaultValue);

export const BooksContextProvider=({children})=>{

  const [state,setState] = useState(defaultValue);
  const [stateReduce,dispatch] = useReducer(BookReducer, initialStateBookReducer);

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

  useEffect(()=>{
    const searchBooks=async ()=>{
      const bookSearch= (stateReduce.searchText!=='') ? await search(stateReduce.searchText) : [];

      const bookSearchShelfs=(typeof stateReduce.books!=='undefined' && stateReduce.books.length>0)
      ? stateReduce.books.filter((item)=>{
          const search= stateReduce.searchText.toLowerCase().replace(/[\\]/g,'');
          const title=item.title.toLowerCase();
          const authors=item?.authors[0].toLowerCase();
          return (title.search(search)!==-1 || authors.search(search) !==-1);
        })
      : [];
  
      const idBooks=bookSearchShelfs.map((item)=>(item.id));
      let searchResults=bookSearchShelfs;
      
      if(typeof bookSearch!=='undefined' && bookSearch.length>1){
        searchResults= [...searchResults,...bookSearch].filter((item)=>(
          !(idBooks.indexOf(item.id) !== -1 && typeof item.shelf ==='undefined')
        ));
      }
      dispatch({type: 'searchBooks', payload: searchResults});
    }
    searchBooks();
  },[stateReduce.searchText,stateReduce.books])

  return(
    <BooksContext.Provider value={{
      books,
      booksShelf,
      setBooks,
      setBooksShelf,
      setState,
      stateReduce,
      dispatch,
      refreshBooks,
      refresh,
    }}>
      {children}
    </BooksContext.Provider>
  )
}