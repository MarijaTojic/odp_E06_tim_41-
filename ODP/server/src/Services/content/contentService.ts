import { ContentDto } from "../../Domain/DTOs/content/ContentDto";
import { Content } from "../../Domain/models/Content";
import { IContentRepository } from "../../Domain/repositories/users/IContentRepository";
import { IContentService } from "../../Domain/services/content/IContent";

export class ContentService implements IContentService {
   public constructor(private contentRepository: IContentRepository) {}

  async getAll(): Promise<ContentDto[]> {
            const content: Content[] = await this.contentRepository.getAllContent();
            const contentDto: ContentDto[] = content.map(
             (content) => new ContentDto(content.title, content.description, content.type, content.genre, content.imageURL)
           );
       
           return contentDto;
  }

 
}
