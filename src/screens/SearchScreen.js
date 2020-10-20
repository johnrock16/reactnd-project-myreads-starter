import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, search } from '../BooksAPI';
import { BooksContext } from '../context/BooksContext';
import Book from '../components/Book';
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

  const getListBooks=async (forced=false)=>{
    if(!forced && booksContext?.booksShelf.length>0 && booksContext.booksShelf.length>0){
      setState((pv)=>({...pv,booksShelf:booksContext.booksShelf,books:booksContext.books}));
    }
    else{
      const books= await getAll();
      const booksShelf=await getBooksShelfs(books);
  
      setState((pv)=>({...pv,booksShelf,books}));
      booksContext.setState((pv)=>({...pv,books,booksShelf}))
    }
  }

  const searchBooks=async ()=>{
    if(searchText.length<3){
      setState((pv)=>({...pv,searchedBooks:[]}));
      return;
    }
    const result=books.filter((item)=>{
      const search= searchText.toLowerCase().replace(/[\/\\]/g,'');
      const title=item.title.toLowerCase();
      const authors=item?.authors[0].toLowerCase();
      return title.search(search)!==-1 || authors.search(search) !==-1;
    });
    let bookSearch=await search(searchText);
    bookSearch=(bookSearch.length>1)?bookSearch:[]
    setState((pv)=>({...pv,searchedBooks:[...result,...bookSearch]}));
  }

  useEffect(()=>{
    getListBooks();
  },[])

  useEffect(()=>{
    if(booksContext.refreshBooks){
      booksContext.refresh(false);
      getListBooks(true)
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