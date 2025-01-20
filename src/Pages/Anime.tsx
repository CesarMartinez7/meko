import { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Anime } from "../Types/Anime";
import { Character } from "../Types/Character";


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const SwapSl= () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};


interface CharactersProps {
  id: string | number | undefined;
}





const Characters = ({ id }: CharactersProps) => {
  const [charaters, setCharacters] = useState<Character[]>([]);
  const url = `https://api.jikan.moe/v4/anime/${id}/characters`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="mt-12">
      <h3 className="font-medium">Casting</h3>
      <ul className="overflow-hidden gap-2 flex w-full max-w-full" id="list">
        {charaters.map((character) => (
          
          <li className=" rounded-lg flex-shrink-0 h-48 bg-black">
            <img
              src={character.character.images.jpg.image_url}
              className="rounded-lg w-fit h-full object-cover"
              alt={`Imagen de ${character.character.name}`}
            />
          </li>
        ))}
      </ul>
      <div className="inline-flex">
      <button className="btn">Next</button>
      <button className="btn">Back</button>

      </div>
    </div>
  );
};





function Manga() {
  const handleCLickNavigate = (id: string | any) => {
    navigate(`/anime/${id}/play`);
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
        <h3 className="font-semibold text-7xl bg-gradient-to-br from-slate-900 to-zinc-500 bg-clip-text text-transparent">
          {anime?.title}
        </h3>
        <ul className="flex gap-3">
          {anime?.genres.map((gen) => (
            <li className="badge">{gen.name}</li>
          ))}
        </ul>

        <div>
          <button
            className="btn btn-wide my-2 "
            onClick={() => {
              handleCLickNavigate(anime?.mal_id);
            }}
          >
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
        <div className="grid md:grid-cols-2 xl:grid-cols-2 divide-x">
          <div className="border-gray-100 pr-6 ">
            <h3 className="font-medium">Sypnosis</h3>
            <p className="font-light mt-2 text-pretty">{anime?.synopsis}</p>
          </div>
          <div className="flex justify-center w-full h-full">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <h3 className="font-medium text-xl ">Trailer</h3>
              <iframe
                title={anime?.title_japanese}
                className="rounded-xl w-[60%] h-full"
                src={anime?.trailer.embed_url}
              ></iframe>
            </div>
          </div>
        </div>
        <div> <Characters id={id}></Characters>
            <Swap></Swap>
        </div>
      </div>
    </div>
  );
}

export default memo(Manga);
