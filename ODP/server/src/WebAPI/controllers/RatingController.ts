import { Request, Response } from "express";
import * as RatingRepository from "../../Database/repositories/rating/ratingRepositoty";

export async function getRatingsByContent(req: Request, res: Response) {
  try {
    const contentId = parseInt(req.params.contentId);
    const ratings = await RatingRepository.getRatingsByContent(contentId);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Greška pri dohvatanju ocena." });
  }
}

export async function addRating(req: Request, res: Response) {
  try {
    const { userId, contentId, score } = req.body;
    const result = await RatingRepository.addRating(userId, contentId, score);
    res.status(201).json({ message: "Ocena dodata", result });
  } catch (err) {
    res.status(500).json({ error: "Greška pri dodavanju ocene." });
  }
}
