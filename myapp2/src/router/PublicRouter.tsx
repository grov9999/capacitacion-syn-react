import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const PublicRouter = ({ children, isAuthenticated }: Props) => {
  return isAuthenticated ? <Navigate to={"/dashboard-admin"} /> : children
}