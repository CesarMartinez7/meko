import { useStat,useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function ViewAnime (){
    const [data,setData] = useState()
    const {id} = useParams()
    useEffect(() => {
        const url = `https://api.jikan.moe/v4/anime/${id}/episodes` 
        fetch(url).then(response => response.json()).then(data => console.log(data.data)).catch(err => console.log(err))
    },[])
    return(
        <div className="h-screen w-full grid grid-cols-2">
            <div>Video {id}</div>
            <div>Capitulos</div>
        </div>
    )
}