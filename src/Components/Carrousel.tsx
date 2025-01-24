import { useState, useEffect, memo} from "react";
import { Anime } from "../Types/Anime";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loading from "./Loding";

function Carrusel() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);  
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?type=movie");
        
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
  
        const data = await response.json();
        setAnimes(data.data);
      } catch (err) {
        console.error("Error al obtener los animes:", err);
      } finally {
        setLoading(false);  // Asegura que el loading se desactive siempre
      }
    };
  
    fetchAnimes();
  }, []);
  




  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % animes.length);
  };

  const handlePrev = () => {
    const carrusel = document.getElementById("carrusel") as HTMLElement | null;
    if (carrusel) {
      carrusel.scrollIntoView({ behavior: "smooth" });
    }
    setIndex((prevIndex) => (prevIndex - 1 + animes.length) % animes.length);
  };

  if (loading) return <Loading />;

  return (
    <div className="h-screen mt-4 w-full rounded-b-xl overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <div
          className="flex flex-row items-center justify-center overflow-hidden w-full "
          id="carrusel"
        >
          {animes &&
            animes.map((anime, i) => (
              <div
                className={`flex flex-col relative items-center justify-center w-full flex-shrink-0  ${
                  i === index ? "block" : "hidden"
                }`}
                key={anime.mal_id}
              >
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-full h-screen object-cover blur-sm"
                />
                <div className="absolute p-6  md:p-12 inset-0 bg-gradient-to-t from-black/100 to-transparent xl:p-20 flex flex-col justify-end gap-4">
                  <h2 className=" text-4xl font-medium">
                    {anime.title}
                  </h2>
                  <p className="font-light">{anime.background}</p>
                  <div className="inline-flex gap-3 font-light text-[13px]">
                    <p>{anime.duration}</p>
                    
                    <div className="flex gap-1 items-center justify-center"><span><Icon icon="solar:star-linear" width="13" height="13" /></span>{anime.score}</div>
                    <p className="">{new Date().getFullYear()}</p>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" className="btn">
                    <Icon icon="solar:play-linear" width="16" height="16" />
                      Ver Ahora
                    </button>
                    <button type="button" className="btn">
                    <Icon icon="solar:heart-linear" width="16" height="16" />
                      Añadir a favoritos
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t p-3 xl:p-28 flex flex-row justify-between items-center">
          <button type="button" className="btn btn-circle" onClick={handlePrev}>
            <Icon icon="solar:alt-arrow-left-linear" width="24" height="24" />
          </button>
          <button type="button" className="btn btn-circle" onClick={handleNext}>
            <Icon
              icon="solar:alt-arrow-right-line-duotone"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>
    </div>
  );
}


export default memo(Carrusel)