import { useState, useEffect} from "react";
import { Anime } from "../Types/Anime";

export default function Carrusel() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?type=movie")
      .then((response) => response.json())
      .then((datae) => setAnimes(datae.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen mt-4" id="carrusel">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center">AnimePy</h1>
          <p className="text-center">Tu mejor opción para ver anime</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          {animes.map((anime) => (
            <div className="flex flex-col relative items-center justify-center w-full flex-shrink-0 overflow-hidden">
              <img
                src={anime.images.jpg.large_image_url}
                alt=""
                className="w-full h-screen object-cover blur-sm"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent p-28 flex flex-col  justify-end  gap-4">
                <h2 className="text-white text-4xl font-bold">{anime.title}</h2>
                <p className="text-white">{anime.synopsis}</p>
                <div className="flex gap-4">
                  <button className="btn ">Ver Ahora</button>
                  <button className="btn">Añadir a favoritos</button>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t p-28 flex flex-row justify-between items-center">
                <button className="kbd">◀︎</button>
                <kbd
                  className="kbd"
                  onClick={() => {
                    const carrusel =
                      (document.getElementById("carrusel") as HTMLElement) ||
                      null;
                    if (index === animes.length) {
                        setIndex(0)
                        carrusel.style.transform = `translateX(-${index}00%)`;
                      window.alert("No hay más animes");
                    } else {
                      if (carrusel) {
                        setIndex(index + 1);
                        carrusel.scrollIntoView({ behavior: "smooth" });
                        carrusel.style.scrollBehavior = "smooth";
                        carrusel.style.transform = `translateX(-${index}00%)`;
                      }
                    }
                  }}
                >
                  ▶︎
                </kbd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
