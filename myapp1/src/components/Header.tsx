import { ReactNode } from "react";
import "./Header.css";

interface HeaderProps {
  type: string;
  children: ReactNode;
}

export const Header = ({ type, children}: HeaderProps) => {
  return <header className={`header header--${type}`}>{children}</header>;
}