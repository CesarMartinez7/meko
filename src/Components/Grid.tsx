import { Anime } from "../Types/Anime"
import { useState,useEffect,useContext } from "react"
import { QueryContext } from "../App";
import HoverCard from "./HoverCard"

interface GridProps{
    url: string;
    text: string
}


export default function Grid({url, text = "Tus resultados"} : GridProps){
    const {query,setQuery} = useContext(QueryContext)
    const [loading,setLoading] = useState (true)
    const [data,setData] = useState <Array<Anime>>([])
    const url2 = `https://api.jikan.moe/v4/anime?q=${query}` 
    useEffect(() => {
        fetch(url.length === 0 ? url2 : url).then(response => response.json()).then(datae => {
            console.log(datae)
            setLoading(false)
            setData(datae.data)}).catch(err => console.log(`Error ${err}`))
    },[query,setQuery])

    if(loading){
        return(
            <h1>Cargando</h1>
        )
    }

    return(
        <div>
            <h3>{text}</h3>
            <section className="grid grid-cols-9 p-4 gap-4 ">
                {data.map((item) => (
                    <HoverCard item={item} key={item.mal_id}></HoverCard>
                ))}
            </section>
        </div>
    )
}