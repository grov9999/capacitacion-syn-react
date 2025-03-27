import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";// 🔹 Mockeamos el hook `useAuth`
import { useAuth } from "../src/features/auth/hooks/useAuth";
import React from "react";
import LoginForm from "../src/components/LoginForm";


vi.mock("../src/features/auth/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

const setup = () => {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
}

describe("LoginForm", () => {

    let mockStartLogin = vi.fn();
    const mockUseAuth = useAuth as Mock;

    beforeEach(() => {
        mockStartLogin = vi.fn();
        mockUseAuth.mockReturnValue({
            startLogin: mockStartLogin,
        })
    })

    test("Deberia de renderizar el formulario", () =>{

        setup();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Iniciar Sesión/i})).toBeInTheDocument();
    })

    test("deberia mostrar errores de validación si se envía vacío", async() => {
        setup();

        fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i}))

        await waitFor(() => {
            expect(screen.getByText(/El email es obligatorio/i)).toBeInTheDocument();
            expect(screen.getByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
        })
    })

    test("debería llamar a startLogin con credenciales válidas", async () => {
        setup();
    
        fireEvent.change(screen.getByLabelText(/Email/i), {
          target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
          target: { value: "password123" },
        });
    
        fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));
    
        await waitFor(() => {
          expect(mockStartLogin).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
          });
        });
      });
})