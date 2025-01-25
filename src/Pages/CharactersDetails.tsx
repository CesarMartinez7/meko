import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Character {
  mal_id: string;
  url: string ;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url?: string;
      small_image_url?: string;
    };
  };
  name: string;
  name_kanji: string;
  nicknames: [];
  favorites: number;
  about: string;
}

export default function CharactersDetails() {
  const [data, setData] = useState<Character | null>(null);
  const { id } = useParams();
  const endPoint = `https://api.jikan.moe/v4/characters/${id}`;

  useEffect(() => {
    const getCharactersById = async () => {
      const response = await fetch(endPoint);
      if (!response.ok) {
        throw "Error al traer personaje por el ID";
      }
      const data = await response.json();
      console.log(data.data);
      setData(data.data);
    };
    getCharactersById();
  }, []);

  return (
    <div className="p-14 grid grid-cols-1 gap-5 place-items-center">
      <main className="w-[700px] flex-1 flex-col gap-2">
        <h3 className="font-semibold text-4xl">{data?.name}</h3>
        <div className="text-[12px] flex gap-3">
          <p>Favorites: {data?.favorites}</p>
          <p className="text-[13px]">{data?.name_kanji}</p>
        </div>
        <p className="font-bold">About</p>
        <p>{data?.about}</p>
        <a className="link" href={data?.url}>Mas info aqui</a>
      </main>
    </div>
  );

}
