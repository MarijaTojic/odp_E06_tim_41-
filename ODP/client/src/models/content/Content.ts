// src/models/content/Content.ts
import type { Episode } from "./Episode";

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
