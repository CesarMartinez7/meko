
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import {  useState,createContext} from 'react'
import './App.css'
import allLazy from './Routers/lazy'
import Navbar from "./Components/Navbar"
import HomePage from './Pages/Home'
const {Search,Manga} = allLazy


type StateContextType = [string, React.Dispatch<React.SetStateAction<string>>];


export const QueryContext = createContext<StateContextType | undefined>(undefined)

function App() {
  const [query,setQuery] = useState("")
  return (
    <>
    <QueryContext.Provider value={{query,setQuery}}>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/anime/:id' element={<Manga></Manga>}></Route>
          <Route path='/search' element={<Search url='' text='Tus Resultados'></Search>}></Route>
        </Routes>
      </BrowserRouter>
    </QueryContext.Provider>
    </>
  )
}

export default App
