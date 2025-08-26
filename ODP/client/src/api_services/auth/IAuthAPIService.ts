import type { User } from "../../models/users/UserDto";


/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
    register(username: any, password: any, uloga: any) : Promise<User[]>;

}