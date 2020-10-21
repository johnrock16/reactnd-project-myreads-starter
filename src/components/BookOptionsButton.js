import React, { useContext, useReducer, useEffect } from 'react';
import { update } from '../BooksAPI';
import { BooksContext } from '../context/BooksContext';

const initialState={
    shelf:''
}

function reducer(state, action) {
    switch (action.type) {
      case 'changeShelf':
        return {shelf: action.payload};
      default:
        throw new Error();
    }
  }

const BookOptionsButton = ({bookID,bookShelf})=>{
    const [state,dispatch] = useReducer(reducer, initialState);
    const {shelf} = state;

    const booksContext= useContext(BooksContext);

    const onSelect = async (event)=>{
        const {value}=event.target;
        await update(bookID,value)
        booksContext.refresh(true);
        dispatch({type: 'changeShelf', payload: value})
    }

    useEffect(() => {
        dispatch({type: 'changeShelf', payload: bookShelf})
    }, [bookShelf])

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