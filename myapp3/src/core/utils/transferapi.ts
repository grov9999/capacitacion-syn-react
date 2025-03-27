import axios from "axios";

const transfersApi = axios.create({
  baseURL: "http://localhost:8080/api/transfer", // Cambia esta URL según tu API
});

// O
export const getTransfers = async () => {
  const response = await transfersApi.get("/all");
  return response.data; // Asegúrate de que esta estructura coincida con tu API
};

// Crear una nueva transferencia
export const createTransfer = async (transfer: { tiempo: string; origen: string, monto: string, descripcion:string,destino:string }) => {
  const response = await transfersApi.post("/create", transfer);
  return response.data; // Devuelve la transferencia creada
};

// Actualizar una transferencia existente
export const updateTransfer = async (transfer: { id: number; tiempo: string; origen: string, monto: string, descripcion:string,destino:string }) => {
  const response = await transfersApi.put(`/update/${transfer.id}`, transfer);
  return response.data; // Devuelve la transferencia actualizada
};

// Eliminar una transferencia por ID
export const deleteTransfer = async (id: number) => {
  await transfersApi.delete(`/delete/${id}`); // No devuelve datos
};