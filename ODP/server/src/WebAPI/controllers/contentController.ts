import { Request, Response } from "express";
import * as ContentRepository from "../../Database/repositories/content/ContentRepository";

export async function getAllContent(req: Request, res: Response) {
  try {
    const content = await ContentRepository.getAllContent();
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvatanju sadržaja." });
  }
}

export async function getContentById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const content = await ContentRepository.getContentById(id);
    if (!content) {
      return res.status(404).json({ message: "Sadržaj nije pronađen." });
    }
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvatanju sadržaja." });
  }
}

export async function createContent(req: Request, res: Response) {
  try {
    const { title, description, type } = req.body;
    const result = await ContentRepository.createContent(title, description, type);
    res.status(201).json({ message: "Sadržaj kreiran", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri kreiranju sadržaja." });
  }
}
