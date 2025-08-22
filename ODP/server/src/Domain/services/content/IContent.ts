import {ContentDto} from "../../DTOs/content/ContentDto";

export interface IContentService {

      /**
         * Vraca listu svih korisnika u sistemu.
         * @returns Podatke o korisnicima u vidu liste.
         */
       getAll(): Promise<ContentDto[]>;
       


}