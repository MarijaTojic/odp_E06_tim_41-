import { TriviaDto } from "../../Domain/DTOs/trivia/TriviaDto";
import { Trivia } from "../../Domain/models/Trivia";
import { ITriviaService } from "../../Domain/services/trivia/ITrivia";
import { ITriviaRepository } from "../../Domain/repositories/users/ITriviaRepository";


export class TriviaService implements ITriviaService {
   public constructor(private triviaRepository: ITriviaRepository) {}

  async getAllTrivia(): Promise<TriviaDto[]> {
     const trivia: Trivia[] = await this.triviaRepository.getAll();
     const triviaDto: TriviaDto[] = trivia.map(
      (trivia) => new TriviaDto(trivia.id, trivia.contentId, trivia.triviaText)
    );

    return triviaDto;
  }
   

  
  }

