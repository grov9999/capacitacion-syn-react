import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { Toaster } from "react-hot-toast";
// Ensure Vitest is properly configured in your test environment
import { TransferForm } from "../../../../src/components/organisms/Transfer/TransferForm";
// import { createTransfer } from "../../../../src/core/utils/transferapi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createTransfer } from "../../../../src/core/utils/transferapi";

// Mock de la función API
vi.mock("../../../../src/core/utils/transferapi", () => ({
    createTransfer: vi.fn(),
}));

vi.mock("react-hot-toast", async () => {
    const original = await vi.importActual<typeof import("react-hot-toast")>("react-hot-toast");
    return {
        ...original, // Mantiene las exportaciones originales
        toast: {
            success: vi.fn(),
            error: vi.fn(), // Mock para capturar errores
        },
    };
});

beforeAll(() => {
    window.matchMedia = window.matchMedia || vi.fn().mockImplementation((query) => {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        };
    });
});


const queryClient = new QueryClient();

const setup = () =>
    render(
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <TransferForm />
        </QueryClientProvider>
    );

describe("TransferForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });


    test("debería renderizar correctamente el formulario", () => {
        setup();

        expect(screen.getByLabelText(/Cuenta de Origen/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Cuenta de Destino/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Monto/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: /Guardar como beneficiario frecuente/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Realizar transferencia/i })).toBeInTheDocument();
    });

    test("debería validar campos requeridos", async () => {
        setup();

        fireEvent.click(screen.getByRole("button", { name: /Realizar transferencia/i }));

        await waitFor(() => {
            expect(screen.getByText("Origen es requerido")).toBeInTheDocument();
            expect(screen.getByText("Destino es requerido")).toBeInTheDocument();
            expect(screen.getByText("Monto es requerido")).toBeInTheDocument();
            expect(screen.getByText("Descripción es requerido")).toBeInTheDocument();
            expect(screen.getByText("Debes aceptar los términos y condiciones")).toBeInTheDocument();
        });
    });


    test("debería enviar el formulario con datos válidos", async () => {
        (createTransfer as Mock).mockResolvedValueOnce({ success: true });

        setup();

        fireEvent.change(screen.getByLabelText(/Cuenta de Origen/i), { target: { value: "****7890" } });
        fireEvent.change(screen.getByLabelText(/Cuenta de Destino/i), { target: { value: "1234567890" } });
        fireEvent.change(screen.getByLabelText(/Monto/i), { target: { value: "100.50" } });
        fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "Pago de servicios" } });
        fireEvent.click(screen.getByRole("checkbox", { name: /Guardar como beneficiario frecuente/i }));
        fireEvent.click(screen.getByRole("button", { name: /Realizar transferencia/i }));

        await waitFor(() => {
            expect(createTransfer).toHaveBeenCalledWith({
                origen: "****7890",
                destino: "1234567890",
                monto: "100.50",
                descripcion: "Pago de servicios",
                terminos: true,
                tiempo: expect.any(String),
            });
        });
    });


    test("debería mostrar un mensaje de error si falla el envío", async () => {
        (createTransfer as Mock).mockRejectedValueOnce(new Error("Error"));

        setup();

        fireEvent.change(screen.getByLabelText(/Cuenta de Origen/i), { target: { value: "****7890" } });
        fireEvent.change(screen.getByLabelText(/Cuenta de Destino/i), { target: { value: "1234567890" } });
        fireEvent.change(screen.getByLabelText(/Monto/i), { target: { value: "100.50" } });
        fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "Pago de servicios" } });
        fireEvent.click(screen.getByRole("checkbox", { name: /Guardar como beneficiario frecuente/i }));
        fireEvent.click(screen.getByRole("button", { name: /Realizar transferencia/i }));

        await waitFor(() => {
            expect(screen.queryByText(/Error al realizar la transferencia/i)).toBeInTheDocument();
        });
    });
});