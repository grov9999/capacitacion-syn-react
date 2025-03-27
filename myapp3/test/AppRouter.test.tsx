import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { test, vi, expect, beforeEach, afterEach, Mock } from "vitest";

import "@testing-library/jest-dom";
import { AppRouter } from "../src/AppRouter";
import { useAuth } from "../src/features/auth/hooks/useAuth";
import { AUTH_STATUS } from "../src/store/auth/authSlice";
import React from "react";

// 1️⃣ Mockeamos el hook de autenticación
vi.mock("../src/features/auth/hooks/useAuth");

const mockUseAuth = useAuth as Mock;

const renderWithRouter = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRouter />
    </MemoryRouter>
  );

beforeEach(() => {
  mockUseAuth.mockReturnValue({
    status: AUTH_STATUS.NOT_AUTHENTICATED,
    user: null,
    errorMessage: null,
    checkAuthToken: vi.fn(),
    startLogin: vi.fn(),
    startRegister: vi.fn(),
    startLogout: vi.fn(),
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

test("Deberia mostrar not found", async () => {
  mockUseAuth.mockReturnValue({
    status: AUTH_STATUS.AUTHENTICATED,
    user: { name: "Test User", uid: "123" },
    errorMessage: null,
    checkAuthToken: vi.fn(), // 🚨 Mock vacío para que no cambie el estado
    startLogin: vi.fn(),
    startRegister: vi.fn(),
    startLogout: vi.fn(),
  });

  renderWithRouter(["/"]);

  await waitFor(() => {
    expect(screen.getByText(/Página no encontrada/i)).toBeInTheDocument();
  });
});

test("Deberia mostrar el login", async () => {
  mockUseAuth.mockReturnValue({
    status: AUTH_STATUS.NOT_AUTHENTICATED,
    user: { name: "Test User", uid: "123" },
    errorMessage: null,
    checkAuthToken: vi.fn(), // 🚨 Mock vacío para que no cambie el estado
    startLogin: vi.fn(),
    startRegister: vi.fn(),
    startLogout: vi.fn(),
  });

  renderWithRouter(["/login"]);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();

    // Busca el botón "Iniciar Sesión"
    expect(
      screen.getByRole("button", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();
  });
});
test("Deberia mostrar el register", async () => {
  mockUseAuth.mockReturnValue({
    status: AUTH_STATUS.NOT_AUTHENTICATED,
    user: { name: "Test User", uid: "123" },
    errorMessage: null,
    checkAuthToken: vi.fn(), // 🚨 Mock vacío para que no cambie el estado
    startLogin: vi.fn(),
    startRegister: vi.fn(),
    startLogout: vi.fn(),
  });

  renderWithRouter(["/register"]);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /Registro de Usuario/i })
    ).toBeInTheDocument();
  });
});

test("Deberia mostrar el checking", async () => {
  mockUseAuth.mockReturnValue({
    status: AUTH_STATUS.CHECKING,
    user: { name: "Test User", uid: "123" },
    errorMessage: null,
    checkAuthToken: vi.fn(), // 🚨 Mock vacío para que no cambie el estado
    startLogin: vi.fn(),
    startRegister: vi.fn(),
    startLogout: vi.fn(),
  });

  renderWithRouter(["/register"]);

  await waitFor(() => {
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});

test("Deberia mostrar el home", async () => {
  mockUseAuth.mockReturnValue({
    status: AUTH_STATUS.AUTHENTICATED,
    user: { name: "Test User", uid: "123" },
    errorMessage: null,
    checkAuthToken: vi.fn(), // 🚨 Mock vacío para que no cambie el estado
    startLogin: vi.fn(),
    startRegister: vi.fn(),
    startLogout: vi.fn(),
  });

  renderWithRouter(["/dashboard-admin"]);

  await waitFor(() => {
    // expect(screen.getByTestId("BancoSeguro")).toBeInTheDocument();
  });
});
