import { useNavigate } from "react-router-dom";
import { Anime } from "../Types/Anime";
import { Icon } from "@iconify/react/dist/iconify.js";


interface HoverCardProps {
  item: Anime
}


export default function HoverCard({item}: HoverCardProps) {
  const navigate = useNavigate();
  
  const handleAnchor = () => {
    navigate(`/anime/${item?.mal_id}`);
  };
  return (
    <a
      className="relative overflow-hidden shadow-sm group rounded-2xl z-10 text-white"
      onClick={handleAnchor}
    >
      <img
        src={item?.images?.jpg?.image_url
        }
        alt={item?.title}
        className="w-full h-full z-0 transition-transform duration-300 ease-in-out group-hover:scale-110 object-cover max-w-full max-h-full rounded-2xl"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-4 ">
          <h3 className="text-sm md:text-md font-semibold mb-2">
            {item?.title}
          </h3>
          <div className="flex justify-between">
            <div className="text-[10px] inline-flex items-center gap-1 justify-center">
            <Icon icon="solar:clock-circle-outline" width="12" height="12" />
              <span>{item.duration}</span>
            </div>
            <div className="text-[10px] inline-flex items-center gap-1 justify-center">
            <Icon icon="solar:star-linear" width="12" height="12" color="yellow" />
              <span>{item.score}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}