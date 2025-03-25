// import React, { useEffect, useState } from "react";
// import { getTransfer } from "../../services/getAxios";

// interface Client {
//   id: number;
//   clientName: string;
//   clientDni: string;
// }

// const TransferHistory: React.FC = () => {
//   const [transfers, setClients] = useState<Client[]>([]);

//   useEffect(() => {
//     getTransfer()
//       .then((data) => setClients(data))
//       .catch((error) => console.error("Error fetching clients:", error));
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Historial de Transferencias</h1>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Fecha</th>
//             <th className="border border-gray-300 px-4 py-2">Cuenta Origen</th>
//             <th className="border border-gray-300 px-4 py-2">Cuenta Destino</th>
//             <th className="border border-gray-300 px-4 py-2">Monto</th>
//             <th className="border border-gray-300 px-4 py-2">Descripción</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transfers.map((transfer) => (
//             <tr key={transfer.id}>
//               <td className="border border-gray-300 px-4 py-2">
//                 {transfer.tiempo}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {transfer.origen}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {transfer.destino}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {transfer.monto}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {transfer.descripcion}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TransferHistory;
