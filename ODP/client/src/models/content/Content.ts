

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


