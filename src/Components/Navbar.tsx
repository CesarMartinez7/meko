import { useNavigate } from "react-router-dom";
import { useContext,useRef } from "react";
import { QueryContext } from "../App";

export default function Navbar() {
    const inputRef = useRef <HTMLInputElement>(null)
    const toSearchNavigate = useNavigate()
    const {setQuery} = useContext(QueryContext)
    const handleSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault()
        setQuery(inputRef?.current?.value || "")
        toSearchNavigate("/search")
    }
  return (
    <div className="navbar bg-base-100 glassMorf sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl bg-gradient-to-br from-slate-900 to-zinc-500 bg-clip-text text-transparent">animePyu</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
            <form onSubmit={handleSubmit}>
          <input
          ref={inputRef}
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />

            </form>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
