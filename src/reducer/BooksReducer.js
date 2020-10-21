export const initialStateBookReducer={
    booksShelf:[],
    books:[],
    searchText:'',
    searchedBooks:[],
}
  
export default function BookReducer(state, action) {
    switch (action.type) {
        case 'listAllBooks':
            return {...state,booksShelf:action.payload.booksShelf,books:action.payload.books};
        case 'searchBooks':
            return{...state,searchedBooks:action.payload}
        case 'setSearchText':
            return{...state,searchText:action.payload}
        default:
            throw new Error();
    }
}