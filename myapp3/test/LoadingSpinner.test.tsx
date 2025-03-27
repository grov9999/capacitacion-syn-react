import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { LoadingSpinner } from "../src/LoadingSpinner";
import React from "react";

describe("LoadingSpinner Component", () => {
  it("Se renderiza correctamente", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("Tiene la animación de giro", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId("loading-spinner")).toHaveClass("animate-spin");
  });

  it("Es accesible con role=status", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId("loading-spinner")).toHaveAttribute(
      "role",
      "status"
    );
  });
});
