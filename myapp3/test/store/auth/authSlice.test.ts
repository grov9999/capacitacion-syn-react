import { UnknownAction } from "redux";
import {
  AUTH_STATUS,
  authSlice,
  onLogin,
  onLogoutWithoutError,
  onLogoutWithError,
  clearErrorMessage,
} from "../../../src/store/auth/authSlice";
import { describe, expect, test } from "vitest";

// Datos iniciales y de prueba
const demoUser = {
  uid: "123",
  name: "Demo User",
};

const initialState = {
  status: AUTH_STATUS.CHECKING,
  user: null,
  errorMessage: null,
};

const authenticatedState = {
  status: AUTH_STATUS.AUTHENTICATED,
  user: demoUser,
  errorMessage: null,
};

const notAuthenticatedState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: null,
  errorMessage: null,
};

describe("Tests for authSlice", () => {
  test('should return the initial state and should be called "auth"', () => {
    const state = authSlice.reducer(initialState, {} as UnknownAction);
    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("should handle login action", () => {
    const state = authSlice.reducer(initialState, onLogin(demoUser));
    expect(state).toEqual({
      status: AUTH_STATUS.AUTHENTICATED,
      user: demoUser,
      errorMessage: null,
    });
  });

  test("should handle logout without error", () => {
    const state = authSlice.reducer(authenticatedState, onLogoutWithoutError());
    expect(state).toEqual(notAuthenticatedState);
  });

  test("should handle logout with error", () => {
    const errorMessage = "Error during logout";
    const state = authSlice.reducer(
      authenticatedState,
      onLogoutWithError(errorMessage)
    );
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  test("should clear error message", () => {
    const state = authSlice.reducer(
      { ...authenticatedState, errorMessage: "Error occurred" },
      clearErrorMessage()
    );
    expect(state.errorMessage).toBeNull();
  });
});
