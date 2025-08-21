import { useEffect, useState } from "react";
import { getAllContent, type Content } from "../api_services/content/api";
import RatingStars from "../components/rating/RatingComponent";

export default function CatalogPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState<"all" | "film" | "serija">("all");
  const [sortBy, setSortBy] = useState<"title" | "averageRating">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const userId = 1; // primer korisnika

  const fetchData = () => {
    setLoading(true);
    getAllContent(sortBy, order, category)
      .then(data => setContents(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [category, sortBy, order]);

  if (loading) return <div>Učitavanje...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Katalog sadržaja</h1>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setCategory("all")} className="btn">Sve</button>
        <button onClick={() => setCategory("film")} className="btn">Film</button>
        <button onClick={() => setCategory("serija")} className="btn">Serija</button>
      </div>

      <div className="mb-4 flex gap-2 items-center">
        <label>Sortiraj po:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="border p-1">
          <option value="title">Naziv</option>
          <option value="averageRating">Prosečna ocena</option>
        </select>

        <select value={order} onChange={e => setOrder(e.target.value as any)} className="border p-1">
          <option value="asc">Rastuće</option>
          <option value="desc">Opadajuće</option>
        </select>
      </div>

      <ul className="space-y-2">
        {contents.map(c => (
          <li key={c.id} className="border p-2 rounded shadow-sm">
            <h2 className="font-semibold">{c.title}</h2>
            <p>{c.description}</p>
            <p>Kategorija: {c.category}</p>
            <p>Prosečna ocena: {c.averageRating.toFixed(1)}</p>
            <RatingStars contentId={c.id} userId={userId} onRated={fetchData} />
          </li>
        ))}
      </ul>
    </div>
  );
}
