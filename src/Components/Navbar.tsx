import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useRef } from "react";
import { QueryContext } from "../App";
import { Icon } from "@iconify/react/dist/iconify.js";


export default function Navbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const toSearchNavigate = useNavigate();
  const { setQuery, setTheme, theme } = useContext(QueryContext);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setQuery(inputRef?.current?.value || "Goku");
    toSearchNavigate("/search");
  };
  return (
    <div className="px-3 sticky top-1 z-40   ">
      <div className="navbar bg-base-100 rounded-lg shadow-2xl borded  ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl flex flex-row " href="/">
          <span>meko</span>
          <Icon icon="pixelarticons:coffee-alt" width="24" height="24" />
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Pluto, Monster, etc..."
                className="input input-sm input-bordered  placeholder-current "
              />
            </form>
          </div>
          <div>
            <label className="md:swap swap-rotate btn btn-ghost hidden ">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller "
                value={theme}
                onClick={() => {
                  setTheme(theme === "winter" ? "dark" : "winter");
                }}
              />

              {/* sun icon */}
              <svg
                className="swap-off h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle "
            >
              <Icon icon="tabler:user" width="24" height="24" />
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/historial"}>Historial</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
