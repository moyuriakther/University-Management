import { JwtPayload, jwtDecode } from "jwt-decode";
export const verifyToken = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
};
