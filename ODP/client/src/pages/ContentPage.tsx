import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export interface Content {
  id: number;
  title: string;
  genre: string;
  type: string;
  prosecnaOcena: number;
  imageURL: string;
}

const mockContent: Content[] = [
  { id: 1, title: "Inception", genre: "Sci-Fi", type: "Film", prosecnaOcena: 4.8, imageURL: "https://via.placeholder.com/300x400?text=Inception" },
  { id: 2, title: "Breaking Bad", genre: "Drama", type: "Serija", prosecnaOcena: 4.9, imageURL: "https://via.placeholder.com/300x400?text=Breaking+Bad" },
  { id: 3, title: "The Witcher", genre: "Fantasy", type: "Serija", prosecnaOcena: 4.5, imageURL: "https://via.placeholder.com/300x400?text=The+Witcher" },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", type: "Film", prosecnaOcena: 4.7, imageURL: "https://via.placeholder.com/300x400?text=Interstellar" },
  { id: 5, title: "Stranger Things", genre: "Horror/Drama", type: "Serija", prosecnaOcena: 4.6, imageURL: "https://via.placeholder.com/300x400?text=Stranger+Things" },
  { id: 6, title: "The Dark Knight", genre: "Action", type: "Film", prosecnaOcena: 4.9, imageURL: "https://via.placeholder.com/300x400?text=Dark+Knight" },
  { id: 7, title: "Friends", genre: "Comedy", type: "Serija", prosecnaOcena: 4.4, imageURL: "https://via.placeholder.com/300x400?text=Friends" },
  { id: 8, title: "Avatar", genre: "Sci-Fi", type: "Film", prosecnaOcena: 4.3, imageURL: "https://via.placeholder.com/300x400?text=Avatar" },
];

export default function CatalogPage() {
  const { user} = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "film" | "serija">("all");
  const [sort, setSort] = useState<"title-asc" | "title-desc" | "rating-asc" | "rating-desc">("title-asc");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Content | null>(null);
  const [rating, setRating] = useState(1);
  const [newContent, setNewContent] = useState<Partial<Content>>({});

  useEffect(() => {
    setTimeout(() => {
      setItems(mockContent);
      setLoading(false);
    }, 500);
  }, []);

  const handleLogout = () => {
    navigate("/register");
  };

  const filteredItems = items
    .filter((item) => filter === "all" || item.type.toLowerCase() === filter)
    .sort((a, b) => {
      if (sort.startsWith("title")) {
        return sort === "title-asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else {
        return sort === "rating-asc" ? a.prosecnaOcena - b.prosecnaOcena : b.prosecnaOcena - a.prosecnaOcena;
      }
    });

  const openModal = (item?: Content) => {
    setModalContent(item || null);
    setRating(1);
    setNewContent(item ? { ...item } : {});
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const submitRating = () => {
    if (modalContent) {
      const updated = items.map((i) =>
        i.id === modalContent.id ? { ...i, prosecnaOcena: rating } : i
      );
      setItems(updated);
    }
    closeModal();
  };

  const submitNewContent = () => {
    if (newContent.title && newContent.genre && newContent.type && newContent.imageURL) {
      if (modalContent) {
        setItems(items.map(i => i.id === modalContent.id ? {...i, ...newContent} as Content : i));
      } else {
        const nextId = Math.max(...items.map(i => i.id)) + 1;
        setItems([...items, { ...newContent, id: nextId, prosecnaOcena: 0 } as Content]);
      }
      closeModal();
    } else {
      alert("Popunite sva polja");
    }
  };

  if (loading) return <div className="p-10 text-center text-xl font-medium">Učitavanje...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-orange-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-4 sm:mb-0">🎬 KATALOG</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-purple-700">Uloga: {user?.uloga}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            Odjavi se
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "film" | "serija")}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
        >
          <option value="all">Sve kategorije</option>
          <option value="film">Film</option>
          <option value="serija">Serija</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
        >
          <option value="title-asc">Naziv A-Z</option>
          <option value="title-desc">Naziv Z-A</option>
          <option value="rating-asc">Ocena rastuće</option>
          <option value="rating-desc">Ocena opadajuće</option>
        </select>

        {user?.uloga === "admin" && (
          <button
            onClick={() => openModal()}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            Dodaj novi sadržaj
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
            <img src={item.imageURL} alt={item.title} className="w-full h-64 object-cover" />
            <div className="p-4 bg-gradient-to-t from-white/80 via-white/60 to-white/40">
              <h2 className="text-xl font-bold text-purple-800 mb-1">{item.title}</h2>
              <p className="text-gray-500 mb-2">{item.genre} | {item.type}</p>
              <p className="text-yellow-600 font-semibold mb-3">Ocena: {item.prosecnaOcena.toFixed(1)}</p>

              {user?.uloga === "user" && (
                <button
                  onClick={() => openModal(item)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition transform hover:scale-105"
                >
                  Ocenite
                </button>
              )}

              {user?.uloga === "admin" && (
                <button
                  onClick={() => openModal(item)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl transition transform hover:scale-105"
                >
                  Uredi
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal ovde ostaje isto, sa rating ili dodavanje sadržaja */}
      {/* Modal */}
{modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-11/12 max-w-lg relative animate-fadeIn">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold transition"
      >
        &times;
      </button>

      {modalContent && user?.uloga === "user" ? (
        <>
          <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            Ocenite: {modalContent.title}
          </h2>
          <input
            type="number"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-4 py-2 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-center text-lg font-semibold"
          />
          <button
            onClick={submitRating}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition transform font-bold"
          >
            Pošalji ocenu
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
            {modalContent ? "Uredi sadržaj" : "Dodaj novi sadržaj"}
          </h2>
          <input
            type="text"
            placeholder="Naziv"
            value={newContent.title || ""}
            onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Žanr"
            value={newContent.genre || ""}
            onChange={(e) => setNewContent({ ...newContent, genre: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Tip (Film/Serija)"
            value={newContent.type || ""}
            onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="URL slike"
            value={newContent.imageURL || ""}
            onChange={(e) => setNewContent({ ...newContent, imageURL: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition font-semibold"
            >
              Otkaži
            </button>
            <button
              onClick={submitNewContent}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 via-lime-400 to-green-600 text-white font-bold hover:scale-105 transition transform"
            >
              Sačuvaj
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}

    </div>
  );
}
