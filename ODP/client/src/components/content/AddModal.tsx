// AddModal.tsx
import { useState } from "react";

export interface Episode {
  season: number;
  episodeNumber: number;
  title: string;
  description: string;
  coverURL: string;
}

export interface Content {
  id?: number;
  title: string;
  genre: string;
  type: "Film" | "Serija";
  imageURL: string;
  prosecnaOcena: number;
  episodes?: Episode[];
}

interface AddModalProps {
  modalContent?: Content | null; // Ako se uređuje
  onClose: () => void;
  onSave: (content: Content) => void; // za admina
  onRate?: (contentId: number, rating: number) => void; // za korisnika
  userRole: "admin" | "user";
}

export default function AddModal({ modalContent, onClose, onSave, onRate, userRole }: AddModalProps) {
  const [newContent, setNewContent] = useState<Content>(
    modalContent
      ? { ...modalContent }
      : { title: "", genre: "", type: "Film", imageURL: "", prosecnaOcena: 0, episodes: [] }
  );

  const [rating, setRating] = useState(modalContent?.prosecnaOcena || 1);

  // Dodavanje epizode
  const addEpisode = () => {
    const newEpisode: Episode = {
      season: 1,
      episodeNumber: (newContent.episodes?.length || 0) + 1,
      title: "",
      description: "",
      coverURL: "",
    };
    setNewContent({
      ...newContent,
      episodes: [...(newContent.episodes || []), newEpisode],
    });
  };

  const handleEpisodeChange = (index: number, field: keyof Episode, value: string | number) => {
    if (!newContent.episodes) return;
    const updatedEpisodes = [...newContent.episodes];
    updatedEpisodes[index] = { ...updatedEpisodes[index], [field]: value };
    setNewContent({ ...newContent, episodes: updatedEpisodes });
  };

  const removeEpisode = (index: number) => {
    if (!newContent.episodes) return;
    const updatedEpisodes = newContent.episodes.filter((_, i) => i !== index);
    setNewContent({ ...newContent, episodes: updatedEpisodes });
  };

  const handleSave = () => {
    if (!newContent.title || !newContent.genre || !newContent.imageURL) {
      alert("Popunite sva polja!");
      return;
    }
    onSave(newContent);
    onClose();
  };

  const handleRating = () => {
    if (modalContent && onRate) {
      onRate(modalContent.id!, rating);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-4 w-11/12 max-w-md max-h-[80vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold transition">&times;</button>

        {userRole === "user" && modalContent ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
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
              onClick={handleRating}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition transform font-bold"
            >
              Pošalji ocenu
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              {modalContent ? "Uredi sadržaj" : "Dodaj novi sadržaj"}
            </h2>

            <input type="text" placeholder="Naziv" value={newContent.title}
              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input type="text" placeholder="Žanr" value={newContent.genre}
              onChange={(e) => setNewContent({ ...newContent, genre: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <select value={newContent.type} 
              onChange={(e) => setNewContent({ ...newContent, type: e.target.value as "Film" | "Serija" })}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="Film">Film</option>
              <option value="Serija">Serija</option>
            </select>
            <input type="text" placeholder="URL slike" value={newContent.imageURL}
              onChange={(e) => setNewContent({ ...newContent, imageURL: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {newContent.type === "Serija" && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Epizode:</h3>
                <div className="max-h-64 overflow-y-auto border rounded p-2">
                  {newContent.episodes?.map((ep, idx) => (
                    <div key={idx} className="border-b last:border-b-0 mb-2 pb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Epizoda {ep.episodeNumber}</span>
                        <button onClick={() => removeEpisode(idx)}
                          className="text-red-500 hover:text-red-700 font-bold">×</button>
                      </div>
                      <input type="text" placeholder="Naziv epizode" value={ep.title}
                        onChange={(e) => handleEpisodeChange(idx, "title", e.target.value)}
                        className="w-full px-2 py-1 mb-1 border rounded"
                      />
                      <input type="text" placeholder="Opis" value={ep.description}
                        onChange={(e) => handleEpisodeChange(idx, "description", e.target.value)}
                        className="w-full px-2 py-1 mb-1 border rounded"
                      />
                      <input type="text" placeholder="URL slike" value={ep.coverURL}
                        onChange={(e) => handleEpisodeChange(idx, "coverURL", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={addEpisode}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl mt-2 transition">
                  Dodaj epizodu
                </button>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition font-semibold">Otkaži</button>
              <button onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition">Sačuvaj</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
