import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">🎬 MovieApp</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Početna</Link>
        <Link to="/login" className="hover:underline">Prijava</Link>
      </div>
    </nav>
  );
}
