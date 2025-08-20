import { Content } from "../../Domain/models/Content";
import { Rating } from "../../Domain/models/Rating";
import { ratings } from "../../Database/seed/seed";

export class ContentService {
  static getAverageRating(contentId: number): number {
    const contentRatings = ratings.filter(r => r.contentId === contentId);
    if (contentRatings.length === 0) return 0;
    const sum = contentRatings.reduce((acc, r) => acc + r.ratingValue, 0);
    return parseFloat((sum / contentRatings.length).toFixed(2));
  }

  static getTriviaForContent(contentId: number) {
    // logika za trivije
  }
}
