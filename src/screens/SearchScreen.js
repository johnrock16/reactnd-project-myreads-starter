import React, { useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import Book from '../components/Book';
import { arrayToText } from '../utils';
import { search } from '../BooksAPI';

const initialState={
  searchText:'',
  searchedBooks:[]
}

const SearchScreen = (props) => {
  const [state,setState] =  useState(initialState)
  const booksContext= useContext(BooksContext);
  const {searchText, searchedBooks} = state

  const onHandleSearchText=(event)=>{
    const searchText=`${event.target.value}`;
    setState((pv)=>({...pv,searchText}));
  }

  useEffect(()=>{
    const searchBooks=async ()=>{
      const bookSearch= (searchText!=='') ? await search(searchText) : [];

      const bookSearchShelfs=(typeof booksContext.stateReduce.books!=='undefined' && booksContext.stateReduce.books.length>0)
      ? booksContext.stateReduce.books.filter((item)=>{
          const search= searchText.toLowerCase().replace(/[\\]/g,'');
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
      setState((pv)=>({...pv,searchedBooks:searchResults}));
    }
    searchBooks();
  },[searchText,booksContext.stateReduce.books])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={'/'}><button className="close-search">Close</button></Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={onHandleSearchText} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {
          ((typeof searchText!=='undefined' && searchText.length>2) && (typeof searchedBooks!=='undefined' && searchedBooks.length>0)) && (searchedBooks.map((item,index)=>(
            <li key={`search${item.title}${index}`}>
              <Book bookID={item.id} title={item.title} author={arrayToText(item?.authors)} shelf={item?.shelf} image={item?.imageLinks?.thumbnail}/>
            </li>
          )))
        }
        </ol>
      </div>
    </div>
  )
}

export default React.memo(SearchScreen);