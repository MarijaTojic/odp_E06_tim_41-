interface RatingProps {
  currentRating: number;
  onRate: (rating: number) => void;
}

export function Rating({ currentRating, onRate }: RatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onRate(num)}
          className={`px-2 py-1 rounded ${
            num <= currentRating ? "bg-yellow-400 text-white" : "bg-gray-300 text-gray-700"
          } hover:bg-yellow-500 transition`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
