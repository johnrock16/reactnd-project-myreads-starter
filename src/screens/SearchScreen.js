import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import { BooksContext } from '../context/BooksContext';
import Book from '../components/Book';
import { arrayToText } from '../utils';

const initialState={
  books:[],
  searchText:'',
  searchedBooks:[],
}

const SearchScreen = (props) => {
  const [state,setState] = useState(initialState)
  const booksContext= useContext(BooksContext);

  const {searchText,searchedBooks} = state;
  const {books} = booksContext;

  const onHandleSearchText=(event)=>{
    const searchText=`${event.target.value}`;
    setState((pv)=>({...pv,searchText}));
  }

  useEffect(()=>{
    let isMounting=true;
    const searchBooks=async ()=>{
      if(searchText.length>0){
        const bookSearchShelfs=books.filter((item)=>{
          const search= searchText.toLowerCase().replace(/[\\]/g,'');
          const title=item.title.toLowerCase();
          const authors=item?.authors[0].toLowerCase();
          return (title.search(search)!==-1 || authors.search(search) !==-1);
        });
    
        const idBooks=bookSearchShelfs.map((item)=>(item.id));
    
        let searchResults=bookSearchShelfs;
        search(searchText).then((bookSearch)=>{
          if(typeof bookSearch!=='undefined' && bookSearch.length>1){
            searchResults= [...searchResults,...bookSearch].filter((item)=>(
              !(idBooks.indexOf(item.id) !== -1 && typeof item.shelf ==='undefined')
            ));
          }
          if(isMounting){
            setState((pv)=>({...pv,searchedBooks:searchResults}));
          }
        });
      }
    }
    searchBooks();
    return(()=>{isMounting=false;})
  },[searchText,books])

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