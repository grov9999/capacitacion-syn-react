import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { UIState } from "../../../src/context/ui/UIProvider";
import { UIReducer } from "../../../src/context/ui/UIReducer";

describe("UIReducer", () => {
  it("debe alternar el tema cuando se dispara la acción '[Ui] - toggle Theme'", () => {


    // ARRANGE
    const initialState: UIState = {
      isDark: false,
      sidebarOpen: false
    };

    // ACT
    const newState = UIReducer(initialState, { type: "[Ui] - toggle Theme" });

    // ASSERT
    expect(newState.isDark).toBe(true);
  });

  it("debe retornar el estado actual si la acción no es reconocida", () => {
    const initialState: UIState = {
      isDark: false,
      sidebarOpen: false
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = UIReducer(initialState, { type: "UNKNOWN_ACTION" as any });

    expect(newState).toEqual(initialState);
  });
});
