export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 mt-auto left-0 bottom-0 relative">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - animepy
        </p>
      </aside>
    </footer>
  );
}
