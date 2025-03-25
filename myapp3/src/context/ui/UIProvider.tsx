import { FC, useEffect, useReducer } from "react";
import { UIContext } from "./UIContext";
import { UIReducer } from "./UIReducer";

interface Props {
  children: React.ReactNode;
}

export interface UIState {
  isDark: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isDark: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const toggleTheme = () => {
    dispatch({ type: "[Ui] - toggle Theme" });
  };

  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};