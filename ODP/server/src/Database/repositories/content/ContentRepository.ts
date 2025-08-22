
import { Content } from "../../../Domain/models/Content";
import { IContentRepository } from "../../../Domain/repositories/users/IContentRepository";
import db from "../../connection/DbConnectionPool";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ContentRepository implements IContentRepository {
  async createContent(user: Content): Promise<Content> {
    try {
      const query = `
        INSERT INTO users (title, description, type, genre, imageURL ) 
        VALUES (?, ?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.title,
        user.description,
        user.type,
        user.genre,
        user.imageURL,
      ]);


      if (result.insertId) {
        // Vraćamo novog korisnika sa dodeljenim ID-om
        return new Content(result.insertId, user.title, user.description, user.type, user.genre, user.imageURL);
      }

      // Vraćamo prazan objekat ako kreiranje nije uspešno
      return new Content();
    } catch (error) {
      console.error('Error creating user:', error);
      return new Content();
    }
  }
  async getContentById(id: number): Promise<Content> {
    try {
      const query = `SELECT *FROM content WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Content(row.id, row.title, row.description, row.type, row.genre);
      }

      return new Content();
    } catch {
      return new Content();
    }
  }
  async getByUsername(korisnickoIme: string): Promise<Content> {
    try {
      const query = `
        SELECT id, title, description, type, genre
        FROM content 
        WHERE title = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [korisnickoIme]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Content(row.id, row.title, row.description, row.type, row.genre);
      }

      return new Content();
    } catch (error) {
      console.log("content get by username: " + error);
      return new Content();
    }
  }
  async getAllContent(): Promise<Content[]> {
    try {
      const query = `SELECT *FROM content ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Content(row.id, row.title, row.description, row.type, row.genre)
      );
    } catch {
      return [];
    }
  }
  async update(user: Content): Promise<Content> {
     try {
      const query = `
        UPDATE content 
        SET title = ?, description = ?, type = ?, genre = ?  
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.title,
        user.description,
        user.type,
        user.genre,
      ]);

      if (result.affectedRows > 0) {
        return user;
      }

      return new Content();
    } catch {
      return new Content();
    }
  }
  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM content 
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
        FROM content 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }



}