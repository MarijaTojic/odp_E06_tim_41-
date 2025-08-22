import { Trivia } from "../../models/Trivia";

/**
 * Repository interface za upravljanje korisnicima
 * Definiše operacije za rad sa korisnicima u bazi podataka
 */
export interface ITriviaRepository {
  /**
   * Kreira novog korisnika u bazi podataka
   * @param user - Objekat korisnika za kreiranje
   * @returns Promise koji vraća kreiranog korisnika sa dodeljenim ID-om ili prazan objekat
   */
  create(user: Trivia): Promise<Trivia>;

  /**
   * Pronalazi korisnika po ID-u
   * @param id - Jedinstveni identifikator korisnika
   * @returns Vraća korisnika ili prazan objekat ako nije pronađen
   */
 
  getByUsername(korisnickoIme: string): Promise<Trivia>;

  /**
   * Vraća sve korisnike iz baze podataka
   * @returns Promise koji vraća niz svih korisnika
   */
  getAll(): Promise<Trivia[]>;

  /**
   * Ažurira postojećeg korisnika
   * @param user - Objekat korisnika sa ažuriranim podacima
   * @returns Promise koji vraća ažuriranog korisnika ili prazan objekat ako ažuriranje nije uspešno
   */
  update(user: Trivia): Promise<Trivia>;

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