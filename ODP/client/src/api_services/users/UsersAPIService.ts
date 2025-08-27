import axios from "axios";
import type { User } from "../../models/users/UserDto";
import type { IUsersAPIService } from "./IUsersAPIService";

const API_URL: string = import.meta.env.VITE_API_URL + "user";

export const usersApi: IUsersAPIService = {
  async getSviKorisnici(token: string): Promise<User[]> {
    try {
      const res = await axios.get<User[]>(`${API_URL}s`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch {
      return [];
    }
  },
};
