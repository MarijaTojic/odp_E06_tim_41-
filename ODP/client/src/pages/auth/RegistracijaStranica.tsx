import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

export default function RegistracijaStranica() {
  const [username, setUsername] = useState("");
  const [uloga, setUloga] = useState<"user" | "admin">("user");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    register({ username, uloga });
    navigate("/catalog");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600">
      <form
        onSubmit={handleRegister}
        className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Registracija</h1>

        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <select
          value={uloga}
          onChange={(e) => setUloga(e.target.value as "user" | "admin")}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="user">Korisnik</option>
          <option value="admin">Administrator</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
        >
          Registruj se
        </button>
      </form>
    </div>
  );
}
