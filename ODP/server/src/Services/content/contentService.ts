import { Content } from "../../Domain/models/Content";
import { Rating } from "../../Domain/models/Rating";
import { Trivia } from "../../Domain/models/Trivia";

export class ContentService {

  // Dohvat svih sadržaja
  static async getAllContents() {
    return await Content.findAll({ include: [Rating, Trivia] });
  }

  // Dohvat sadržaja po ID
  static async getContentById(contentId: number) {
    const content = await Content.findByPk(contentId, { include: [Rating, Trivia] });
    if (!Content) throw new Error("Content not found");
    return content;
  }

  // Dodavanje ocene
  static async addRating(userId: number, contentId: number, ratingValue: number) {
    return await Rating.create({ userId, contentId, ratingValue });
  }

  // Dohvat prosečne ocene
   static async getAverageRating(contentId: number): Promise<number> {
    const ratings: Rating[] = await Rating.findAll({ where: { contentId } });

    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, r) => acc + r.ratingValue, 0);
    return parseFloat((sum / ratings.length).toFixed(2));
  }

 
  
  // Dohvat trivija za sadržaj
  static async getTrivia(contentId: number) {
    return await Trivia.findAll({ where: { contentId } });
  }

  // Kreiranje novog sadržaja (npr. admin)
  static async createContent(title: string, type: "movie" | "series") {
    return await Content.create({ title, type });
  }
}
