import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext, Suspense } from "react";
import "./App.css";
import allLazy from "./Routers/lazy";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/Home";
import Loading from "./Components/Loding";
const { Search, Manga, ViewAnime} = allLazy;
import Footer from "./Components/Footer";

interface QueryContextType {
  query: string;
  setQuery: (query: string) => void;
}

const defaultValue: QueryContextType = {
  query: "",
  setQuery: function () {}, // Función vacía por defecto
};

export const QueryContext = createContext<QueryContextType>(defaultValue);

function App() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex flex-col">
    <Suspense fallback={<Loading/>} >
      <QueryContext.Provider value={{ query, setQuery }}>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/loading" element={<Loading></Loading>}></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/anime/:id" element={<Manga></Manga>}></Route>
            <Route path="/anime/:id/:name/play" element={<ViewAnime/>}></Route>
            <Route
              path="/search"
              element={<Search url="" text="Tus Resultados"></Search>}
            ></Route>
          </Routes>
          <div className="mt-auto">
          <Footer/>
          </div>
        </BrowserRouter>
      </QueryContext.Provider>
    </Suspense>
    </div>
  );
}

export default App;
