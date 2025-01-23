import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chapters } from "../Types/Chapter";

export default function ViewAnime() {
  const [data, setData] = useState<Array<Chapters>>([]);
  const [chapter, setChapter] = useState<number>(1);
  const [isDub, setIsDub] = useState(true);
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
          className="w-full h-[350px] md:h-screen"
          src={`https://vidsrc.cc/v2/embed/anime/ani${id}/${chapter}/${
            isDub ? "dub" : "sub"
          }`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-5 lg:p-12 h-screen overflow-y-auto">
        <section>
          <h3 className="font-bold text-3xl ">
            <p className="text-[13px] font-extralight">Episodio {chapter}</p>
            {name?.toUpperCase().slice(1, name?.length)}
          </h3>
          <p className="text-[13px]">{data[chapter]?.title}</p>
          <p className="text-[13px]">{data[chapter]?.title_japanese}</p>

          <div className="flex gap-2 mb-4">
            <button
              className="btn btn-sm"
              onClick={() => {
                setIsDub(true);
              }}
            >
              Dub
            </button>
            <button
              className="btn btn-sm"
              onClick={() => {
                setIsDub(false);
              }}
            >
              Sub
            </button>
            <button className="btn btn-sm ">Vidlink</button>
            <button className="btn btn-sm ">Vidsrc</button>
          </div>
        </section>
        <ul className="grid grid-cols-5 lg:grid-cols-10 gap-2 ">
          {Array.from({ length: data.length }, (_, i) => (
            <li
              key={i}
              className="kbd"
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
