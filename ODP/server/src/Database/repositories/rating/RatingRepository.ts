// src/repositories/RatingRepository.ts
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Rating } from "../../../Domain/models/Rating";
import { IRatingRepository } from "../../../Domain/repositories/users/IRatingRepository";
import db from "../../connection/DbConnectionPool";

export class RatingRepository implements IRatingRepository {
  async create(user: Rating): Promise<Rating> {
     try {
      const query = `
        INSERT INTO rating (id, userId, contentId, ratingValue) 
        VALUES (?, ?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.userId,
        user.contentId,
        user.ratingValue,
      ]);


      if (result.insertId) {
        // Vraćamo novog korisnika sa dodeljenim ID-om
        return new Rating(result.insertId, user.userId, user.contentId, user.ratingValue);
      }

      // Vraćamo prazan objekat ako kreiranje nije uspešno
      return new Rating();
    } catch (error) {
      console.error('Error creating user:', error);
      return new Rating();
    }
  }
  async getById(id: number): Promise<Rating> {
     try {
      const query = `SELECT *FROM rating WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Rating(row.id, row.userId, row.contentId, row.ratingValue);
      }

      return new Rating();
    } catch {
      return new Rating();
    }
  }

  async getAll(): Promise<Rating[]> {
     try {
      const query = `SELECT *FROM rating ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Rating(row.id, row.userId, row.contentId, row.ratingValue)
      );
    } catch {
      return [];
    }
  }
  async update(user: Rating): Promise<Rating> {
    try {
      const query = `
        UPDATE rating 
        SET userId = ?, contentId = ?, ratingValue = ?   
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.userId,
        user.contentId,
        user.ratingValue,
      ]);

      if (result.affectedRows > 0) {
        return user;
      }

      return new Rating();
    } catch {
      return new Rating();
    }
  }
  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM rating 
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
        FROM rating 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
  
}



