import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../BooksAPI';
import { BooksContext } from '../context/books';
import { getBooksShelfs } from '../utils';

const initialState={
  booksShelf:[],
  books:[],
  searchText:'',
}

const SearchScreen = (props) => {
  const [state,setState] = useState(initialState)
  const booksContext= useContext(BooksContext);

  const {books,booksShelf,searchText} = state;

  const onHandleSearchText=(event)=>{
    const searchText=event.target.value;
    setState((pv)=>({...pv,searchText}));
  }

  const getListBooks=async ()=>{
    if(booksContext?.booksShelf.length>0 && booksContext.booksShelf.length>0){
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
    getListBooks()
  },[])

  useEffect(()=>{
    const result= books.filter((item)=>item.title.search(searchText)!=-1);
    console.log(result);
  },[state?.searchText])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={'/'}><button className="close-search">Close</button></Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input type="text" placeholder="Search by title or author" onChange={onHandleSearchText} />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  )
}

export default SearchScreen;