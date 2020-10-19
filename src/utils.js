export const getBooksShelfs=async (books)=>{
    

    let shelfs=[]

    books.filter((item)=>{
      if(shelfs.indexOf(item.shelf)==-1){
        shelfs.push(item.shelf)
      }
    })

    return shelfs.map((itemShelfs)=>(
      books.filter((itemBooks)=>itemShelfs==itemBooks.shelf)
    ))
  }

export const arrayToText = (array)=> array.toString().replace(',',' and ')