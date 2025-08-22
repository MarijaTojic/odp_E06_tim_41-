// src/repositories/TriviaRepository.ts
import db from "../../connection/DbConnectionPool";
import { ITriviaRepository } from "../../../Domain/repositories/users/ITriviaRepository";
import { Trivia } from "../../../Domain/models/Trivia";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class TriviaRepository implements ITriviaRepository {
  async create(user: Trivia): Promise<Trivia> {
   try {
      const query = `
        INSERT INTO trivia (contentId, triviaText) 
        VALUES (?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [user.contentId, user.triviaText]);


      if (result.insertId) {
        // Vraćamo novog korisnika sa dodeljenim ID-om
        return new Trivia(result.insertId, user.contentId, user.triviaText);
      }

      // Vraćamo prazan objekat ako kreiranje nije uspešno
      return new Trivia();
    } catch (error) {
      console.error('Error creating trivia:', error);
      return new Trivia();
    }
  }
  async getByUsername(korisnickoIme: string): Promise<Trivia> {
    try {
      const query = `
        SELECT id, contentId, triviaText
        FROM trivia 
        WHERE triviaText = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [korisnickoIme]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Trivia(row.id, row.contentId, row.triviaText);
      }

      return new Trivia();
    } catch (error) {
      console.log("trivia get by username: " + error);
      return new Trivia();
    }
  }
  async getAll(): Promise<Trivia[]> {
       try {
      const query = `SELECT *FROM trivia ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Trivia(row.id, row.contentId, row.triviaText)
      );
    } catch {
      return [];
    }
  }
  async update(user: Trivia): Promise<Trivia> {
     try {
      const query = `
        UPDATE trivia 
        SET id = ?, contentId = ?, triviaText = ?
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.id,
        user.contentId,
        user.triviaText,

      ]);

      if (result.affectedRows > 0) {
        return user;
      }

      return new Trivia();
    } catch {
      return new Trivia();
    
  }
}
  async delete(id: number): Promise<boolean> {
     try {
      const query = `
        DELETE FROM trivia 
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async exists(id: number): Promise<boolean> {
    try {
      const query = `
        SELECT COUNT(*) as count 
        FROM trivia 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}