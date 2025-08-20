import { Trivia } from "../../Domain/models/Trivia";

export class TriviaService {
  static getAllTrivia() {
      throw new Error("Method not implemented.");
  }

  // Dodavanje trivije
  static async addTrivia(contentId: number, triviaText: string) {
    return await Trivia.create({ contentId, triviaText });
  }


  // Dohvat trivije po ID
  static async getTriviaById(triviaId: number) {
    const trivia = await Trivia.findByPk(triviaId);
    if (!Trivia) throw new Error("Trivia not found");
    return trivia;
  }


  }

