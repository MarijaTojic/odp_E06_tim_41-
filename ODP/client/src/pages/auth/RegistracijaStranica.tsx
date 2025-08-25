import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface RegistracijaProps {
  authApi: IAuthAPIService;
}

export default function RegistracijaStranica({ authApi }: RegistracijaProps) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Osnovna validacija
    if (!username || !password) {
      setError("Popunite sva obavezna polja");
      return;
    }

    if (password !== confirmPassword) {
      setError("Lozinke se ne poklapaju");
      return;
    }

    try {
      const response = await authApi.registracija(username, password, role);

            if (response.success && response.data) {
      
        login(response.data);
        navigate(`/${response.data.uloga}-dashboard`);
      } else {
        setError(response.message || "Greška prilikom registracije");
      }
    } catch (err) {
      console.error(err);
      setError("Greška prilikom registracije");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-md border border-blue-400">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Registracija</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Potvrdi lozinku"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "admin")}
            className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="user">Korisnik</option>
            <option value="admin">Administrator</option>
          </select>

          {error && <p className="text-red-700 text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-700/70 hover:bg-blue-700/90 text-white py-2 rounded-xl transition"
          >
            Registruj se
          </button>
        </form>
      </div>
    </main>
  );
}
