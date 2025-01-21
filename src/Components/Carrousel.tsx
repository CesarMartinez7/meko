import { useState, useEffect } from "react";
import { Anime } from "../Types/Anime";

export default function Carrusel() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?type=movie")
      .then((response) => response.json())
      .then((datae) => setAnimes(datae.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen mt-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center">AnimePy</h1>
          <p className="text-center">Tu mejor opción para ver anime</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          {animes.map((anime) => (
            <div className="flex flex-col items-center justify-center">
              <img src={anime.images.jpg.large_image_url} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
