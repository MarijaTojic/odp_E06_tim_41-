import { Router } from "express";
import { TriviaService } from "../../Services/trivia/triviaService";

export const triviaRouter = Router();

// POST /api/trivia – dodavanje trivije
triviaRouter.post("/", async (req, res) => {
  try {
    const { contentId, triviaText } = req.body;
    const trivia = await TriviaService.addTrivia(contentId, triviaText);
    res.json(trivia);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/trivia/:contentId – sve trivije za sadržaj
triviaRouter.get("/:contentId", async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);

    // await jer getAllTrivia vraća Promise
    const trivias = await TriviaService.getAllTrivia(); 
   

    
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
