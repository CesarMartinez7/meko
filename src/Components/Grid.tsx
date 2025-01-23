import { Anime } from "../Types/Anime";
import { useState, useEffect, useContext } from "react";
import { QueryContext } from "../App";
import HoverCard from "./HoverCard";
import Loading from "./Loding";

interface GridProps {
  url: string;
  text: string;
}

function Grid({ url, text = "Tus resultados" }: GridProps) {
  const { query, setQuery } = useContext(QueryContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<Anime>>([]);
  const url2 = `https://api.jikan.moe/v4/anime?q=${query}`;
  useEffect(() => {
    fetch(url.length === 0 ? url2 : url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setLoading(true);
        }
      })
      .then((datae) => {
        setData(datae.data);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, [query, setQuery]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 md:p-12 rounded-2xl ">
      <h3 className="font-bold mb-2">{text}</h3>
      <section className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-10  gap-4 ">
        {data &&
          data.map((item) => (
            <HoverCard item={item} key={item.mal_id}></HoverCard>
          ))}
      </section>
    </div>
  );
}

export default Grid;
