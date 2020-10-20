import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, search } from '../BooksAPI';
import { BooksContext } from '../context/BooksContext';
import Book from '../components/Book';
import { arrayToText, getBooksShelfs } from '../utils';
import Shelf from '../components/Shelf';

const initialState={
  booksShelf:[],
  books:[],
  searchText:'',
  searchedBooks:[],
}

const SearchScreen = (props) => {
  const [state,setState] = useState(initialState)
  const booksContext= useContext(BooksContext);

  const {books,searchText,booksShelf,searchedBooks} = state;

  const onHandleSearchText=(event)=>{
    const searchText=`${event.target.value}`;
    setState((pv)=>({...pv,searchText}));
  }

  const listAllBooks=async (forced=false)=>{
    const listBooks=await booksContext.getAllBooks(forced);
    setState((pv)=>({...pv,booksShelf:listBooks.booksShelf,books:listBooks.books}))
  }

  const searchBooks=async ()=>{
    if(searchText.length<3){
      setState((pv)=>({...pv,searchedBooks:[]}));
      return;
    }
    const bookSearch=await search(searchText);

    const bookSearchSelfs=books.filter((item)=>{
      const search= searchText.toLowerCase().replace(/[\/\\]/g,'');
      const title=item.title.toLowerCase();
      const authors=item?.authors[0].toLowerCase();
      return (title.search(search)!==-1 || authors.search(search) !==-1);
    });

    
    const result=(bookSearch.length>1)?bookSearch:bookSearchSelfs;
    setState((pv)=>({...pv,searchedBooks:result}));
  }

  useEffect(()=>{
    listAllBooks();
  },[])

  useEffect(()=>{
    if(booksContext.refreshBooks){
      booksContext.refresh(false);
      listAllBooks(true);
    }
  },[booksContext.refreshBooks])

  useEffect(()=>{
    searchBooks();
  },[searchText])

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
          (searchedBooks.length>0) && (searchedBooks.map((item,index)=>(
            <li key={`search${item.title}${index}`}><Book bookID={item.id} title={item.title} author={arrayToText(item?.authors)} image={item?.imageLinks?.thumbnail}/></li>
          )))
        }
        </ol>
      </div>
    </div>
  )
}

export default React.memo(SearchScreen);