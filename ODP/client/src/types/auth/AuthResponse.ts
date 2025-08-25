import type { UserDto } from "../../models/users/UserDto";

export type AuthResponse = {
  success: boolean;
  message: string;
  data?: UserDto;
}