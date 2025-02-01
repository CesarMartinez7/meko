import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer footer-center mt-40 bg-base-200 text-base-content rounded p-10  left-0 bottom-0 relative">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - meko - Desarrollado por Martinez Cesar.</p>
        <div className="mt-3">
          <Link to={"https://github.com/CesarMartinez7"}>
            <Icon icon="tabler:brand-github" width="34" height="34" />
          </Link>
        </div>
      </aside>
    </footer>
  );
}
