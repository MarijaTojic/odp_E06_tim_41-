import { Request, Response, Router } from "express";
import * as ContentRepository from "../../Database/repositories/content/ContentRepository";
import { IContentService } from "../../Domain/services/content/IContent";
import { IContentRepository } from "../../Domain/repositories/users/IContentRepository";

export class ContentController {
  private router: Router;
  private contentService: IContentService;

  public constructor(private contentRepository: IContentRepository, contentService: IContentService) {
    this.router = Router();
    this.contentService = contentService;
    this.initializeRoutes();

  }

   private initializeRoutes(): void {
    this.router.post('/auth/getAllContent', this.getAllContent.bind(this));
    this.router.post('/auth/getContentById', this.getContentById.bind(this));
    this.router.post('/auth/create', this.createContent.bind(this));
  }
  

private async  getAllContent(req: Request, res: Response) {
  try {
    const content = await this.contentRepository.getAllContent();
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvatanju sadržaja." });
  }
}

private async  getContentById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const content = await this.contentRepository.getContentById(id);
    if (!content) {
      return res.status(404).json({ message: "Sadržaj nije pronađen." });
    }
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvatanju sadržaja." });
  }
}

private async  createContent(req: Request, res: Response) {
  try {
    const { title, description, type } = req.body;
    const result = await this.contentRepository.createContent(title);
    res.status(201).json({ message: "Sadržaj kreiran", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri kreiranju sadržaja." });
  }
}

}