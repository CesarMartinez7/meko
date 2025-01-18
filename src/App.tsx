
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import allLazy from './Routers/lazy'
import Navbar from "./Components/navbar"
import { IStaticMethods } from 'flyonui/flyonui';
const {Main,Manga} = allLazy

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}


function App() {
  

  useEffect(() => {
    const loadFlyonui = async () => {
      await import('flyonui/flyonui');

      window.HSStaticMethods.autoInit();
    };

    loadFlyonui();
  }, []);
  return (
    <>
      <BrowserRouter>
      <Navbar name={"Mangapyu"}></Navbar>
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/manga/:id' element={<Manga></Manga>}  ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
