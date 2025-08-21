import { Request, Response } from "express";
import * as UsersRepository from "../../Database/repositories/users/UserRepository";

// GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UsersRepository.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("❌ Greška getAllUsers:", err);
    res.status(500).json({ message: "Greška na serveru" });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UsersRepository.getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ Greška getUserById:", err);
    res.status(500).json({ message: "Greška na serveru" });
  }
};

// POST /api/users/register
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Nedostaju podaci" });
    }

    const newUserId = await UsersRepository.createUser({
      username,
      password,
      role: role || "user", // default user
    });

    res.status(201).json({ id: newUserId, message: "Korisnik uspešno kreiran" });
  } catch (err) {
    console.error("❌ Greška createUser:", err);
    res.status(500).json({ message: "Greška na serveru" });
  }
};

// POST /api/users/login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UsersRepository.getUserByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Pogrešan username ili lozinka" });
    }

    // Ovde možeš dodati JWT ako želiš token-based login
    res.json({ message: "Uspešna prijava", user });
  } catch (err) {
    console.error("❌ Greška loginUser:", err);
    res.status(500).json({ message: "Greška na serveru" });
  }
};
