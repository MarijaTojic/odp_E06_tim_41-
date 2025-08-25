import { useEffect, useState } from "react";
import type { Content } from "../models/content/Content";
import { api } from "../api_services/content/api";

export default function CatalogPage() {
  const [catalog, setCatalog] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState<"Sve" | "Film" | "Serija">("Sve");
  const [sortField, setSortField] = useState<"title" | "prosecnaOcena">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.fetchContent();
        setCatalog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleRate = async (id: number, rating: number) => {
    try {
      const updated = await api.rateContent(id, rating);
      setCatalog((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCatalog = catalog
    .filter((c) => {
      const matchesTitle = c.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchesType = filterType === "Sve" || c.type === filterType;
      return matchesTitle && matchesType;
    })
    .sort((a, b) => {
      const fieldA = sortField === "title" ? a.title.toLowerCase() : a.prosecnaOcena;
      const fieldB = sortField === "title" ? b.title.toLowerCase() : b.prosecnaOcena;

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  if (loading) return <div className="min-h-screen flex items-center justify-center">Učitavanje kataloga...</div>;

  return (
    <main className="min-h-screen p-10 bg-gray-700 text-white">
      <h1 className="text-3xl font-bold mb-6">Katalog</h1>

      {/* Pretraga, filter i sortiranje */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Pretraga po naslovu..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="p-2 rounded border text-black flex-1"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "Sve" | "Film" | "Serija")}
          className="p-2 rounded border text-black w-40"
        >
          <option value="Sve">Sve</option>
          <option value="Film">Film</option>
          <option value="Serija">Serija</option>
        </select>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as "title" | "prosecnaOcena")}
          className="p-2 rounded border text-black w-44"
        >
          <option value="title">Sortiraj po nazivu</option>
          <option value="prosecnaOcena">Sortiraj po prosečnoj oceni</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="p-2 rounded border text-black w-44"
        >
          <option value="asc">Rastuće</option>
          <option value="desc">Opadajuće</option>
        </select>
      </div>

      {/* Katalog */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCatalog.map((c) => (
          <div key={c.id} className="bg-gray-800 p-4 rounded shadow">
            <img src={c.imageURL} alt={c.title} className="w-full h-48 object-cover rounded mb-2" />
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p>{c.genre}</p>
            <p>Tip: {c.type}</p>
            <p>Prosečna ocena: {c.prosecnaOcena.toFixed(1)}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[1,2,3,4,5,6,7,8,9,10].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRate(c.id, r)}
                  className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        ))}
        {filteredCatalog.length === 0 && <p className="col-span-full text-center mt-4">Nema sadržaja za prikaz</p>}
      </div>
    </main>
  );
}
