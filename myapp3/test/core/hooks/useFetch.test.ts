import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useFetch } from "../../../src/core/hooks/useFetch";

describe("useFetch Hook", () => {
    // act
    //  Cuando manipulamos el DOM manualmente (ej: fireEvent.click()).
    // Aquí, no necesitas act porque waitFor ya está esperando a que React actualice el estado antes de hacer el expect.
    // Usas waitFor cuando el código que estás probando hace actualizaciones asíncronas en el estado de React
    test("Debe actualizar data y loading cuando la promesa se resuelve exitosamente", async () => {
        const mockCallback = vi.fn(() =>
            Promise.resolve({ ok: true, data: "Test Data" })
        );

        const { result } = renderHook(() =>
            useFetch<string>({ callback: mockCallback })
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBe("Test Data");
            expect(result.current.error).toBeNull();
        });
    });

    test("Debe manejar errores y actualizar error cuando la promesa se rechaza", async () => {
        const mockCallback = vi.fn(() => Promise.reject(new Error("Error de red")));

        const { result } = renderHook(() =>
            useFetch<string>({ callback: mockCallback })
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBeNull();
            expect(result.current.error).toBe("Error de red");
        });
    });

    test("Debe manejar respuestas con error de API", async () => {
        const mockCallback = vi.fn(() =>
            Promise.resolve({ ok: false, message: "Error en API" })
        );

        const { result } = renderHook(() =>
            useFetch<string>({ callback: mockCallback })
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBeNull();
            expect(result.current.error).toBe("Error en API");
        });
    });
});
