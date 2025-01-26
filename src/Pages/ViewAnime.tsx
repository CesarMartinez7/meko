import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chapters } from "../Types/Chapter";
import { Historial } from "../Types/Historial";

// Aqui pasar la url de la imagen como prop para que despues pase como prop de la vista de anime y cuando se añada al carrito """XDDD""" En realidad es el historial ,, se pasa la en el objecto que entra todos los datos y pueda tener un link de anime para poder verlo con una imagen al fondo, asi arrarse las peticiones fetch por medio de id como hize anteriormente en mi otro proyecto.

interface PropsParams extends Record<string, string | undefined> {
  id: string;
  name: string;
  caps: string;
}

export default function ViewAnime() {
  // Use paramns siendo uso paramns xd
  const { id, name, caps } = useParams<PropsParams>();
  // La data que tiene como interface los Chapteres
  const [data, setData] = useState<Array<Chapters>>([]);
  // El array de localStorage en forma de estado para manejarlo mejor
  const [arrayLocalStorage] = useState<Historial[]>(
    JSON.parse(localStorage.getItem("viendo") || "[]")
  );
  // Funcion que va como predicado del filter
  const isHaveLocalStorage = (valor: Historial, id: number) => {
    return valor.id === id;
  };

  // Numericos id y capitulos o episodios

  const numericId = id ? parseInt(id, 10) : 0;
  const numericCaps = caps ? parseInt(caps, 10) : 0;

  const resultado = arrayLocalStorage?.find((item) =>
    isHaveLocalStorage(item, numericId)
  );
  const [chapter, setChapter] = useState<number>(
    resultado === undefined || null ? 1 : resultado.lastEpisodios
  );

  // Comprueba si es esta doblado o no , em realidad es ingles o Japones
  const [isDub, setIsDub] = useState(true);

  const handleClickToHistorial = () => {
    const datos: Historial = {
      name: name || "",
      id: numericId,
      fullEpisodios: numericCaps,
      lastEpisodios: chapter,
    };
    const datosAntiguo: Array<Historial> = JSON.parse(
      localStorage.getItem("viendo") || "[]"
    );

    const comprobacionExist = datosAntiguo?.find((item) =>
      isHaveLocalStorage(item, numericId)
    );

    if (comprobacionExist) {
      window.alert("Ya añadistes este anime anteriormente");
    } else {
      const datosNew = [...datosAntiguo, datos];
      localStorage.setItem("viendo", JSON.stringify(datosNew));
    }
  };

  useEffect(() => {
    const url = `https://api.jikan.moe/v4/anime/${numericId}/episodes`;
    fetch(url)
      .then((response) => response.json())
      .then((datae) => {
        setData(datae.data);
      })
      .catch((err) => console.log(err));
  }, [chapter, numericId]);
  return (
    <div className="md:h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-black w-full md:h-screen">
        <embed
          className="w-full h-[350px] md:h-screen"
          src={`https://vidsrc.cc/v2/embed/anime/ani${numericId}/${chapter}/${
            isDub ? "dub" : "sub"
          }`}
        ></embed>
      </div>
      <div className="p-5 lg:p-12 h-screen overflow-y-auto">
        <section className="text-center">
        <div className="flex gap-2 mb-4 justify-between">
            <div className="">
              <p className="text-left font-semibold">Idiomas</p>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    setIsDub(true);
                  }}
                >
                  Eng
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    setIsDub(false);
                  }}
                >
                  Jap
                </button>
              </div>
            </div>
            <div>
              <p className="font-semibold text-left">Servers</p>
              <div className="flex gap-2">
                <button className="btn btn-sm ">Vidlink</button>
                <button className="btn btn-sm ">Vidsrc</button>
              </div>
            </div>
          </div>
          <p className="text-[11px]">Estas viendo el episodio {chapter}</p>
          <h3 className="font-bold text-3xl"> {name}</h3>
          <p className="text-[13px] font-extralight"> </p>
          <p className="text-[13px]">{data[chapter]?.title}</p>
          <div className="flex mb-3 ">
            <button
              className="btn btn-sm  "
              onClick={handleClickToHistorial}
            >
              Añadir al historial
            </button>
          </div>
        </section>
        <ul className="grid grid-cols-5 lg:grid-cols-10 gap-2 ">
          {Array.from({ length: numericCaps }, (_, i) => (
            <li
              key={i}
              className="kbd cursor-pointer"
              onClick={() => {
                setChapter(i + 1);
              }}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
