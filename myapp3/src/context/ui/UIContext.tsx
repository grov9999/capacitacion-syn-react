import { createContext } from "react";

interface ContextProps {
  sidebarOpen: any;
  isDark: boolean;
  toggleTheme: () => void;
}

export const UIContext = createContext({} as ContextProps);