import { useFetch } from "../../core/hooks/useFetch";
import { getTransferencias, getTransferenciasId } from "../../services/getTransferencias";
import { Transferencia } from "../../interfaces/transferencia";
import { Link, useNavigate } from "react-router";

const TrasnferForm2: React.FC = () => {

    const navigate = useNavigate();

    const {
        data: transfers,
        error,
        loading,
    } = useFetch<Transferencia[]>({
        callback: getTransferencias(),
    });

    const accountData = {
        name: "Juan Pérez",
        accountNumber: "****4567",
        balance: 15487.35,
        availableBalance: 14987.35,
        lastUpdate: "20/03/2025 09:45",
        accounts: [
            {
                id: 1,
                type: "Cuenta Corriente",
                number: "****4567",
                balance: 15487.35,
            },
            { id: 2, type: "Cuenta de Ahorro", number: "****2389", balance: 8754.2 },
            {
                id: 3,
                type: "Tarjeta de Crédito",
                number: "****7821",
                balance: -2340.5,
                limit: 10000,
            },
        ],
        recentTransactions: [
            {
                id: 1,
                date: "19/03/2025",
                description: "Supermercado XYZ",
                amount: -125.4,
                category: "Compras",
            },
            {
                id: 2,
                date: "18/03/2025",
                description: "Depósito ATM",
                amount: 500.0,
                category: "Depósito",
            },
            {
                id: 3,
                date: "17/03/2025",
                description: "Netflix",
                amount: -15.99,
                category: "Entretenimiento",
            },
            {
                id: 4,
                date: "15/03/2025",
                description: "Transferencia a Carlos",
                amount: -200.0,
                category: "Transferencia",
            },
            {
                id: 5,
                date: "12/03/2025",
                description: "Salario",
                amount: 3200.0,
                category: "Ingreso",
            },
        ],
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
        }).format(amount);
    };

    const showDetails = (id: number) => {
        getTransferenciasId(id).then((response) => {
            if (!response.ok) {
                console.log("ocurrio un error");
            } else {
                console.log(response);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-[#3598DB] text-white px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="font-bold text-xl">BancoSeguro</div>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="hover:text-blue-200 transition">
                            Inicio
                        </Link>
                        <Link to="/movimientos" className="hover:text-blue-200 transition">
                            Movimientos
                        </Link>
                        <Link
                            to="/transferencias"
                            className="hover:text-blue-200 transition"
                        >
                            Transferencias
                        </Link>
                        <Link to="/tarjetas" className="hover:text-blue-200 transition">
                            Tarjetas
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button className="focus:outline-none">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Header con bienvenida y resumen */}
            <header className="bg-[#3598DB] text-white pb-8 pt-4 px-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-2">
                        Hola, {accountData.name}
                    </h1>
                    <p className="text-blue-100">
                        Última actualización: {accountData.lastUpdate}
                    </p>

                    <div className="mt-6 bg-white text-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Cuenta Principal {accountData.accountNumber}
                        </h2>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-gray-500">Saldo actual</p>
                                <p className="text-3xl font-bold">
                                    {formatCurrency(accountData.balance)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Saldo disponible</p>
                                <p className="text-xl font-semibold">
                                    {formatCurrency(accountData.availableBalance)}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={() => navigate("/transferencias")}
                                className="bg-[#3598DB] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                            >
                                Transferir
                            </button>
                            <button
                                onClick={() => navigate("/movimientos")}
                                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                            >
                                Ver movimientos
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {loading && <p>Cargando data ...</p>}
            <div className=" flex flex-col gap-2 p-5">
                {!error &&
                    transfers?.map((transfers, index) => {
                        return (
                            <div className="flex bg-[#3598DB]/30 p-2" key={transfers.id}>
                                <p className="">
                                    {index + 1}. {transfers.descripcion}
                                </p>
                                <button
                                    className="bg-[tomato] ml-5 text-white p-2 rounded-[5px]"
                                    onClick={() => showDetails(transfers.id)}
                                >
                                    Mostrar detalle
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default TrasnferForm2;