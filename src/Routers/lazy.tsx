import { lazy } from "react";


const Search = lazy(() => import("../Components/Grid"))
const Manga = lazy(() => import("../Pages/Anime"))


const allLazy =  {
    Search:Search,
    Manga:Manga
}


export default allLazy