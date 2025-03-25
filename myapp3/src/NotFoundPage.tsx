import React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            Volver al inicio de sesión
          </Link>
          <Link
            to="/"
            className="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-md transition-colors"
          >
            Ir a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;