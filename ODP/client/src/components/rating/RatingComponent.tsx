import { useState } from "react";
import { rateContent } from "../../api_services/content/api";

interface RatingStarsProps {
  contentId: number;
  userId: number;
  onRated?: () => void;
}

export default function RatingStars({ contentId, userId, onRated }: RatingStarsProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRate = async (value: number) => {
    setSelectedRating(value);
    try {
      await rateContent(contentId, userId, value);
      if (onRated) onRated();
      alert(`Hvala! Ocena: ${value}`);
    } catch (err) {
      console.error(err);
      alert("Greška pri ocenjivanju");
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          onClick={() => handleRate(num)}
          className={`px-2 py-1 border rounded ${selectedRating >= num ? "bg-yellow-400" : ""}`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
