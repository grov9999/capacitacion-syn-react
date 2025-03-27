import toast from "react-hot-toast";
import { sleep } from "../../../core/utils/sleep";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "../../../core/hooks/useFetch";
import { Transferencia } from "../../../interfaces/transferencia";
import { getTransferencias } from "../../../services/getTransferencias";

const validationSchema = Yup.object({
    origen: Yup.string().required('Origen es requerido'),
    destino: Yup.string().required('Destino es requerido').matches(/^[0-9]+$/, 'Solo números').length(10, 'El número debe tener 10 dígitos'),
    monto: Yup.string().required('Monto es requerido').matches(/^\d+(\.\d{1,2})?$/, 'Solo números'),
    descripcion: Yup.string().required('Descripción es requerido'),
    terminos: Yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
});


export const RegisterFormik = () => {

    const {
        data: transfers,
        error,
        loading
    } = useFetch<Transferencia[]>({
        callback: () => getTransferencias(),
    });


    return (
        <div className="flex flex- items-auto">
            <Formik
                initialValues={{
                    origen: '',
                    destino: '',
                    monto: '',
                    descripcion: '',
                    terminos: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    toast.promise(sleep(100), {
                        loading: "Enviando información...",
                        success: () => {
                            resetForm();
                            setSubmitting(false);
                            return "Transferencia Realizada";
                        },
                        error: "Error al realizar la transferencia",
                    });                     
                    console.log(values);
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                    handleChange,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4 text-center">Nueva Transferencia</h2>
                            <div className="mb-2">
                            <label htmlFor="origen" className="block">Cuenta de Origen</label>
                                <Field id="origen" as="select" name="origen" className="w-full border border-gray-300 rounded-lg p-2" onChange={handleChange} >
                                    <option value="selecciona">Selecciona una cuenta</option>
                                    <option value="****7890">Cuenta Corriente1 - ****7890 (€5,842.75)</option>
                                    <option value="****5678">Cuenta Corriente2 - ****5678 (€4,002.20)</option>
                                    <option value="****3492">Cuenta Corriente3 - ****3492 (€3,567.00)</option>
                                </Field>
                                <ErrorMessage
                                    name="origen"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]" />
                            </div>
                            <div className="mb-2">
                            <label htmlFor="destino" className="block">Cuenta de Destino</label>
                                <Field type="text" id="destino" name="destino" autoComplete="off" className="w-full border border-gray-300 rounded-lg p-2" onChange={handleChange}/>
                                <ErrorMessage
                                    name="destino"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]" />
                            </div>
                            <div className="mb-2">
                            <label htmlFor="monto" className="block">Monto</label>
                                <Field id="monto" type="text" name="monto" autoComplete="off" className="w-full border border-gray-300 rounded-lg p-2" onChange={handleChange} />
                                <ErrorMessage
                                    name="monto"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]" />
                            </div>
                            <div className="mb-2">
                            <label htmlFor="descripcion" className="block">Descripción</label>
                                <Field id="descripcion" type="text" name="descripcion" autoComplete="off" className="w-full border border-gray-300 rounded-lg p-2" onChange={handleChange}/>
                                <ErrorMessage
                                    name="descripcion"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]" />
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <Field type="checkbox" id="terminos" name="terminos" aria-label="Guardar como beneficiario frecuente"/>
                                <label htmlFor="terminos" className="block">Guardar como beneficiario frecuente</label>
                                <ErrorMessage
                                    name="terminos"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]"
                                />
                            </div>
                            <button
                                className={`w-full py-2 px-4 rounded-lg transition duration-300 ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                                }`}
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Realizar Transferencia
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="ml-8">
                <h2 className="text-2xl font-bold mb-4">Historial de Transferencias</h2>
                {loading && <p>Cargando transferencias...</p>}
                {error && <p className="text-red-600">Error: {error}</p>}
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
                        {transfers?.map((item, index) => (
                            <tr key={index}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{item.tiempo}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{item.origen}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{item.descripcion}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{item.destino}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Modificar</button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default RegisterFormik