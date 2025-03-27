import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, beforeEach, test, vi, expect } from "vitest";
import React from "react";
import { RegisterFormik } from "../../../../src/components/organisms/Formik/RegisterFormik";
import { sleep } from "../../../../src/core/utils/sleep";
import { useFetch } from "../../../../src/core/hooks/useFetch";
import { toast } from "react-hot-toast";

// Mock de las dependencias
vi.mock("../../../../src/core/utils/sleep", () => ({
    sleep: vi.fn(() => Promise.resolve()), // Mock de sleep para devolver una promesa resuelta
  }));
  
  vi.mock("react-hot-toast", () => ({
    toast: {
      promise: vi.fn(), // Mock de toast.promise
    },
  }));
  
  vi.mock("../../../../src/core/hooks/useFetch", () => ({
    useFetch: vi.fn().mockReturnValue({
      data: [
        { tiempo: "2025-03-25", origen: "****7890", descripcion: "Pago de servicios", destino: "****5678" },
      ],
      error: null,
      loading: false,
    }),
  }));

// Configuración de renderizado
const setup = () => render(<RegisterFormik />);

describe("RegisterFormik", () => {

    beforeEach(() => {
        vi.clearAllMocks(); // Limpia los mocks antes de cada prueba
      });

    test("debería renderizar correctamente el formulario", () => {
        setup();
    
        // Verifica que los campos del formulario estén presentes
        expect(screen.getByLabelText(/Cuenta de Origen/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Cuenta de Destino/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Monto/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: /Guardar como beneficiario frecuente/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Realizar Transferencia/i })).toBeInTheDocument();
      });

    test("debería validar los campos requeridos", async () => {
        setup();
    
        // Intenta enviar el formulario vacío
        fireEvent.click(screen.getByRole("button", { name: /Realizar Transferencia/i }));
    
        // Verifica que se muestren los mensajes de error
        await waitFor(() => {
          expect(screen.getByText("Origen es requerido")).toBeInTheDocument();
          expect(screen.getByText("Destino es requerido")).toBeInTheDocument();
          expect(screen.getByText("Monto es requerido")).toBeInTheDocument();
          expect(screen.getByText("Descripción es requerido")).toBeInTheDocument();
          expect(screen.getByText("Debes aceptar los términos y condiciones")).toBeInTheDocument();
        });
      });

    //   test("debería enviar el formulario con datos válidos", async () => {
    //     setup();
    
    //     // Completa los campos del formulario
    //     await act(async () => {
    //       fireEvent.change(screen.getByLabelText(/Cuenta de Origen/i), { target: { value: "****7890" } });
    //       fireEvent.change(screen.getByLabelText(/Cuenta de Destino/i), { target: { value: "1234567890" } });
    //       fireEvent.change(screen.getByLabelText(/Monto/i), { target: { value: "100.50" } });
    //       fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "Pago de servicios" } });
    //       fireEvent.click(screen.getByRole("checkbox", { name: /Guardar como beneficiario frecuente/i }));
    //       fireEvent.click(screen.getByRole("button", { name: /Realizar Transferencia/i }));
    //     });
    
    //     // Valida que sleep fue llamado con el argumento correcto
    //     await waitFor(() => {
    //       expect(sleep).toHaveBeenCalledWith(100);
    //     });
    
    //     // Valida que toast.promise fue llamado con los argumentos correctos
    //     await waitFor(() => {
    //       expect(toast.promise).toHaveBeenCalledWith(
    //         expect.any(Promise),
    //         expect.objectContaining({
    //           loading: "Enviando información...",
    //           success: expect.any(Function),
    //           error: "Error al realizar la transferencia",
    //         })
    //       );
    //     });
    //   });

    test("debería renderizar el historial de transferencias", async () => {
        setup();
    
        // Verifica que se renderice el historial de transferencias
        await waitFor(() => {
          expect(screen.getByText(/Historial de Transferencias/i)).toBeInTheDocument();
        });
    
        // Verifica que los datos de transferencia simulados se muestren
        expect(screen.getByText("****7890")).toBeInTheDocument();
        expect(screen.getByText("Pago de servicios")).toBeInTheDocument();
        expect(screen.getByText("****5678")).toBeInTheDocument();
      });
});
