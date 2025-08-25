import { useEffect, useState } from "react";
import type { Content } from "../../models/content/Content";
import type { Episode } from "../../models/content/Episode";
import { api } from "../../api_services/content/api";

interface AdminFormState {
  title: string;
  description: string;
  coverURL: string;
  genre: string;
  trivia: string;
  type: "Film" | "Serija";
  episodes: Episode[];
}

export default function AdminCatalogPage() {
  const [form, setForm] = useState<AdminFormState>({
    title: "",
    description: "",
    coverURL: "",
    genre: "",
    trivia: "",
    type: "Film",
    episodes: [],
  });

  const [catalog, setCatalog] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const data = await api.fetchContent();
        setCatalog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCatalog();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addEpisode = () => {
    setForm((prev) => ({
      ...prev,
      episodes: [...prev.episodes, { season: 1, episode: 1, title: "", description: "", coverURL: "" }],
    }));
  };

  const handleEpisodeChange = (index: number, field: keyof Episode, value: string | number) => {
    const newEpisodes = [...form.episodes];
    newEpisodes[index] = { ...newEpisodes[index], [field]: value };
    setForm((prev) => ({ ...prev, episodes: newEpisodes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.genre || !form.coverURL) return alert("Popunite obavezna polja");

    try {
      const newContent = await api.addContent({
        title: form.title,
        genre: form.genre,
        type: form.type,
        imageURL: form.coverURL,
        description: form.description,
        trivia: form.trivia,
        episodes: form.type === "Serija" ? form.episodes : undefined,
        category: form.type === "Film" ? "film" : "serija",
      });

      setCatalog((prev) => [...prev, newContent]);
      setForm({ title: "", description: "", coverURL: "", genre: "", trivia: "", type: "Film", episodes: [] });
    } catch (err) {
      console.error(err);
      alert("Greška pri dodavanju sadržaja");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Učitavanje...</div>;

  return (
    <main className="min-h-screen p-10 bg-gray-700 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin: Dodaj sadržaj</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4">
        <input type="text" name="title" value={form.title} onChange={handleInputChange} placeholder="Naslov" className="p-2 rounded border text-black w-full" />
        <input type="text" name="genre" value={form.genre} onChange={handleInputChange} placeholder="Žanr" className="p-2 rounded border text-black w-full" />
        <select name="type" value={form.type} onChange={handleInputChange} className="p-2 rounded border text-black w-full">
          <option value="Film">Film</option>
          <option value="Serija">Serija</option>
        </select>
        <input type="text" name="coverURL" value={form.coverURL} onChange={handleInputChange} placeholder="Cover URL" className="p-2 rounded border text-black w-full" />
        <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Opis" className="p-2 rounded border text-black w-full" />
        <textarea name="trivia" value={form.trivia} onChange={handleInputChange} placeholder="Trivia" className="p-2 rounded border text-black w-full" />

        {form.type === "Serija" && (
          <div>
            <h2 className="font-semibold text-lg mt-4">Epizode</h2>
            {form.episodes.map((ep, idx) => (
              <div key={idx} className="flex gap-2 flex-wrap mb-2">
                <input type="number" placeholder="Sezona" value={ep.season} onChange={(e) => handleEpisodeChange(idx, "season", +e.target.value)} className="p-2 rounded border text-black w-20" />
                <input type="number" placeholder="Epizoda" value={ep.episode} onChange={(e) => handleEpisodeChange(idx, "episode", +e.target.value)} className="p-2 rounded border text-black w-20" />
                <input type="text" placeholder="Naziv epizode" value={ep.title} onChange={(e) => handleEpisodeChange(idx, "title", e.target.value)} className="p-2 rounded border text-black flex-1" />
                <input type="text" placeholder="Opis" value={ep.description} onChange={(e) => handleEpisodeChange(idx, "description", e.target.value)} className="p-2 rounded border text-black flex-1" />
                <input type="text" placeholder="Cover URL" value={ep.coverURL} onChange={(e) => handleEpisodeChange(idx, "coverURL", e.target.value)} className="p-2 rounded border text-black flex-1" />
              </div>
            ))}
            <button type="button" onClick={addEpisode} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Dodaj epizodu</button>
          </div>
        )}

        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 mt-4">Dodaj sadržaj</button>
      </form>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {catalog.map((c) => (
          <div key={c.id} className="bg-gray-800 p-4 rounded shadow">
            <img src={c.imageURL} alt={c.title} className="w-full h-48 object-cover rounded mb-2" />
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p>{c.genre}</p>
            <p>Tip: {c.type}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
