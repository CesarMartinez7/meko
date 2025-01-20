import { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Anime } from "../Types/Anime";
import { Character } from "../Types/Character";

// Import Swiper styles

interface CharactersProps {
  id: string | number | undefined;
}

const Characters = ({ id }: CharactersProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const url = `https://api.jikan.moe/v4/anime/${id}/characters`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data.data))
      .catch((err) => console.log(err));
  }, [url]);

  const handleNext = () => {
    const list = document.getElementById("list") as HTMLElement | null;
    if (list) {
      list.scrollLeft += 300;
    }
  };

  const handleBack = () => {
    const list = document.getElementById("list") as HTMLElement | null;
    if (list) {
      list.scrollLeft -= 300;
    }
  };

  return (
    <div className="mt-12">
      <h3 className="font-medium mb-2">Casting</h3>
      <ul
        className="overflow-hidden gap-6 flex flex-nowrap w-full max-w-full"
        id="list"
        style={{ scrollBehavior: "smooth" }}
      >
        {characters.map((character) => (
          <li
            key={character.character.mal_id}
            className="rounded-lg flex-shrink-0 h-48 z-10 hover:scale-105 duration-200 relative"
            data-hidden="1"
          >
            <img
              src={character.character.images.jpg.image_url}
              className="rounded-lg w-fit h-full object-cover  -z-10"
              alt={`Imagen de ${character.character.name}`}
            />
            <div className="absolute inset-0 hover:z-30  bg-gradient-to-b w-full h-full from-slate-900 to-transparent duration-200 scale-105 rounded-xl text-white text-[11px] p-3">
              <div className="flex justify-between">
                <span className="text-white ">{character.character.name}</span>
                <span> {"<3"} {character.favorites}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="inline-flex mt-4 gap-2">
        <button
          onClick={handleBack}
          className="btn px-4 py-2 rounded-lg font-medium"
        >
          <Icon icon="tabler:chevrons-left" width="24" height="24" />
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="btn px-4 py-2 rounded-lg font-medium"
        >
          Siguiente
          <Icon icon="tabler:chevrons-right" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

function Manga() {
  function formatToSlug(text: string) {
    return text
      .toLowerCase() // Convierte a minúsculas
      .trim() // Elimina espacios en los extremos
      .replace(/\s+/g, "-") // Reemplaza espacios por guiones
      .replace(/[^\w\-]+/g, ""); // Elimina caracteres especiales
  }
  const handleCLickNavigate = (id: number | undefined, name: string ) => {
    navigate(`/anime/${id}/:${formatToSlug(name)}/play`);
  };
  const navigate = useNavigate();
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
    <div className="mt-auto ">
      <div className="w-full h-[30vh] bg-gradient-to-b  bg-stone-950"></div>
      <div className="p-10 rounded-lg top-48 absolute w-full z-0 ">
        <div className=" w-64">
          <img
            src={anime?.images.jpg.large_image_url}
            alt=""
            className="rounded-2xl shadow-md w-full h-full"
          />
        </div>
      </div>
      <div className="p-10 mt-52 grid grid-cols-1 gap-6">
        <h3 className="font-semibold text-7xl bg-gradient-to-br from-slate-900 to-zinc-500 bg-clip-text text-transparent">
          {anime?.title}
        </h3>
        <ul className="flex gap-3">
          {anime?.genres.map((gen) => (
            <li className="badge" key={gen.mal_id}>
              {gen.name}
            </li>
          ))}
        </ul>

        <div>
          <button
            className="btn btn-wide my-2 "
            onClick={() => {
              handleCLickNavigate(anime?.mal_id,anime?.title);
            }}
          >
            {" "}
            <Icon icon="solar:play-line-duotone" width="20" height="20" />
            Play
          </button>
        </div>
        {/* // Stats y  datos */}
        <div>
          <p className="font-extralight btn btn-sm">{anime?.title_japanese}</p>
          <span className="font-extralight text-sm">{anime?.duration}</span>
          <button className="btn btn-circle">
            <Icon icon="solar:star-line-duotone" width="24" height="24" />
            {anime?.score}
          </button>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-2 divide-x">
          <div className="border-gray-100 pr-6 ">
            <h3 className="font-medium">Sypnosis</h3>
            <p className="font-light mt-2 text-pretty">{anime?.synopsis}</p>
          </div>
          <div className="flex flex-col  justify-center w-full h-full">
            <h3 className="font-medium text-xl text-center ">Trailer</h3>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <iframe
                title={anime?.title_japanese}
                className="rounded-xl w-[60%] h-[350px]"
                src={anime?.trailer.embed_url}
              ></iframe>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <Characters id={id}></Characters>
        </div>
      </div>
    </div>
  );
}

export default memo(Manga);
