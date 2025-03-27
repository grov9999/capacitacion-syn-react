import { Navigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { AUTH_STATUS } from "../store/auth/authSlice";

interface Props {
  children: React.ReactNode;
}

export const PrivateRouter = ({ children }: Props) => {
  const { status } = useAuth();
  const isNotAuthenticated = status === AUTH_STATUS.NOT_AUTHENTICATED;
  return isNotAuthenticated ? <Navigate to={"/login"} /> : children;
};