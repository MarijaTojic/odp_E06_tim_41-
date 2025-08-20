import { Router } from "express";
import { ContentService } from "../../Services/content/contentService";

export const contentRouter = Router();

// GET /api/contents
contentRouter.get("/", async (req, res) => {
  try {
    const contents = await ContentService.getAllContents();
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET /api/contents/:id
contentRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const content = await ContentService.getContentById(id);
    const avgRating = await ContentService.getAverageRating(id);
    const trivias = await ContentService.getTrivia(id);
    res.json({ content, avgRating, trivias });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

// POST /api/contents/:id/rating
contentRouter.post("/:id/rating", async (req, res) => {
  try {
    const contentId = parseInt(req.params.id);
    const { userId, ratingValue } = req.body;
    const rating = await ContentService.addRating(userId, contentId, ratingValue);
    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
