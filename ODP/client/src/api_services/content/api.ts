import type { Iapi } from "./Iapi";

export interface Content {
  id: number;                // Jedinstveni ID sadržaja
  title: string;             // Naslov filma/serije
  genre: string;             // Žanr
  type: "Film" | "Serija";  // Tip sadržaja
  imageURL: string;          // Cover slika
  description?: string;      // Opis radnje
  trivia?: string;           // Trivia sekcija
  prosecnaOcena: number;     // Prosečna ocena
  episodes?: Episode[];     // Lista epizoda (samo za serije)
  category: string;
}

export interface Episode {
  season: number;       // Broj sezone
  episode: number;      // Broj epizode
  title: string;        // Naziv epizode
  description: string;  // Kratak opis epizode
  coverURL: string;     // URL cover slike epizode
}


const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const api: Iapi = {
  async getAllContent(title: string, category: string): Promise<Content[]> {
    const params = new URLSearchParams({ title, category });
    const res = await fetch(`${API_URL}?${params.toString()}`);
    if (!res.ok) throw new Error("Greška pri dohvatanju sadržaja");
    const data: Content[] = await res.json();
    return data;
  },

  async fetchContent(): Promise<Content[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Inception",
            genre: "Sci-Fi",
            type: "Film",
            prosecnaOcena: 4.8,
            imageURL: "https://via.placeholder.com/200x300?text=Inception",
            description: "",
            trivia: "",
            category: "film",
          },
          {
            id: 2,
            title: "Breaking Bad",
            genre: "Drama",
            type: "Serija",
            prosecnaOcena: 4.9,
            imageURL: "https://via.placeholder.com/200x300?text=Breaking+Bad",
            description: "",
            trivia: "",
            category: "serija",
            episodes: [], // može biti prazno
          },
          {
            id: 3,
            title: "The Witcher",
            genre: "Fantasy",
            type: "Serija",
            prosecnaOcena: 4.5,
            imageURL: "https://via.placeholder.com/200x300?text=The+Witcher",
            description: "",
            trivia: "",
            category: "serija",
            episodes: [],
          },
        ]);
      }, 500);
    });
  },

  async addContent(newContent: Omit<Content, "id" | "prosecnaOcena">): Promise<Content> {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContent),
    });

    if (!res.ok) throw new Error("Neuspešno dodavanje sadržaja");
    return res.json();
  },

  async rateContent(contentId: number, rating: number): Promise<Content> {
    const res = await fetch(`/api/content/${contentId}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });

    if (!res.ok) throw new Error("Neuspešno ocenjivanje sadržaja");
    return res.json();
  },
};
