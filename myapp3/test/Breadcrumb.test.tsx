import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Breadcrumb } from "../src/components/organisms/Breadcrumb";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import React from "react";

describe("Breadcrumb Component", () => {
  it("No se renderiza en la ruta raíz (/)", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Breadcrumb />
      </MemoryRouter>
    );
    expect(screen.queryByText("Volver al inicio")).not.toBeInTheDocument();
  });

  it("Renderiza correctamente los breadcrumbs en una ruta anidada", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/settings"]}>
        <Breadcrumb />
      </MemoryRouter>
    );

    expect(screen.getByText("Volver al inicio")).toBeInTheDocument();
    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(screen.getByText("settings")).toBeInTheDocument();
  });

  it("Los enlaces tienen la URL correcta", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/settings"]}>
        <Breadcrumb />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Volver al inicio" })
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "dashboard" })).toHaveAttribute(
      "href",
      "/dashboard"
    );
    expect(screen.getByRole("link", { name: "settings" })).toHaveAttribute(
      "href",
      "/dashboard/settings"
    );
  });
});
