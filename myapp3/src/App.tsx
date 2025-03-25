import { TransferHistory } from "./components/organisms/Transfer/TransferHistory"
import { QueryProvider } from "./components/organisms/Transfer/QueryProvider"
import TransferForm from "./components/organisms/Transfer/TransferForm";

export const App = () => {
  return (
    <QueryProvider>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full md:w-1/3 p-4">
          <TransferForm />
        </div>

          {/* Historial */}
        <div className="w-full md:w-2/3 p-4">
          <TransferHistory />
        </div>
      </div>
    </QueryProvider>
  )
}

export default App;