import type { User } from "../../models/users/UserDto";

export type AuthResponse = {
  success: boolean;
  message: string;
  data?: User;
}