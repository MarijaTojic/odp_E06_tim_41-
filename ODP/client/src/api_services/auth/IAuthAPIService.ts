
import type { AuthResponse } from "../../types/auth/AuthResponse";


/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
    register(username: any, password: any, uloga: any) : Promise<AuthResponse[]>;

}