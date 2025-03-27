import { sleep } from "../core/utils/sleep";
import { Transferencia } from "../interfaces/transferencia";


// Obtener lista de movmientos
export const getTransferencias = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/transfer/all");
    const data: Transferencia[] = await response.json();
    await sleep(1000);
    return {
      ok: true,
      data,
    }
  } catch (error) {
    return {
      ok: false,
      message: (error as Error).message,
    }
  }
};

// Obtener transferencia por ID
export const getTransferenciasId = async (id: number) => {
  try {
    const response = await fetch("http://localhost:8080/api/transfer/search/" + id);
    const data: Transferencia = await response.json();
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

// Eliminar transferencia por ID
export const deleteTransferenciasById = async (id: number) => {
  try {
    const response = await fetch("http://localhost:8080/api/transfer/delete/" + id,
      {
        method: "DELETE",
      }
    );
    const data: Transferencia = await response.json();
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

// Crear nueva transferencia
export const createTransferencias = async (todo: Omit<Transferencia, "id">) => {
  try {
    const response = await fetch("http://localhost:8080/api/transfer/create", {
      method: "POST",
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error("Error al crear la transferencia");
    }
    const data: Transferencia = await response.json();
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

// Actualizar transferencia existente
export const updateTransferencias = async (
  todo: Omit<Partial<Transferencia>, "id">,
  id: number
) => {
  try {
    const response = await fetch("http://localhost:8080/api/transfer/update/" + id, {
      method: "PUT",
      body: JSON.stringify(todo),
    }
    );
    const data: Transferencia = await response.json();
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

// import { sleep } from "../core/utils/sleep";
// import { Transferencia } from "../interfaces/transferencia";

// // Función genérica para manejar solicitudes
// const fetchHandler = async <T>(endpoint: string, options?: RequestInit): Promise<{ ok: boolean; data?: T; message?: string }> => {
//   try {
//     const response = await fetch(endpoint, options);
//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }
//     const data: T = await response.json();
//     return { ok: true, data };
//   } catch (error) {
//     return { ok: false, message: (error as Error).message };
//   }
// };

// // Obtener lista de movimientos
// export const getTransferencias = async () => {
//   await sleep(1000); // Simula un retraso
//   return fetchHandler<Transferencia[]>("http://localhost:8080/api/transfer/all");
// };

// // Obtener transferencia por ID
// export const getTransferenciasId = async (id: number) => {
//   return fetchHandler<Transferencia>(`http://localhost:8080/api/transfer/search/${id}`);
// };

// // Eliminar transferencia por ID
// export const deleteTransferenciasById = async (id: number) => {
//   return fetchHandler<Transferencia>(`http://localhost:8080/api/transfer/delete/${id}`, {
//     method: "DELETE",
//   });
// };

// // Crear nueva transferencia
// export const createTransferencias = async (todo: Omit<Transferencia, "id">) => {
//   return fetchHandler<Transferencia>("http://localhost:8080/api/transfer/create", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(todo),
//   });
// };

// // Actualizar transferencia existente
// export const updateTransferencias = async (todo: Omit<Partial<Transferencia>, "id">, id: number) => {
//   return fetchHandler<Transferencia>(`http://localhost:8080/api/transfer/update/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(todo),
//   });
// };
