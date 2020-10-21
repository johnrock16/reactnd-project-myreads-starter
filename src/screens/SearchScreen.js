import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import Book from '../components/Book';
import { arrayToText } from '../utils';

const SearchScreen = (props) => {
  const booksContext= useContext(BooksContext);
  const {searchText, searchedBooks} = booksContext.stateReduce;

  const onHandleSearchText=(event)=>{
    const searchText=`${event.target.value}`;
    booksContext.dispatch({type: 'setSearchText', payload: searchText});
  }

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