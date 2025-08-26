import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth/AuthContext";

interface Episode {
  season: number;
  episode: number;
  title: string;
}

interface Content {
  id: number;
  title: string;
  genre: string;
  type: string;
  category: "film" | "serija";
  prosecnaOcena: number;
  imageURL: string;
  description?: string;
  episodes?: Episode[];
}

export default function CatalogPage() {
  const { user } = useAuth();

  // Glavni podaci
  const [items, setItems] = useState<Content[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<"film" | "serija" | "all">("all");
  const [sortField, setSortField] = useState<"title" | "prosecnaOcena">("title");
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal za admin dodavanje sadržaja
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState<Partial<Content>>({
    title: "",
    genre: "",
    type: "Film",
    category: "film",
    imageURL: "",
    description: "",
    episodes: [],
  });

  const [newEpisode, setNewEpisode] = useState<Partial<Episode>>({ season: 1, episode: 1, title: "" });

  // Fetch sadržaja (simulacija)
  useEffect(() => {
    const fetchContent = async () => {
      const data: Content[] = [
        {
          id: 1,
          title: "Inception",
          genre: "Sci-Fi",
          type: "Film",
          category: "film",
          prosecnaOcena: 4.8,
          imageURL: "https://via.placeholder.com/200x300?text=Inception",
        },
        {
          id: 2,
          title: "Breaking Bad",
          genre: "Drama",
          type: "Serija",
          category: "serija",
          prosecnaOcena: 4.9,
          imageURL: "https://via.placeholder.com/200x300?text=Breaking+Bad",
          episodes: [
            { season: 1, episode: 1, title: "Pilot" },
            { season: 1, episode: 2, title: "Cat's in the Bag..." },
          ],
        },
      ];
      setItems(data);
    };
    fetchContent();
  }, []);

  if (!user) return <p>Učitavanje korisnika...</p>;

  // Filtriranje i sortiranje
  const filteredItems = items
    .filter((c) => categoryFilter === "all" || c.category === categoryFilter)
    .filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortField === "title") return sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      else return sortAsc ? a.prosecnaOcena - b.prosecnaOcena : b.prosecnaOcena - a.prosecnaOcena;
    });

  // Ocenjivanje sadržaja (user)
  const rateContent = (id: number, rating: number) => {
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, prosecnaOcena: rating } : c))
    );
  };

  // Dodavanje nove epizode u modal
  const addEpisode = () => {
    if (!newEpisode.title) return;
    setNewContent({
      ...newContent,
      episodes: [...(newContent.episodes || []), newEpisode as Episode],
    });
    setNewEpisode({ season: 1, episode: (newEpisode.episode || 0) + 1, title: "" });
  };

  // Dodavanje sadržaja (admin)
  const addContent = () => {
    if (!newContent.title || !newContent.genre || !newContent.imageURL) return;
    setItems([...items, { ...newContent, id: Date.now(), type: newContent.type!, prosecnaOcena: 0 } as Content]);
    setNewContent({ title: "", genre: "", type: "Film", category: "film", imageURL: "", description: "", episodes: [] });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Katalog</h1>
      <p className="text-center mb-6">Dobrodošli, <span className="font-semibold">{user.username}</span>! Uloga: <span className="font-semibold">{user.uloga}</span></p>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Pretraga..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as any)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Sve</option>
          <option value="film">Film</option>
          <option value="serija">Serija</option>
        </select>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as any)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="title">Naziv</option>
          <option value="prosecnaOcena">Prosečna ocena</option>
        </select>

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {sortAsc ? "Rastuće" : "Opadajuće"}
        </button>

        {user.uloga === "admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 border rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            Dodaj sadržaj
          </button>
        )}
      </div>

      {/* Kartice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={c.imageURL} alt={c.title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-1">{c.title}</h2>
              <p className="text-gray-600 mb-1">{c.genre}</p>
              <p className="font-medium mb-2">Ocena: {c.prosecnaOcena}</p>

              {user.uloga === "user" && (
                <div className="flex flex-wrap gap-1">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button
                      key={n}
                      onClick={() => rateContent(c.id, n)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}

              {c.episodes && c.episodes.length > 0 && (
                <div className="mt-2">
                  <h3 className="font-semibold mb-1">Epizode:</h3>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {c.episodes.map((ep, idx) => (
                      <li key={idx}>S{ep.season}E{ep.episode}: {ep.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal za admin */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Dodaj novi sadržaj</h2>

            <input
              type="text"
              placeholder="Naziv"
              className="w-full mb-2 px-3 py-2 border rounded"
              value={newContent.title}
              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Žanr"
              className="w-full mb-2 px-3 py-2 border rounded"
              value={newContent.genre}
              onChange={(e) => setNewContent({ ...newContent, genre: e.target.value })}
            />
            <select
              value={newContent.category}
              onChange={(e) => setNewContent({ ...newContent, category: e.target.value as "film" | "serija" })}
              className="w-full mb-2 px-3 py-2 border rounded"
            >
              <option value="film">Film</option>
              <option value="serija">Serija</option>
            </select>
            <input
              type="text"
              placeholder="URL slike"
              className="w-full mb-2 px-3 py-2 border rounded"
              value={newContent.imageURL}
              onChange={(e) => setNewContent({ ...newContent, imageURL: e.target.value })}
            />
            <textarea
              placeholder="Opis"
              className="w-full mb-2 px-3 py-2 border rounded"
              value={newContent.description}
              onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
            />

            {/* Dodavanje epizoda za serije */}
            {newContent.category === "serija" && (
              <div className="mb-2">
                <h3 className="font-semibold mb-1">Dodaj epizodu</h3>
                <input
                  type="number"
                  placeholder="Sezona"
                  className="w-1/3 mb-1 px-2 py-1 border rounded"
                  value={newEpisode.season}
                  onChange={(e) => setNewEpisode({ ...newEpisode, season: Number(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Epizoda"
                  className="w-1/3 mb-1 px-2 py-1 border rounded mx-1"
                  value={newEpisode.episode}
                  onChange={(e) => setNewEpisode({ ...newEpisode, episode: Number(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="Naziv epizode"
                  className="w-1/3 mb-1 px-2 py-1 border rounded"
                  value={newEpisode.title}
                  onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
                />
                <button
                  onClick={addEpisode}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition mt-1"
                >
                  Dodaj epizodu
                </button>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Otkaži
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={addContent}
              >
                Dodaj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
