import { useNavigate } from "react-router-dom";
import { Anime } from "../Types/Anime";


export default function HoverCard({item}) {
  const handleAnchor = (e) => {
    navigate(`/anime/${item?.mal_id}`);
  };
  const navigate = useNavigate();
  return (
    <a
      className="relative overflow-hidden shadow-lg group rounded-2xl p-0.5 z-10"
      onClick={handleAnchor}
    >
      <img
        src={item?.images?.jpg?.image_url
        }
        alt={item?.title}
        className="w-full h-full z-0 transition-transform duration-300 ease-in-out group-hover:scale-110 object-cover max-w-full max-h-full rounded-2xl"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-4 text-white">
          <h3 className="text-sm md:text-md font-semibold mb-2">
            {item?.title}
          </h3>
          <div className="flex justify-between">
            <p className="text-[10px]">
              <span>{item?.release_date}</span>
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}