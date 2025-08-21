import { Request, Response } from "express";
import * as TriviaRepository from "../../Database/repositories/trivia/TriviaRepository";

export async function getTriviaByContent(req: Request, res: Response) {
  try {
    const contentId = parseInt(req.params.contentId);
    const trivia = await TriviaRepository.getTriviaByContent(contentId);
    res.json(trivia);
  } catch (err) {
    res.status(500).json({ error: "Greška pri dohvatanju trivije." });
  }
}

export async function addTrivia(req: Request, res: Response) {
  try {
    const { contentId, text } = req.body;
    const result = await TriviaRepository.addTrivia(contentId, text);
    res.status(201).json({ message: "Trivija dodata", result });
  } catch (err) {
    res.status(500).json({ error: "Greška pri dodavanju trivije." });
  }
}
