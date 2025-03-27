import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, beforeEach, test, vi, expect, Mock } from "vitest";
import React from "react";
import { TransferHistory } from "../../../../src/components/organisms/Transfer/TransferHistory";
import { getTransfers, deleteTransfer, updateTransfer } from "../../../../src/core/utils/transferapi";

// Mock de las funciones de la API
vi.mock("../../../../src/core/utils/transferapi", () => ({
    getTransfers: vi.fn(() =>
        Promise.resolve([
            {
                id: 1,
                tiempo: "2025-03-25",
                origen: "Cuenta A",
                monto: "100",
                descripcion: "Transferencia 1",
                destino: "Cuenta B",
            },
        ])
    ),
    deleteTransfer: vi.fn(() => Promise.resolve()),
    updateTransfer: vi.fn(() => Promise.resolve()),
}));

const queryClient = new QueryClient();

const setup = () =>
    render(
        <QueryClientProvider client={queryClient}>
            <TransferHistory />
        </QueryClientProvider>
    );

describe("TransferHistory Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("debería renderizar la lista de transferencias", async () => {
        setup();

        // Verifica que se muestre el estado de carga
        expect(screen.getByText(/Cargando transferencias/i)).toBeInTheDocument();

        // Espera a que se rendericen los datos simulados
        const transferRow = await screen.findByText(/Transferencia 1/i);
        expect(transferRow).toBeInTheDocument();
    });

    test("debería manejar la mutación deleteTransfer", async () => {
        setup();

        // Espera a que se rendericen los datos simulados
        const deleteButton = await screen.findByText(/Borrar/i);
        expect(deleteButton).toBeInTheDocument();

        // Simula el click en el botón de borrar
        fireEvent.click(deleteButton);

        await waitFor(() => {
            // La función deleteTransfer debe haberse llamado
            expect(deleteTransfer).toHaveBeenCalledWith(1); // Asegúrate de que el ID coincida
        });
    });

    test("debería manejar la mutación updateTransfer", async () => {
        setup();

        // Simula la interacción con el botón de modificar
        const modifyButton = await screen.findByText(/Modificar/i);
        expect(modifyButton).toBeInTheDocument();
        fireEvent.click(modifyButton);

        // Simula el formulario de actualización
        const input = screen.getByLabelText(/Tipo/i);
        fireEvent.change(input, { target: { value: "Nuevo Tipo" } });

        const saveButton = screen.getByText(/Guardar cambios/i);
        fireEvent.click(saveButton);

        await waitFor(() => {
            // La función updateTransfer debe haberse llamado con los datos correctos
            expect(updateTransfer).toHaveBeenCalledWith(
                expect.objectContaining({ destino: "Nuevo Tipo" })
            );
        });
    });
});