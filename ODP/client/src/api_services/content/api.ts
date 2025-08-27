import type {  Content } from "../../models/content/Content";
import type { Iapi } from "./Iapi";

export class ApiService implements Iapi {
 
  private static instance: ApiService;
  private contents: Content[] = [];

  private constructor() {
    // inicijalni podaci
    this.contents = [
      {
        id: 1,
        title: "Inception",
        description: "Film o snovima i podsvesti",
        imageURL: "https://via.placeholder.com/200x300?text=Inception",
        category: "Film",
        genre: "Sci-Fi",
        prosecnaOcena: 0,
        type: "Film",
        ratings: []
      },
      {
        id: 2,
        title: "Breaking Bad",
        description: "Drama o profesoru hemije koji postaje narko-bos",
        imageURL: "https://via.placeholder.com/200x300?text=Breaking+Bad",
        category: "Serija",
        genre: "Drama",
        prosecnaOcena: 0,
        episodes: [
          { season: 1, episode: 1, title: "Pilot", description: "Početak priče", coverURL: "" },
          { season: 1, episode: 2, title: "Cat's in the Bag...", description: "Druga epizoda", coverURL: "" },
        ],
        type: "Film",
        ratings: []
      },
      {
        id: 3,
        title: "The Witcher",
        description: "Fantastična serija sa veštcem",
        imageURL: "https://via.placeholder.com/200x300?text=The+Witcher",
        category: "Serija",
        genre: "Fantasy",
        prosecnaOcena: 0,
        episodes: [
          { season: 1, episode: 1, title: "The End's Beginning", description: "", coverURL: "" },
          { season: 1, episode: 2, title: "Four Marks", description: "", coverURL: "" },
        ],
        type: "Film",
        ratings: []
      },
    ];
  }
  fetchContent(): Promise<Content[]> {
    throw new Error("Method not implemented.");
  }
   static fetchContent() {
    throw new Error("Method not implemented.");
  }
 
  async  getInstance(): Promise<ApiService> {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async getAll(): Promise<Content[]> {
    return this.contents;
  }

  async add(newContent: Content): Promise<void> {
    this.contents.push(newContent);
  }

  async filterByCategory(category: "Film" | "Serija"): Promise<Content[]> {
    return this.contents.filter(c => c.category === category);
  }

  async rateContent(contentId: number, rating: number): Promise<void> {
    const content = this.contents.find(c => c.id === contentId);
    if (content) {
      content.prosecnaOcena = rating;
    }
  }
}
