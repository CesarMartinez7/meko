import { Anime } from "../Types/Anime";
import { useState, useEffect, useContext,memo,useCallback} from "react";
import { QueryContext } from "../App";
import HoverCard from "./HoverCard";
import Loading from "./Loding";
import LogoPage from "../assets/cubo.png";

interface GridProps {
  url: string;
  text?: string;
}

function Grid({ url, text = "Tus resultados" }: GridProps) {
  const { query } = useContext(QueryContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Construcción de URL dinámica
  const searchUrl = url.length === 0 ? `https://api.jikan.moe/v4/anime?q=${query}` : url;

  const memoizedFetch = useCallback(async () => {

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError("Hubo un problema al cargar los datos. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }

  },[query, searchUrl]);
  
  useEffect(() => {
    memoizedFetch();
  }, [memoizedFetch]); // Dependencia única para evitar llamadas innecesarias

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (data.length === 0) return <div className="w-full h-screen grid place-content-center">
    <img src={LogoPage} alt="" />
    <p className="font-semibold text-2xl text-center">No se encontraron resultados</p>
  </div>;

  return (
    <div className="p-4 md:p-12 rounded-2xl">
      <h3 className="font-bold mb-2">{text}</h3>
      <section className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-10 gap-4">
        {data.map((item) => (
          <HoverCard item={item} key={item.mal_id} />
        ))}
      </section>
    </div>
  );
}

export default memo(Grid)
