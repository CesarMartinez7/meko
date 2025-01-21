import { useState, useEffect } from "react";
import { Anime } from "../Types/Anime";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loading from "./Loding";

export default function Carrusel() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [index, setIndex] = useState(0);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?type=movie")
      .then((response) => response.json())
      .then((data) => {
        setAnimes(data.data)
        setLoading(false)
      } )
      .catch((err) => console.log(err));
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % animes.length);
  };

  const handlePrev = () => {
    const carrusel = document.getElementById("carrusel") as HTMLElement | null;
    if(carrusel){
      carrusel.scrollIntoView({ behavior: "smooth" });
    }
    setIndex((prevIndex) => (prevIndex - 1 + animes.length) % animes.length);
  };

  if(loading) return <Loading/>

  return (
    <div className="h-screen mt-4 w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center overflow-hidden w-full" id="carrusel">
          {animes && animes.map((anime, i) => (
            <div
              className={`flex flex-col relative items-center justify-center w-full flex-shrink-0 ${i === index ? 'block' : 'hidden'}`}
              key={anime.mal_id}
            >
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full h-screen object-cover blur-sm"
              />
              <div className="absolute p-5 inset-0 bg-gradient-to-t from-black/100 to-transparent xl:p-28 flex flex-col justify-end gap-4">
                <h2 className="text-white text-4xl font-bold">{anime.title}</h2>
                <p className="text-white">{anime.synopsis}</p>
                <div className="flex gap-4">
                  <button type="button" className="btn">Ver Ahora</button>
                  <button type="button" className="btn">Añadir a favoritos</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t p-28 flex flex-row justify-between items-center">
          <button type="button" className="btn btn-circle" onClick={handlePrev}><Icon icon="solar:alt-arrow-left-linear" width="24" height="24" /></button>
          <button type="button" className="btn btn-circle" onClick={handleNext}><Icon icon="solar:alt-arrow-right-line-duotone" width="24" height="24" /></button>
        </div>
      </div>
    </div>
  );
}
