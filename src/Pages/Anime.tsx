import { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Anime } from "../Types/Anime";
import { Character } from "../Types/Character";
import Loading from "../Components/Loding";

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
      <h3 className="font-semibold mb-2">Casting</h3>
      <ul
      id="list"
        className="flex overflow-hidden gap-4 rounded-lg"
        style={{ scrollBehavior: "smooth" }}
      >
        {characters.map((character) => (
          <li
            key={character.character.mal_id}
            className="rounded-lg flex-shrink-0 h-48  hover:scale-110  duration-200 relative"
            data-hidden="1"
          >
            <img
              src={character.character.images.jpg.image_url}
              className="rounded-lg w-fit max-w-[130px] h-full object-cover  -z-10"
              alt={`Imagen de ${character.character.name}`}
            />
            <div className="absolute inset-0 hover:z-30 flex justify-end flex-col bg-gradient-to-b w-full h-full from-transparent to-base-100 duration-200    text-[11px] p-3 ">
              <div className="flex justify-between">
                <span className=" ">{character.character.name}</span>
                <span className="inline-flex gap-0.5 justify-center">
                  <Icon icon="solar:heart-linear" width="14" height="14" />{" "}
                  {character.favorites}
                </span>
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
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const handleCLickNavigate = (
    id: number | undefined,
    name: string | null | undefined
  ) => {
    if (id && name) {
      navigate(`/anime/${id}/${name}/${anime?.episodes}/play`);
    }
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const endPoint = `https://api.jikan.moe/v4/anime/${id}/full`;
  useEffect(() => {
    fetch(endPoint)
      .then((response) => {
        if(response.ok){
          return response.json()
        }else{
          
          setIsLoading(true)
        }
        return response.json()})
      .then((dataa) => {
        setAnime(dataa.data);
      });
  }, [id]);

  if(isLoading){
    <Loading/>
  }
  return (
    <div className="mt-auto lg:p-7">
      <div className="hidden md:block w-full h-[30vh] bg-gradient-to-b  bg-stone-950  "></div>
      <div className="p-10 rounded-lg top-48 md:absolute w-full z-0 ">
        <div className=" w-64">
          <img onClick={() => {
            console.log("dsfjsjfh")
          }}
            src={anime?.images.jpg.large_image_url}
            alt=""
            className="rounded-2xl shadow-md w-full h-full"
          />
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-center text-2xl">{anime?.title}</h3>
              <img src={anime?.images.jpg.large_image_url} alt={`Imagen de ${anime?.title}`} />
            </div>
          </dialog>
        </div>
      </div>
      <div className="px-5 md:p-10 md:mt-52 grid grid-cols-1 gap-3">
        <h3 className="font-semibold text-3xl md:text-5xl">
          {anime?.title}
        </h3>
        <div className="flex gap-3 items-center font-medium text-[13px]">
          <div className="flex gap-0.5 items-center justify-center">
            <Icon icon="tabler:clock" width="13" height="13" />
            <p>{anime?.duration}</p>
          </div>
          <div className="flex justify-center items-center gap-0.5">
            <Icon icon="tabler:device-tv" width="13" height="13" />
            <p>{anime?.type}</p>
          </div>
          <div className="inline-flex gap-0.5">
            Ep:
            <p>{anime?.episodes}</p>
          </div>
          <div className="flex items-center gap-x-1 justify-center">
          <Icon icon="solar:heart-outline" width="13" height="13" />
            <p>{anime?.favorites} </p>
          </div>
          <div className="flex items-center gap-0.5">
            <Icon icon="solar:ranking-linear" width="13" height="13" />
            <p>{anime?.rank}</p>
          </div>
          <div className="flex items-center gap-0.5">
            <Icon icon="solar:star-linear" width="13" height="13" />
            <p>{anime?.score}</p>
          </div>
        </div>
        <div>
          <div className=" flex flex-auto flex-col gap-1 mb-4">
            {/* <h3 className="font-semibold">Generos</h3> */}
            <ul className="flex gap-3">
              {anime?.genres.map((gen) => (
                <li className="badge" key={gen.mal_id}>
                  {gen.name}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn btn-wide font-bold"
            onClick={() => {
              handleCLickNavigate(anime?.mal_id, anime?.title);
            }}
          >
            {" "}
            <Icon icon="solar:play-line-duotone" width="20" height="20" />
            Play
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-2 md:divide-x divide-base-200 gap-5">
          <div className="border-gray-100 pr-6 ">
            <h3 className="font-semibold">Sypnosis</h3>
            <p className="font-light mt-2 text-pretty">{anime?.synopsis}</p>
            <button className="bradge ">{anime?.rank}</button>
          </div>
          <div className="flex flex-col  justify-center w-full h-full">
            <h3 className="font-medium text-xl text-center ">Trailer</h3>
            <div className="w-full h-full flex flex-col justify-center items-center mt">
              <embed
                title={anime?.title_japanese}
                className="rounded-xl w-full md:w-[80%] lg:w-[80%] h-[350px]"
                src={
                  anime?.trailer.embed_url === null || undefined || ""
                    ? "https://www.youtube.com/embed/U90cfBuZSJU?enablejsapi=1"
                    : anime?.trailer.embed_url
                }
                id="trailer"
              ></embed>
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
