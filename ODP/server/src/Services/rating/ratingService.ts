import { RatingDto } from "../../Domain/DTOs/rating/RatingDto";
import { Rating } from "../../Domain/models/Rating";
import { IRatingRepository } from "../../Domain/repositories/users/IRatingRepository";
import { IRatingService } from "../../Domain/services/rating/IRating";

export class RatingService implements IRatingService{
   public constructor(private ratingRepository: IRatingRepository) {}
  
  async getAll(): Promise<RatingDto[]> {
        const rating: Rating[] = await this.ratingRepository.getAll();
        const ratingDto: RatingDto[] = rating.map(
         (rating) => new RatingDto(rating.id, rating.userId, rating.contentId, rating.ratingValue)
       );
   
       return ratingDto;
  }

     

}

