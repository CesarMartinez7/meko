import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Historial } from "../Types/Historial";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function History() {
  const navigate = useNavigate();
  const [logHistorial] = useState<Array<Historial>>(
    JSON.parse(localStorage.getItem("viendo") || "[]")
  );

  const handleClickToDelete = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  };

  if (logHistorial.length === 0) {
    return (
      <div className="w-full h-svh text-center content-center">
        <h1 className="font-bold text-[2rem]">Tu array esta vacio "[]" XD</h1>
      </div>
    );
  }

  return (
    <main className="p-5 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">Estuviste viendo</h3>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-sm glass" onClick={handleClickToDelete}>
          <Icon icon="tabler:trash" width="20" height="20" /> Olvidar historial
        </button>
        <dialog id="my_modal_1" className="modal ">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              ⚠️ Esta acción no se puede deshacer. ¿Seguro que quieres eliminar
              tu historial?
            </h3>
            <p className="py-4">
              Si eliminas tu historial, perderás todos los animes que has
              guardado en tu lista. No podrás recuperar tu progreso ni los
              episodios que has marcado como vistos. ¡Asegúrate de estar
              completamente seguro antes de continuar!
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-error"
                  onClick={() => {
                    localStorage.setItem("viendo","[]");
                    location.reload();
                  }}
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 ">
        {logHistorial.map((anime, index) => (
          <li
            key={index}
            title={`Ver ahora ${anime.name} Episodio ${anime.lastEpisodios}`}
            className="p-3 bg-base-300 rounded-t-xl cursor-pointer"
            onClick={() => {
              navigate(
                `/anime/${anime.id}/${anime.name}/${anime.fullEpisodios}/play`
              );
            }}
          >
            <h3 className="font-semibold">{anime.name}</h3>
            <div className="text-[12px]">
              <p>Identifacion: {anime.id}</p>
              <h3>Ultimo episodio visto: {anime.lastEpisodios}</h3>
              <h3>Episodios totales: {anime.fullEpisodios}</h3>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
