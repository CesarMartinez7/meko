import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Chapters } from "../Types/Chapter";


export default function ViewAnime (){
    const [data,setData] = useState<Array<Chapters>>([])
    const [chapter,setChapter] = useState<number>(0)
    const {id} = useParams()
    useEffect(() => {
        const url = `https://api.jikan.moe/v4/anime/${id}/episodes` 
        fetch(url).then(response => response.json()).then(datae => setData(datae.data)).catch(err => console.log(err))
    },[])
    return(
        <div className="h-screen w-full grid grid-cols-2">
            <div>Video {id}</div>
            <div >
                <section >
                <h1 className="font-medium">Estas viendo {chapter}</h1>

                </section>
                <ul className="grid grid-cols-12 gap-2">
                    {Array.from({length: data.length},(_,i) => (
                        <li key={i} className="btn" onClick={() => {
                            setChapter(i + 1)
                        }}>{i + 1}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}