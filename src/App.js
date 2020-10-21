import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { BooksContextProvider } from './context/BooksContext'
import MainScreen from './screens/MainScreen'
import SearchScreen from './screens/SearchScreen'

const BooksApp = ()=>{
  return (
    <BrowserRouter>
      <div className="app">
        <BooksContextProvider>
          <Route path={'/search'} component={SearchScreen}/>
          <Route exact path={'/'} component={MainScreen}/>
        </BooksContextProvider>
      </div>
    </BrowserRouter>
  )
}

export default BooksApp
