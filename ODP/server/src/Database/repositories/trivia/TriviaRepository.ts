// src/repositories/TriviaRepository.ts
import db from "../../connection/DbConnectionPool";

export async function getTriviaByContent(contentId: number) {
  const [rows] = await db.query("SELECT * FROM trivia WHERE content_id = ?", [contentId]);
  return rows;
}

export async function addTrivia(contentId: number, fact: string) {
  const [result] = await db.query(
    "INSERT INTO trivia (content_id, fact) VALUES (?, ?)",
    [contentId, fact]
  );
  return result;
}
