import { renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import { act } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useForm } from "../../../src/core/hooks/useForm";

// act se usa cuando los cambios de estado o efectos en los componentes/hook
/*
const { result } = renderHook(() => useCounter()); // Un hook que maneja un contador

act(() => {
  result.current.increment(); // Llama a la función que cambia el estado
});

expect(result.current.count).toBe(1); // Verifica el nuevo estado


render(<MyComponent />);

act(() => {
  fireEvent.click(screen.getByText("Incrementar"));
});

expect(screen.getByText("Contador: 1")).toBeInTheDocument();
*/

describe("Test in use Form custom hook", () => {
  const initialForm = {
    name: "thom",
    email: "thom@gmail.com",
  };
  test("should return the default values", () => {
    const { result } = renderHook(() => useForm(initialForm));
    expect(result.current).toEqual({
      form: initialForm,
      // onInputChange
      onChange: expect.any(Function),
      onResetForm: expect.any(Function),
    });
  });
  test("should change the email of form", () => {
    const { result } = renderHook(() => useForm(initialForm));
    act(() => {
      result.current.onChange({
        target: {
          name: "email",
          value: "carlos@gmail.com",
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.email).toBe("carlos@gmail.com");
  });
  test("should change the name of form", () => {
    const { result } = renderHook(() => useForm(initialForm));
    act(() => {
      result.current.onChange({
        target: {
          name: "name",
          value: "Carlos Oyola",
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.form.name).toBe("Carlos Oyola");
  });
  test("should reset the values of form", () => {
    const { result } = renderHook(() => useForm(initialForm));
    act(() => {
      result.current.onChange({
        target: {
          name: "name",
          value: "Carlos Oyola",
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.onChange({
        target: {
          name: "email",
          value: "asdasdasdasdasd",
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.onResetForm();
    });

    expect(result.current.form.name).toBe(initialForm.name);
    expect(result.current.form.email).toBe(initialForm.email);
  });
});
