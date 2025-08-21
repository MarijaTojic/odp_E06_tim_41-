// src/repositories/RatingRepository.ts
import db from "../../connection/DbConnectionPool";

export async function getRatingsByContent(contentId: number) {
  const [rows] = await db.query("SELECT * FROM ratings WHERE content_id = ?", [contentId]);
  return rows;
}

export async function addRating(userId: number, contentId: number, ratingValue: number) {
  const [result] = await db.query(
    "INSERT INTO ratings (user_id, content_id, rating_value) VALUES (?, ?, ?)",
    [userId, contentId, ratingValue]
  );
  return result;
}
