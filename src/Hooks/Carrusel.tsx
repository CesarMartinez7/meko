import { useState, useEffect} from "react";
import { Anime } from "../Types/Anime";

interface ApiResponse {
  data: Anime[];
}

export default function CarruselHook() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?type=movie")
      .then((response) => response.json())
      .then((datae: ApiResponse) => setAnimes(datae.data))
      .catch((err) => console.log(err));
  }, []);

  return [index, setIndex, animes, setAnimes];
}
