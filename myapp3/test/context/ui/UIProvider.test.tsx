import "@testing-library/jest-dom";
import { render, screen , act } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import React from "react";
import { UIProvider } from "../../..//src/context/ui/UIProvider";
import { UIContext } from "../../../src/context/ui/UIContext";

// Componente mock que consume el contexto
const MockConsumerComponent = () => {
  const { sidebarOpen, isDark, toggleTheme } = React.useContext(UIContext);
  return (
    <div>
      <p data-testid="sidebar">{sidebarOpen ? "Sidebar Abierto" : "Sidebar Cerrado"}</p>
      <p data-testid="theme">{isDark ? "Modo Oscuro" : "Modo Claro"}</p>
      <button onClick={toggleTheme} data-testid="toggleButton">
        Cambiar Tema
      </button>
    </div>
  );
};

describe("UIProvider", () => {
  test("debería proporcionar el estado inicial del contexto", () => {
    // Renderizar el MockConsumerComponent dentro del UIProvider
    render(
      <UIProvider>
        <MockConsumerComponent />
      </UIProvider>
    );

    // Validar los valores iniciales del contexto
    expect(screen.getByTestId("sidebar").textContent).toBe("Sidebar Cerrado");
    expect(screen.getByTestId("theme").textContent).toBe("Modo Claro");
  });

  test("debería cambiar el tema cuando se llama a toggleTheme", async () => {
    // Mock de toggleTheme
    render(
      <UIProvider>
        <MockConsumerComponent />
      </UIProvider>
    );

        // Verificar el estado inicial
    expect(screen.getByTestId("theme").textContent).toBe("Modo Claro");

    // Cambiar el estado llamando a toggleTheme
    await act(async () => {
        screen.getByTestId("toggleButton").click();
    });

    // Verificar que el estado haya cambiado
    expect(screen.getByTestId("theme").textContent).toBe("Modo Oscuro");
  });

  test("debería conservar el estado después de múltiples acciones", async () => {
    render(
      <UIProvider>
        <MockConsumerComponent />
      </UIProvider>
    );

    const toggleButton = screen.getByTestId("toggleButton");

    // Validar estado inicial
    expect(screen.getByTestId("theme").textContent).toBe("Modo Claro");

    await act(async () => {
        toggleButton.click();
      });
      expect(screen.getByTestId("theme").textContent).toBe("Modo Oscuro");
    
      // Cambiar tema nuevamente
    await act(async () => {
        toggleButton.click();
      });
      expect(screen.getByTestId("theme").textContent).toBe("Modo Claro");
  });
});
