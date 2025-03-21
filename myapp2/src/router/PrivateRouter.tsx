import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const PrivateRouter = ({ children, isAuthenticated }: Props) => {
  return !isAuthenticated ? <Navigate to={"/login"} /> : children
}