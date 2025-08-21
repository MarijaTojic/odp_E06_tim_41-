import db from "../../connection/DbConnectionPool";

export async function getAllContent() {
  const [rows] = await db.query("SELECT * FROM content");
  return rows as any[];
}

export async function getContentById(id: number) {
  const [rows] = await db.query("SELECT * FROM content WHERE id = ?", [id]);
  const result = rows as any[];
  return result[0]; // ✅ sad radi
}

export async function createContent(title: string, description: string, type: string) {
  const [result] = await db.query(
    "INSERT INTO content (title, description, type) VALUES (?, ?, ?)",
    [title, description, type]
  );
  return result;
}
