import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { RegisterLayout } from "../../../../../src/components/templates/AuthLayout/RegisterLayout";
import React from "react";
describe("RegisterLayout", () => {
  it("renderiza correctamente los children", () => {

    // arrange
    const content = "Contenido de prueba"

    // act
    render(
      <RegisterLayout>
        <p>{content}</p>
      </RegisterLayout>
    );

    // assert
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});