import db from "../../connection/DbConnectionPool";

export interface User {
  id: number;
  username: string;
  password: string;
  role: "user" | "admin";
}

// Dohvata sve korisnike
export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows as User[];
};

// Dohvata jednog korisnika po ID
export const getUserById = async (id: number): Promise<User | null> => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  const result = rows as User[];
  return result.length > 0 ? result[0] : null;
};

// Dohvata jednog korisnika po username (korisno za login)
export const getUserByUsername = async (username: string): Promise<User | null> => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
  const result = rows as User[];
  return result.length > 0 ? result[0] : null;
};

// Kreira novog korisnika
export const createUser = async (user: { username: string; password: string; role: "user" | "admin" }): Promise<number> => {
  const { username, password, role } = user;
  const [result] = await db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, password, role]
  );

  // mysql2 query result je tipa OkPacket
  const insertId = (result as any).insertId;
  return insertId;
};
