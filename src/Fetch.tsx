import { useState, useEffect, useRef} from "react";

interface Cover {
  [key: string] : string
}


interface Tags {
  id:string;
  type: string;
  attributes: {
    name:{
      en: string
    };
    description: {};
    group: string;
    version: number
  }
  relationships:[]
}

interface Data {
  id: string;
  type: string; 
  attributes: {
    title: {
      en: string;
    };
    altTitles: Array<{[key:string]: string }>;
    description:{
      [key: string] : string;
    };
    isLocked: boolean;
    links: {
      [key:string] : string
    };
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: null | undefined | string;
    status: string;
    year: number;
    contentRating:string;
    tags: Array<Tags>
    state: string;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string

  };
  relationships: Array<{ id: string; type: string }>; // Definir mejor el tipo de relationships si es necesario
}



const obtenerCoverFilename = async (coverId: string) => {
  try {
    const response = await fetch(`https://api.mangadex.org/cover/${coverId}`);
    const data = await response.json();
    return data.data.attributes.fileName; // Extraemos el filename
  } catch (error) {
    console.error("Error obteniendo el cover filename:", error);
    return null;
  }
};

export default function Main() {
  const [data, setData] = useState<Data[]>([]);
  const [covers, setCovers] = useState<Cover>({});
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null)

  const FetchingSync = async () => {
    const url = `https://api.mangadex.org/manga?limit=24&title=${query}&includedTagsMode=AND&excludedTagsMode=OR&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=desc`;
    try {
      const response = await fetch(url);
      const datae = await response.json();
      setData(datae.data);

      // Obtener los filenames de las portadas
      const coverPromises = datae.data.map(async (manga: Data) => {
        const coverArt = manga.relationships.find(
          (rel) => rel.type === "cover_art"
        );
        if (coverArt) {
          const fileName = await obtenerCoverFilename(coverArt.id);
          return { mangaId: manga.id, fileName };
        }
        return { mangaId: manga.id, fileName: null };
      });

      const resolvedCovers = await Promise.all(coverPromises);
      const coverMap = resolvedCovers.reduce((acc, item) => {
        acc[item.mangaId] = item.fileName;
        return acc;
      }, {});
      setCovers(coverMap);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    FetchingSync();
  }, [query]);

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          if(inputRef.current){
            const queryBusqueda: string = inputRef.current.value || "Dragon ball"
            setQuery(queryBusqueda);
          }
        }}
      >
        <div className="input-group max-w-sm">
          <input
            className="input"
            placeholder="Dragon ball, Billy bat, Monster ..."
            ref={inputRef}
          />
          <select
            className="select input-group-text w-1/3 max-sm:w-3/5"
            aria-label="select"
          >
            <option disabled selected>
              Filter
            </option>
            <option>Sci-fi</option>
            <option>Drama</option>
            <option>Action</option>
          </select>
        </div>
      </form>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-10 lg:grid-cols-7 p-5 gap-3">
          {data.map((item: Data)  => {
            console.log(item.attributes.title.en)
            const fileName = covers[item.id];
            return (
              <a href={`manga/${item.id}`} key={item.id}>
                <img
                  src={
                    fileName
                      ? `https://uploads.mangadex.org/covers/${item.id}/${fileName}.512.jpg`
                      : "https://via.placeholder.com/512" // Imagen alternativa si no hay portada
                  }
                  alt={item.attributes.title?.en || "Sin título"}
                  className="rounded-xl aspect-auto"
                />
                <h3>{item.attributes.title.en || "Título desconocido"}</h3>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
