import { User } from "../..//Domain/models/User";
import { Content } from "../../Domain/models/Content";
import { Rating } from "../../Domain/models/Rating";
import { Trivia } from "../../Domain/models/Trivia";

export async function seedDatabase() {
  User.create({ username: "admin", password: "admin123", role: "admin" });
  const inception = Content.create({ title: "Inception", type: "movie" });
  Rating.create({ ratingValue: 5, userId: 1, contentId: inception });
  Trivia.create({ triviaText: "Christopher Nolan pisao scenario 10 godina.", contentId: inception });

  console.log("✅ Seed završen");
}
