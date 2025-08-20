import { Link } from "react-router-dom";

interface ContentProps {
  id: number;
  title: string;
  description: string;
  averageRating?: number;
}

export default function ContentCard({ id, title, description, averageRating }: ContentProps) {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      {averageRating && <p>⭐ {averageRating.toFixed(1)}/5</p>}
      <Link to={`/content/${id}`} className="text-blue-500 underline">
        Detalji
      </Link>
    </div>
  );
}
