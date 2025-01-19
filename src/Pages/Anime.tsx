import { useState, useEffect,memo} from "react";
import {  useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Anime } from "../Types/Anime";
import { Character } from "../Types/Character";


interface CharacteProps{
  id: string | number | undefined
}

const Characters = ({id} : CharacteProps ) => {
  const [charaters,setCharacters] = useState<Character[]>([])
  const url = `https://api.jikan.moe/v4/anime/${id}/characters`
  useEffect(() => {
    fetch(url).then(response => response.json()).then(data => setCharacters(data.data) ).catch(err  => console.log(err))
  },[])
  return(
    <div>
      <ul className="flex">
      {charaters.map((character) => (
        <li className="p-2">
          <img src={character.character.images.jpg.image_url} alt={`Imagen de ${character.character.name}`} />
          <h4>{character.character.name}</h4>
        </li>
      ))}

      </ul>
    </div>
  )
} 


function  Manga() {
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
      <div className="w-full h-[30vh] bg-gradient-to-b  bg-stone-950"></div>
      <div className="p-10 rounded-lg top-48 absolute ">
        <div className="bg-transparent w-64">
          <img
            src={anime?.images.jpg.large_image_url}
            alt=""
            className="rounded-2xl shadow-md w-full h-full"
          />
        </div>
        <h3 className="font-semibold text-7xl bg-gradient-to-br from-slate-900 to-zinc-500 bg-clip-text text-transparent">{anime?.title}</h3>
        <ul className="flex gap-3">
          {anime?.genres.map((gen) => (
            <li className="badge">{gen.name}</li>
          ))}
        </ul>

        <div>
          <button className="btn btn-wide my-2 ">
            {" "}
            <Icon icon="solar:play-line-duotone" width="20" height="20" />
            Play
          </button>
        </div>

        <p className="font-extralight btn btn-sm">{anime?.title_japanese}</p>
        <span className="font-extralight text-sm">{anime?.duration}</span>
        <button className="btn btn-circle">
          <Icon icon="solar:star-line-duotone" width="24" height="24" />
          {anime?.score}
        </button>
        <div>
          <h3 className="font-medium">Sypnosis</h3>
          <p className="font-light mt-2 text-pretty">{anime?.synopsis}</p>
        </div>
        <div>
          <h3 className="font-medium text-xl">Trailer</h3>
          <iframe
            className=" h-80 w-96 rounded-xl"
            src={anime?.trailer.embed_url}
          ></iframe>
        </div>
        <div>
          <Characters id={id}></Characters>
        </div>
      </div>
    </div>
  );
}


export default memo(Manga)