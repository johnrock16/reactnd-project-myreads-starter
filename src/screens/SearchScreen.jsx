import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../BooksAPI';
import { BooksContext } from '../context/BooksContext';
import Book from '../components/Book/Book';
import { arrayToText, getBooksShelfs } from '../utils';

const initialState={
  booksShelf:[],
  books:[],
  searchText:'',
  searchedBooks:[],
}

const SearchScreen = (props) => {
  const [state,setState] = useState(initialState)
  const booksContext= useContext(BooksContext);

  const {books,searchText,searchedBooks} = state;

  const onHandleSearchText=(event)=>{
    const searchText=`${event.target.value}`;
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

  const searchBooks=()=>{
    const result= books.filter((item)=>{
      const search= searchText.toLowerCase();
      const title=item.title.toLowerCase();
      const authors=item?.authors[0].toLowerCase();
      return title.search(search)!==-1 || authors.search(search) !==-1;
    });
    setState((pv)=>({...pv,searchedBooks:result}));
  }

  useEffect(()=>{
    getListBooks();
  },[])

  useEffect(()=>{
    searchBooks();
  },[searchText])

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
        <ol className="books-grid">
        {
          searchedBooks.map((item,index)=>(
            <li key={`search${item.title}${index}`}><Book bookID={item.id} title={item.title} author={arrayToText(item?.authors)} image={item.imageLinks.thumbnail}/></li>
          ))
        }
        </ol>
      </div>
    </div>
  )
}

export default SearchScreen;