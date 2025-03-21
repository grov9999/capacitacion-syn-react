import { sleep } from "../core/utils/sleep";
import { Todo } from "../interface/todo.interface";

export const getTodos = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data: Todo[] = await response.json();
    await sleep(5000);
    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
};

export const getTodoById = async (id: number) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + id
    );
    const data: Todo = await response.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
};

export const deleteTodoById = async (id: number) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + id,
      {
        method: "DELETE",
      }
    );
    const data: Todo = await response.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
};

export const createTodo = async (todo: Omit<Todo, "id">) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    });
    const data: Todo = await response.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
};

export const updateTodo = async (
  todo: Omit<Partial<Todo>, "id">,
  id: number
) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + id,
      {
        method: "UPDATE",
        body: JSON.stringify(todo),
      }
    );
    const data: Todo = await response.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
};

// export const getTodos = () => {
//   return fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
//     res.json()
//   );
// };