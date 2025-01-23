import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chapters } from "../Types/Chapter";

export default function ViewAnime() {
  const [data, setData] = useState<Array<Chapters>>([]);
  const [chapter, setChapter] = useState<number>(1);
  const [isDub,setIsDub] = useState(true)
  const { id, name } = useParams();

  useEffect(() => {
    const url = `https://api.jikan.moe/v4/anime/${id}/episodes`;
    fetch(url)
      .then((response) => response.json())
      .then((datae) => setData(datae.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="md:h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-black w-full md:h-screen">
        <iframe
          className="w-full md:h-screen"
          src={`https://vidsrc.cc/v2/embed/anime/ani${id}/${chapter}/${isDub ? "dub" : "sub"}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-5 lg:p-12 h-screen overflow-y-auto">
        <section>
          <h3 className="font-bold text-3xl bg-gradient-to-br from-slate-900 to-zinc-500 bg-clip-text text-transparent">
            {name?.toUpperCase().slice(1, name?.length)}
          </h3>
          <p className="font-light">Episodio {chapter}</p>
          <div className="flex gap-2 mb-4">
            <button className="btn btn-info" onClick={() =>{
              setIsDub(true)
            } }>Dub</button>
            <button className="btn-info btn" onClick={() =>{
              setIsDub(false)
            } }>Sub</button>
            <button className="btn btn-sm btn-neutral">Vidlink</button>
            <button className="btn btn-sm btn-neutral">Vidsrc</button>
          </div>
        </section>
        <ul className="grid grid-cols-5 lg:grid-cols-10 gap-2 ">
          {Array.from({ length: data.length }, (_, i) => (
            <li
              key={i}
              className="glassMorf p-2 text-center border hover:cursor-pointer"
              onClick={() => {
                setChapter(i + 1);
              }}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
