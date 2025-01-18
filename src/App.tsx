import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import allLazy from './Routers/lazy'

const {Main,Manga} = allLazy

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/manga/:id' element={<Manga></Manga>}  ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
