import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTransfers, deleteTransfer, updateTransfer } from "../../../core/utils/transferapi";
import { useState } from "react";

export const TransferHistory = () => {
  const queryClient = useQueryClient();

  const {
    data: transfers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transfers"],
    queryFn: getTransfers
  });


  // Mutación para eliminar transferencias
  const deleteMutation = useMutation({
    mutationFn: deleteTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfers"] });
    },
  });

  // Mutación para actualizar transferencias
  const updateMutation = useMutation({
    mutationFn: updateTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfers"] }); // Refrescar lista
    },
  });

  // Estado local para controlar el formulario
  const [selectedTransfer, setSelectedTransfer] = useState<null | { id: number; tiempo: string; origen: string; monto: string; descripcion: string; destino: string }>(null);


  // Función para manejar la actualización
  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTransfer) {
      updateMutation.mutate(selectedTransfer);
      setSelectedTransfer(null); // Ocultar formulario después de actualizar
    }
  };

  return (
    <div className="ml-8">
      <h2 className="text-2xl font-bold mb-4">Historial de Transferencias</h2>
      {isLoading && <p>Cargando transferencias...</p>}
      {isError && <p className="text-red-600">Error: {error?.message}</p>}
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descripción</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cuenta</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transfers?.map((transfer: { id: number; tiempo: string; origen: string, monto: string, descripcion: string, destino: string }) => (
            <tr key={transfer.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transfer.tiempo}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transfer.destino}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transfer.descripcion}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transfer.origen}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => setSelectedTransfer(transfer)}
                >Modificar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => deleteMutation.mutate(transfer.id)}
                >Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de actualización */}
      {selectedTransfer && (
        <form onSubmit={handleUpdateSubmit} className="mt-4 p-4 border bg-gray-100 rounded">
          <h3 className="text-xl font-bold mb-4">Actualizar Transferencia</h3>
          <div className="mb-2">
            <label htmlFor="destino" className="block text-sm font-medium">Tipo</label>
            <input
              id="destino"
              type="text"
              value={selectedTransfer?.destino || ""}
              onChange={(e) => setSelectedTransfer({ ...selectedTransfer, destino: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="descripcion" className="block text-sm font-medium">Descripción</label>
            <input
              id="descripcion"
              type="text"
              value={selectedTransfer?.descripcion || ""}
              onChange={(e) => setSelectedTransfer({ ...selectedTransfer, descripcion: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="origen" className="block text-sm font-medium">Cuenta</label>
            <input
              id="origen"
              type="text"
              value={selectedTransfer?.origen || ""}
              onChange={(e) => setSelectedTransfer({ ...selectedTransfer, origen: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar cambios
          </button>
          <button
            type="button"
            onClick={() => setSelectedTransfer(null)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};
