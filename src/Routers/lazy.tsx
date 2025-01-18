import { lazy } from "react";


const Main = lazy(() => import("../Fetch"))
const Manga = lazy(() => import("../Pages/manga"))


const allLazy =  {
    Main:Main,
    Manga:Manga
}


export default allLazy