export const getBooksShelfs=async (books)=>{
  let shelfs=[]

  for(let item in books){
    if(shelfs.indexOf(books[item].shelf)===-1){
      shelfs.push(books[item].shelf)
    }
  }

  return shelfs.map((itemShelfs)=>(
    books.filter((itemBooks)=>itemShelfs===itemBooks.shelf)
  ))
}

export const arrayToText = (array)=> (typeof array!=='undefined' && array.length>0)?array.toString().replace(',',' and '):'uknown author'