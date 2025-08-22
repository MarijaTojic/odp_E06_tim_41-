import {RatingDto} from "../../DTOs/rating/RatingDto";

export interface IRatingService {

      /**
         * Vraca listu svih korisnika u sistemu.
         * @returns Podatke o korisnicima u vidu liste.
         */
       getAll(): Promise<RatingDto[]>;
       


}