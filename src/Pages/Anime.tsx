import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Anime } from "../Types/Anime";


export default function Manga() {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const endPoint = `https://api.jikan.moe/v4/anime/${id}/full`;
  useEffect(() => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((dataa) => {
        setAnime(dataa.data);
      });
  }, [id]);
  return (
    <div className="">
      <div className="w-full h-[30vh] bg-gradient-to-b  bg-stone-950">
      </div>
      <div className="p-10 rounded-lg top-48 absolute ">
        <div className="bg-transparent w-64">
          <img src={anime?.images.jpg.large_image_url} alt="" className="rounded-2xl shadow-md w-full h-full"/>
        </div>
        <p className="font-extralight">{anime?.title_japanese}</p>
        <h3 className="font-semibold text-7xl">{anime?.title}</h3>
        <span className="font-extralight text-sm">{anime?.duration}</span>
        <button className="button">
          <Icon icon="tabler:play" width="20" height="20" />
          Play
        </button>
        <p>{anime?.score}</p>
        <p>{anime?.synopsis}</p>
      </div>
    </div>
  );
}
