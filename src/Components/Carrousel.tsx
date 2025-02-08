import { useState, useEffect, memo} from "react";
import { Anime } from "../Types/Anime";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loading from "./Loding";
import { useNavigate } from "react-router-dom";

 function Carrusel() {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?sfw")

        if (!response.ok) {
          throw new Error("Error en la petición")
        }

        const data = await response.json()
        setAnimes(data.data)
      } catch (err) {
        console.error("Error al obtener los animes:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimes()
  }, [])

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % animes.length)
  }

  const handlePrev = () => {
    const carrusel = document.getElementById("carrusel")
    if (carrusel) {
      carrusel.scrollIntoView({ behavior: "smooth" })
    }
    setIndex((prevIndex) => (prevIndex - 1 + animes.length) % animes.length)
  }

  if (loading) return <Loading />

  return (
    <div className="h-[57vh] w-full rounded-b-xl overflow-hidden relative">
      <div className="h-full w-full">
        <div className="h-full w-full relative" id="carrusel">
          {animes.map((anime, i) => (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              key={anime.mal_id}
            >
              <img
                src={anime.images.jpg.large_image_url || "/placeholder.svg"}
                alt={anime.title}
                className="w-full h-full object-cover blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 sm:mb-3">{anime.title}</h2>
                <p className="font-light text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                  {anime.background}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 font-light text-xs sm:text-sm mb-3 sm:mb-4">
                  <p>{anime.duration}</p>
                  <div className="flex items-center">
                    <Icon icon="solar:star-linear" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {anime.score}
                  </div>
                  <p>{new Date().getFullYear()}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <button
                    type="button"
                    className="btn btn-sm sm:btn-md"
                    onClick={() => navigate(`/anime/${anime.mal_id}/${anime.title}/${anime.episodes}/play`)}
                  >
                    <Icon icon="solar:play-linear" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Ver Ahora
                  </button>
                  <button type="button" className="btn btn-sm sm:btn-md">
                    <Icon icon="solar:heart-linear" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Añadir a favoritos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
          <button type="button" className="btn btn-circle btn-sm sm:btn-md" onClick={handlePrev}>
            <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          <button type="button" className="btn btn-circle btn-sm sm:btn-md" onClick={handleNext}>
            <Icon icon="solar:alt-arrow-right-line-duotone" className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}


export default memo(Carrusel)