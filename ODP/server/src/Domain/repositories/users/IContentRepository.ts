import { Content } from "../../Domain/models/Content";

/**
 * Repository interface za upravljanje korisnicima
 * Definiše operacije za rad sa korisnicima u bazi podataka
 */
export interface IContentRepository {
  /**
   * Kreira novog korisnika u bazi podataka
   * @param user - Objekat korisnika za kreiranje
   * @returns Promise koji vraća kreiranog korisnika sa dodeljenim ID-om ili prazan objekat
   */
  createContent(user: Content): Promise<Content>;

  /**
   * Pronalazi korisnika po ID-u
   * @param id - Jedinstveni identifikator korisnika
   * @returns Vraća korisnika ili prazan objekat ako nije pronađen
   */
  getContentById(id: number): Promise<Content>;

  /**
   * Pronalazi korisnika po korisničkom imenu
   * @param korisnickoIme - Korisničko ime za pretragu
   * @returns Promise koji vraća korisnika ili prazan objekat ako nije pronađen
   */
  getByUsername(korisnickoIme: string): Promise<Content>;

  /**
   * Vraća sve korisnike iz baze podataka
   * @returns Promise koji vraća niz svih korisnika
   */
  getAllContent(): Promise<Content[]>;

  /**
   * Ažurira postojećeg korisnika
   * @param user - Objekat korisnika sa ažuriranim podacima
   * @returns Promise koji vraća ažuriranog korisnika ili prazan objekat ako ažuriranje nije uspešno
   */
  update(user: Content): Promise<Content>;

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