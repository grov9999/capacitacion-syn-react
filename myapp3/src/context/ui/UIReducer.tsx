import { UIState } from "./UIProvider";

type UIActionType = { type: "[Ui] - toggle Theme" };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[Ui] - toggle Theme":
      return {
        ...state,
        isDark: !state.isDark,
      };

    default:
      return state;
  }
};