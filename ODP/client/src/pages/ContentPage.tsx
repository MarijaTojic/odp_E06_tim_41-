import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentById, addRating } from "../api_services/content/api";

export default function ContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState<any>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (id) getContentById(Number(id)).then(setContent);
  }, [id]);

  const handleRate = async () => {
    if (id) {
      await addRating(Number(id), 1, rating); // test userId=1
      alert("Hvala na oceni!");
    }
  };

  if (!content) return <p>Učitavanje...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{content.title}</h1>
      <p>{content.description}</p>
      <p>⭐ Prosečna ocena: {content.averageRating?.toFixed(1) ?? "Nema ocena"}</p>

      <div className="mt-4">
        <label>Dodaj ocenu (1-5): </label>
        <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
        <button onClick={handleRate} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
          Oceni
        </button>
      </div>
    </div>
  );
}
