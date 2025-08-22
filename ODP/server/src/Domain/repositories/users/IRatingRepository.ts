import { Rating } from "../../models/Rating";

/**
 * Repository interface za upravljanje korisnicima
 * Definiše operacije za rad sa korisnicima u bazi podataka
 */
export interface IRatingRepository {
  /**
   * Kreira novog korisnika u bazi podataka
   * @param user - Objekat korisnika za kreiranje
   * @returns Promise koji vraća kreiranog korisnika sa dodeljenim ID-om ili prazan objekat
   */
  create(user: Rating): Promise<Rating>;

  /**
   * Pronalazi korisnika po ID-u
   * @param id - Jedinstveni identifikator korisnika
   * @returns Vraća korisnika ili prazan objekat ako nije pronađen
   */
  getById(id: number): Promise<Rating>;

  /**
   * Pronalazi korisnika po korisničkom imenu
   * @param korisnickoIme - Korisničko ime za pretragu
   * @returns Promise koji vraća korisnika ili prazan objekat ako nije pronađen
   */

  getAll(): Promise<Rating[]>;

  /**
   * Ažurira postojećeg korisnika
   * @param user - Objekat korisnika sa ažuriranim podacima
   * @returns Promise koji vraća ažuriranog korisnika ili prazan objekat ako ažuriranje nije uspešno
   */
  update(user: Rating): Promise<Rating>;

  /**
   * Briše korisnika iz baze podataka
   * @param id - ID korisnika za brisanje
   * @returns Promise koji vraća true ako je brisanje uspešno, false inače
   */
  delete(id: number): Promise<boolean>;

  /**
   * Proverava da li korisnik postoji u bazi podataka
   * @param id - ID korisnika za proveru
   * @returns Promise koji vraća true ako korisnik postoji, false inače
   */
  exists(id: number): Promise<boolean>;
}