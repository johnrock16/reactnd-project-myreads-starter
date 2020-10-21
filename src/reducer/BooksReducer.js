export const initialStateBookReducer={
    booksShelf:[],
    books:[],
    refresh:false
}
  
export default function BookReducer(state, action) {
    switch (action.type) {
        case 'listAllBooks':
            return {...state,booksShelf:action.payload.booksShelf,books:action.payload.books};
        case 'refresh':
            return {...state,refresh:action.payload}
        default:
            throw new Error();
    }
}