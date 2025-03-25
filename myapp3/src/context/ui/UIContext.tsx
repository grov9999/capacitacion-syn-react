import { createContext } from "react";

interface ContextProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const UIContext = createContext({} as ContextProps);