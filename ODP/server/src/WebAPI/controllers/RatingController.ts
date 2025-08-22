import { Request, Response, Router } from "express";
import * as RatingRepository from "../../Database/repositories/rating/RatingRepository";
import jwt from "jsonwebtoken";
import { IRatingService } from "../../Domain/services/rating/IRating";
import { IRatingRepository } from "../../Domain/repositories/users/IRatingRepository";


export class RatingController {
  private router: Router;
  private ratingService: IRatingService;
  public constructor(private ratingRepository: IRatingRepository, ratingService: IRatingService) {
    this.router = Router();
    this.ratingService = ratingService;
    this.initializeRoutes();

  }


   private initializeRoutes(): void {
    this.router.post('/auth/getById', this.getById.bind(this));
    this.router.post('/auth/create', this.create.bind(this));
  }


  private async getById(req: Request, res: Response) {
    try {
      const contentId = parseInt(req.params.contentId);
      const ratings = await this.ratingRepository.getById(contentId);
      res.json(ratings);
    } catch (err) {
      res.status(500).json({ error: "Greška pri dohvatanju ocena." });
    }
  }

  private async create(req: Request, res: Response) {
    try {
      const { userId, contentId, score } = req.body;
      const result = await this.ratingRepository.create(userId);
      res.status(201).json({ message: "Ocena dodata", result });
    } catch (err) {
      res.status(500).json({ error: "Greška pri dodavanju ocene." });
    }
  }

}