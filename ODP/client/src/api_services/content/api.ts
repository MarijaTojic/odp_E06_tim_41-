// client/src/services/ApiService.ts
export interface Episode {
  season: number;
  episode: number;
  title: string;
  description: string;
  cover: string;
}

export interface Content {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "Film" | "Serija";
  genre: string;
  rating: number;
  trivia?: string;
  episodes?: Episode[];
}

export class ApiService {
  private static instance: ApiService;
  private contents: Content[] = [];

  private constructor() {
    // inicijalni podaci
    this.contents = [
      {
        id: 1,
        title: "Inception",
        description: "Film o snovima i podsvesti",
        image: "https://via.placeholder.com/200x300?text=Inception",
        category: "Film",
        genre: "Sci-Fi",
        rating: 0,
      },
      {
        id: 2,
        title: "Breaking Bad",
        description: "Drama o profesoru hemije koji postaje narko-bos",
        image: "https://via.placeholder.com/200x300?text=Breaking+Bad",
        category: "Serija",
        genre: "Drama",
        rating: 0,
        episodes: [
          { season: 1, episode: 1, title: "Pilot", description: "Početak priče", cover: "" },
          { season: 1, episode: 2, title: "Cat's in the Bag...", description: "Druga epizoda", cover: "" },
        ],
      },
      {
        id: 3,
        title: "The Witcher",
        description: "Fantastična serija sa veštcem",
        image: "https://via.placeholder.com/200x300?text=The+Witcher",
        category: "Serija",
        genre: "Fantasy",
        rating: 0,
        episodes: [
          { season: 1, episode: 1, title: "The End's Beginning", description: "", cover: "" },
          { season: 1, episode: 2, title: "Four Marks", description: "", cover: "" },
        ],
      },
    ];
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public getAll(): Content[] {
    return this.contents;
  }

  public add(newContent: Content): void {
    this.contents.push(newContent);
  }

  public filterByCategory(category: "Film" | "Serija"): Content[] {
    return this.contents.filter(c => c.category === category);
  }

  public rateContent(contentId: number, rating: number): void {
    const content = this.contents.find(c => c.id === contentId);
    if (content) {
      content.rating = rating;
    }
  }
}
