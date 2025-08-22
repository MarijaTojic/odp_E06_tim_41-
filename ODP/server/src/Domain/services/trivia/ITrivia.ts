import {TriviaDto} from "../../DTOs/trivia/TriviaDto";

export interface ITriviaService {

      /**
         * Vraca listu svih korisnika u sistemu.
         * @returns Podatke o korisnicima u vidu liste.
         */
       getAllTrivia(): Promise<TriviaDto[]>;


}