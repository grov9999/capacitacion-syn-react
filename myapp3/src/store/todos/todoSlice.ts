import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../interfaces/todo.interface";

export interface TodosInitialState {
    todos: Todo[];
    loadingTodos: boolean;
    errorMessageTodos?: string | null;
}

const initialState: TodosInitialState = {
    todos: [],
    loadingTodos: false,
    errorMessageTodos: null,
};

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        onStartTodoLoading: (state: TodosInitialState) => {
            state.loadingTodos = true;
            state.errorMessageTodos = null;
        },
        onTodosLoaded: (
            state: TodosInitialState,
            action: PayloadAction<Todo[]>
        ) => {
            state.loadingTodos = false;
            state.todos = action.payload;
            state.errorMessageTodos = null;
        },
        onError: (state: TodosInitialState, action: PayloadAction<string>) => {
            state.loadingTodos = false;
            state.errorMessageTodos = action.payload;
        },
        onAddTodo: (state: TodosInitialState, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        onRemoveTodo: (state: TodosInitialState, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        onUpdateTodo: (state: TodosInitialState, action: PayloadAction<Todo>) => {
            const index = state.todos.findIndex(
                (todo) => todo.id === action.payload.id
            );
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },
    },
});

export const {
    onStartTodoLoading,
    onTodosLoaded,
    onError,
    onAddTodo,
    onRemoveTodo,
    onUpdateTodo,
} = todosSlice.actions;
