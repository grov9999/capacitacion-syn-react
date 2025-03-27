import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, Mock, vi } from "vitest";
import "@testing-library/jest-dom";
// Importamos el mock después de definirlo
import { AUTH_STATUS } from "../../src/store/auth/authSlice";
import { useAuth } from "../../src/features/auth/hooks/useAuth";
import { PrivateRouter } from "../../src/router/PrivateRouter";
import React from "react";

// 🔹 Mockeamos el hook `useAuth`
vi.mock("../../src/features/auth/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = useAuth as Mock;

describe("PrivateRouter", () => {
  it("Redirige a /login si el usuario NO está autenticado", () => {
    mockUseAuth.mockReturnValue({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
    });

    render(
      <MemoryRouter>
        <PrivateRouter>
          <div>Contenido protegido</div>
        </PrivateRouter>
      </MemoryRouter>
    );

    expect(screen.queryByText("Contenido protegido")).toBeNull();
  });

  it("Renderiza los children si el usuario está autenticado", () => {
    mockUseAuth.mockReturnValue({
      status: AUTH_STATUS.AUTHENTICATED,
    });

    const { getByText } = render(
      <MemoryRouter>
        <PrivateRouter>
          <div>Contenido protegido</div>
        </PrivateRouter>
      </MemoryRouter>
    );

    expect(getByText("Contenido protegido")).toBeInTheDocument();
  });
});
