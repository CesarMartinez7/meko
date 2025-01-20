import { lazy } from "react";


const Search = lazy(() => import("../Components/Grid"))
const Manga = lazy(() => import("../Pages/Anime"))
const ViewAnime = lazy(() => import("../Pages/ViewAnime"))


const allLazy =  {
    Search:Search,
    Manga:Manga,
    ViewAnime
}


export default allLazy