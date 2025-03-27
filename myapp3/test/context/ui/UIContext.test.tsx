import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import { UIContext } from "../../../src/context/ui/UIContext";
import { render, screen } from "@testing-library/react";
import React from "react";

// Crear un componente para probar el contexto
const MockConsumerComponent = () => {
  const context = React.useContext(UIContext);
  return (
    <div>
      <p data-testid="sidebar">{context.sidebarOpen ? "Abierto" : "Cerrado"}</p>
      <p data-testid="theme">{context.isDark ? "Modo Oscuro" : "Modo Claro"}</p>
      <button onClick={context.toggleTheme} data-testid="toggleButton">
        Cambiar Tema
      </button>
    </div>
  );
};

describe("UIContext", () => {
  test("debería renderizar valores iniciales del contexto correctamente", () => {
    // Renderizar el MockConsumerComponent con un proveedor simulado
    render(
      <UIContext.Provider
        value={{
          sidebarOpen: false,
          isDark: false,
          toggleTheme: () => {},
        }}
      >
        <MockConsumerComponent />
      </UIContext.Provider>
    );

    // Validar que los valores del contexto sean los esperados
    expect(screen.getByTestId("sidebar").textContent).toBe("Cerrado");
    expect(screen.getByTestId("theme").textContent).toBe("Modo Claro");
  });

  test("debería llamar a la función toggleTheme cuando se presiona el botón", () => {
    // Mock para capturar llamadas a toggleTheme
    const mockToggleTheme = vi.fn();

    render(
      <UIContext.Provider
        value={{
          sidebarOpen: true,
          isDark: true,
          toggleTheme: mockToggleTheme,
        }}
      >
        <MockConsumerComponent />
      </UIContext.Provider>
    );

    // Validar estado inicial
    expect(screen.getByTestId("sidebar").textContent).toBe("Abierto");
    expect(screen.getByTestId("theme").textContent).toBe("Modo Oscuro");

    // Simular clic en el botón
    screen.getByTestId("toggleButton").click();

    // Verificar que toggleTheme fue llamado
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
