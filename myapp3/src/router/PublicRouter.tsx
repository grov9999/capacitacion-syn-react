import { Navigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { AUTH_STATUS } from "../store/auth/authSlice";

interface Props {
  children: React.ReactNode;
}

export const PublicRouter = ({ children }: Props) => {
  const { status } = useAuth();
  const isAuthenticated = status === AUTH_STATUS.AUTHENTICATED;
  return isAuthenticated ? <Navigate to={"/dashboard-admin"} /> : children;
};