import { useState, useEffect} from "react";

const obtenerCoverFilename = async (coverId) => {
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
  const [data, setData] = useState([]);
  const [covers, setCovers] = useState({});
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const FetchingSync = async () => {
    const url = `https://api.mangadex.org/manga?limit=24&title=${query}&includedTagsMode=AND&excludedTagsMode=OR&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=desc`
    try {
      const response = await fetch(url)
      const datae = await response.json();
      setData(datae.data);

      // Obtener los filenames de las portadas
      const coverPromises = datae.data.map(async (manga) => {
        const coverArt = manga.relationships.find((rel) => rel.type === "cover_art");
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
        }}
      >
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar manga..."
        />
      </form>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-8 p-5 gap-3">
          {data.map((item) => {
            const fileName = covers[item.id];
            return (
              <a href={`https://mangadex.org/title/${item.id}`} key={item.id}>
                <img
                  src={
                    fileName
                      ? `https://uploads.mangadex.org/covers/${item.id}/${fileName}.512.jpg`
                      : "https://via.placeholder.com/512" // Imagen alternativa si no hay portada
                  }
                  alt={item?.attributes?.title?.en || "Sin título"}
                  className="rounded-xl"
                />
                <h3>{item?.attributes?.title?.en || "Título desconocido"}</h3>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
