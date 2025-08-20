import { Rating } from "../../Domain/models/Rating";

export class RatingService {

  // Dodavanje ocene
  static async addRating(userId: number, contentId: number, ratingValue: number) {
    return await Rating.create({ userId, contentId, ratingValue });
  }

  // Dohvat ocene po ID
  static async getRatingById(ratingId: number) {
    const rating = await Rating.findByPk(ratingId);
    if (!Rating) throw new Error("Rating not found");
    return rating;
  }


  }

