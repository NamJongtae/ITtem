import { AuthData } from "../../shared/common/types/authTypes";

export interface SignupResponseData {
  message: string;
  user: AuthData;
}
