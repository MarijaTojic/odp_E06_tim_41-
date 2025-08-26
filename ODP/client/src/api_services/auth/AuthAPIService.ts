import axios from "axios";
import type { IAuthAPIService } from "./IAuthAPIService";

const API_URL = "http://localhost:5000/api/auth";

export class AuthApiService implements IAuthAPIService {
  async register(user: { username: string; password: string; uloga: "user" | "admin" }) {
    try {
      const response = await axios.post(`${API_URL}/register`, user);
      return response.data; // mora sadržati { username, uloga }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Greška pri registraciji");
    }
  }
}
