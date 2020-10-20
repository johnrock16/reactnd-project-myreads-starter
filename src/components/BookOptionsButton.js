import React, { useContext, useState } from 'react';
import { update } from '../BooksAPI';
import { BooksContext } from '../context/BooksContext';

const initialState={
    shelf:''
}

const BookOptionsButton = ({bookID,bookShelf})=>{
    const [state,setState] = useState(initialState)
    const {shelf} = state;

    const booksContext= useContext(BooksContext);

    const onSelect = async (event)=>{
        const {value}=event.target;
        await update(bookID,value)
        booksContext.refresh(true);
        setState((pv)=>({...pv,shelf:value}));
    }

    React.useEffect(() => {
        setState((pv)=>({...pv,shelf:bookShelf}));
    }, [])

    return(
        <div className="book-shelf-changer">
          <select onChange={onSelect} value={(typeof shelf!=='undefined')?shelf:'none'}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Current Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
          </select>
        </div>
    )
}

export default React.memo(BookOptionsButton);