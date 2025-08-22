import { Request, Response, Router } from "express";
import * as TriviaRepository from "../../Database/repositories/trivia/TriviaRepository";
import { ITriviaService } from "../../Domain/services/trivia/ITrivia";
import { ITriviaRepository } from "../../Domain/repositories/users/ITriviaRepository";

export class TriviaController {
  private router: Router;
  private triviaService: ITriviaService;

  public constructor(private triviaRepository: ITriviaRepository, triviaService: ITriviaService) {
    this.router = Router();
    this.triviaService = triviaService;
    this.initializeRoutes();

  }

   private initializeRoutes(): void {
    this.router.post('/auth/getTriviaByContent', this.getTriviaByContent.bind(this));
    
   
  }

private async  getTriviaByContent(req: Request, res: Response) {
  try {
    const contentId = (req.params.contentId);
    const trivia = await this.triviaRepository.getByUsername(contentId);
    res.json(trivia);
  } catch (err) {
    res.status(500).json({ error: "Greška pri dohvatanju trivije." });
  }
}


}