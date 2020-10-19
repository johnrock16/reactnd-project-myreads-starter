import React, { createContext, useState } from 'react';

const defaultValue={
    booksShelf:[],
    books:[],
}

export const BooksContext= createContext(defaultValue);

export const BooksContextProvider=({children})=>{

    const [state,setState] = useState(defaultValue);

    const {books,booksShelf} = state;

    const setBooks= (books)=>{
        setState((pv)=>({...pv,books}))
    }

    const setBooksShelf= (booksShelf)=>{
        setState((pv)=>({...pv,booksShelf}))
    }

    return(
        <BooksContext.Provider value={{
            books,
            booksShelf,
            setBooks,
            setBooksShelf,
            setState
        }}>
            {children}
        </BooksContext.Provider>
    )
}