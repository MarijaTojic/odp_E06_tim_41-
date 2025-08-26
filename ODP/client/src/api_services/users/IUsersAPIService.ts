import type { User } from "../../models/users/UserDto";

/**
 * Interfejs za korisnicki servis.
 */
export interface IUsersAPIService {
    getSviKorisnici(token: string): Promise<User[]>;
}