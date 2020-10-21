import React, { useContext, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import { BooksContext } from '../context/BooksContext';
import Book from '../components/Book';
import { arrayToText } from '../utils';
import BookReducer, { initialStateBookReducer } from '../reducer/BooksReducer';

const SearchScreen = (props) => {
  const [state,dispatch] = useReducer(BookReducer, initialStateBookReducer);
  const booksContext= useContext(BooksContext);

  const {books,searchText,searchedBooks} = state;

  const onHandleSearchText=(event)=>{
    const searchText=`${event.target.value}`;
    dispatch({type: 'setSearchText', payload: searchText});
  }

  useEffect(()=>{
    if(booksContext.refreshBooks) booksContext.refresh(false); 
    const listAllBooks =async ()=>dispatch({type: 'listAllBooks', payload: await booksContext.getAllBooks(booksContext.refresh)});
    listAllBooks();
  },[booksContext])

  useEffect(()=>{
    const searchBooks=async ()=>{
      const bookSearch= (searchText!=='') ? await search(searchText) : [];
  
      const bookSearchShelfs=(typeof books!=='undefined' && books.length>0)
      ? books.filter((item)=>{
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
      dispatch({type: 'searchBooks', payload: searchResults});
    }
    searchBooks();
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
          ((typeof searchedBooks!=='undefined' && searchText.length>2) && (typeof searchedBooks!=='undefined' && searchedBooks.length>0)) && (searchedBooks.map((item,index)=>(
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