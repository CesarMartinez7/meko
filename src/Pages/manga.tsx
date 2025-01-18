import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Tag {
  id: string;
  type: string;
  attributes: {
    name: {
      en: string;
    };
    description: {};
    group: string;
    version: number;
  };
  relationships: [];
}

interface Manga {
  result: string;
  response: string;
  data: {
    id: string;
    type: string;
    attributes: {
      title: {
        en: string;
      };
      altTitles: Array<{ [key: string]: string }>;
      description: {
        [key: string]: string;
      };
      isLocked: boolean;
      links: {
        [key: string]: string;
      };
      originalLanguage: string;
      lastVolume: string;
      lastChapter: string;
      publicationDemographic: string;
      status: string;
      year: number;
      contentRating: string;
      tags: Tag[];
      state: string;
      chapterNumbersResetOnNewVolume: boolean;
      createdAt: string;
      updatedAt: string;
      version: number;
      availableTranslatedLanguages: string[];
      latestUploadedChapter: string;
    };
    relationships: Array<{
      id: string;
      type: string;
    }>;
  };
}

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <ul className="flex gap-2">
      {tags.map((tag) => (
        <li key={tag.id} className="btn btn-soft btn-primary btn-sm">
          {tag.attributes.name.en}
        </li>
      ))}
    </ul>
  );
};

export default function Manga() {
  const { id } = useParams();
  const [manga, setManga] = useState<Manga | null>(null);
  const endPoint = `https://api.mangadex.org/manga/${id}`;
  useEffect(() => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((dataa) => setManga(dataa));
  }, [id]);
  return (
    <div className="p-5">
      <div className="grid mt-13">
        <h3 className="font-bold text-5xl">
          {manga?.data?.attributes?.title?.en}
        </h3>
        <Tags tags={manga?.data?.attributes?.tags || []}></Tags>
      </div>
      <p className="font-light">{manga?.data?.attributes?.description?.en}</p>
      <h3 className="font-bold text-5xl">
        {manga?.data.attributes.originalLanguage.toUpperCase()}
      </h3>
      <h3 className="font-bold text-5xl">
        {manga?.data?.attributes?.lastChapter}
      </h3>
      <h3 className="font-bold text-5xl">{manga?.data?.attributes?.year}</h3>
      <h3 className="font-bold text-5xl">
        {manga?.data?.attributes?.originalLanguage}
      </h3>
      <button className="btn btn-primary">Leer</button>
    </div>
  );
}
