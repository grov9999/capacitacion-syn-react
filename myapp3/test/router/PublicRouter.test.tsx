import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, Mock, test, vi } from "vitest";
import "@testing-library/jest-dom";
// Importamos el mock después de definirlo
import { AUTH_STATUS } from "../../src/store/auth/authSlice";
import { useAuth } from "../../src/features/auth/hooks/useAuth";
import { PublicRouter } from "../../src/router/PublicRouter";
import React from "react";

// 🔹 Mockeamos el hook `useAuth`
vi.mock("../../src/features/auth/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

const mockUseAuth = useAuth as Mock;

describe("PublicRouter", () => {
    test("No deberia de renderizar el children", () => {
        // ARRAMGE
        mockUseAuth.mockReturnValue({
            status: AUTH_STATUS.AUTHENTICATED,
        });

        // ACT
        render(
            <MemoryRouter>
                <PublicRouter>
                    <p>Soy publico</p>
                </PublicRouter>
            </MemoryRouter>
        );

        expect(screen.queryByText("Soy publico")).toBeNull();
    });
    test("si deberia de renderizar el children", () => {
        mockUseAuth.mockReturnValue({
            status: AUTH_STATUS.NOT_AUTHENTICATED,
        });

        render(
            <MemoryRouter>
                <PublicRouter>
                    <div>Soy publico</div>
                </PublicRouter>
            </MemoryRouter>
        );

        expect(screen.queryByText("Soy publico")).toBeInTheDocument();
    });
});
