export const getBooksShelfs=async (books)=>{
  let shelfs=[]

  books.filter((item)=>{
    if(shelfs.indexOf(item.shelf)===-1){
      shelfs.push(item.shelf)
    }
  })

  return shelfs.map((itemShelfs)=>(
    books.filter((itemBooks)=>itemShelfs===itemBooks.shelf)
  ))
}

export const arrayToText = (array)=> (typeof array!=='undefined' && array.length>0)?array.toString().replace(',',' and '):'uknown author'