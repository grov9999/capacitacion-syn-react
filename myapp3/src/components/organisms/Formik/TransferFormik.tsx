import React from "react";
import { useFetch } from "../../../core/hooks/useFetch";
import { getTransferencias } from "../../../services/getTransferencias";
import { Transferencia } from "../../../interfaces/transferencia";

const TransferFormik: React.FC = () => {
  const {
    data: transfers,
    error,
    loading
  } = useFetch<Transferencia[]>({
    callback: () => getTransferencias(),
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Historial de Transferencias</h1>
      {loading && <p>Cargando transferencias...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Cuenta Origen</th>
            <th className="border border-gray-300 px-4 py-2">Cuenta Destino</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {transfers?.map((transfer) => (
            <tr key={transfer.id}>
              <td className="border border-gray-300 px-4 py-2">
                {transfer.tiempo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transfer.origen}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transfer.destino}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transfer.monto}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transfer.descripcion}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransferFormik;