import toast from "react-hot-toast";
import { createTransfer } from "../../../core/utils/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";

const validationSchema = Yup.object({
    origen: Yup.string().required('Origen es requerido'),
    destino: Yup.string().required('Destino es requerido').matches(/^[0-9]+$/, 'Solo números').length(10, 'El número debe tener 10 dígitos'),
    monto: Yup.string().required('Monto es requerido').matches(/^\d+(\.\d{1,2})?$/, 'Solo números'),
    descripcion: Yup.string().required('Descripción es requerido'),
    terminos: Yup.bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
});


export const TransferForm = () => {
    const queryClient = useQueryClient();

    // Mutación para crear una nueva transferencia
    const mutation = useMutation({
        mutationFn: createTransfer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transfers"] }); // Refrescar el historial
            toast.success("Transferencia realizada exitosamente");
        },
        onError: () => {
            toast.error("Error al realizar la transferencia");
        },
    });

    return (
        <div className="flex flex-col items-center">
            <Formik
                initialValues={{
                    origen: "",
                    destino: "",
                    monto: "",
                    descripcion: "",
                    terminos: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    const tiempo = new Date().toLocaleDateString();
                    mutation.mutate({ ...values, tiempo });
                    resetForm();
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, handleSubmit, handleChange }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                Nueva Transferencia
                            </h2>
                            <div className="mb-2">
                                <p >Cuenta de Origen</p>
                                <Field
                                    as="select"
                                    name="origen"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona una cuenta</option>
                                    <option value="****7890">Cuenta Corriente1 - ****7890 (€5,842.75)</option>
                                    <option value="****5678">Cuenta Corriente2 - ****5678 (€4,002.20)</option>
                                    <option value="****3492">Cuenta Corriente3 - ****3492 (€3,567.00)</option>
                                </Field>
                                <ErrorMessage
                                    name="origen"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]"
                                />
                            </div>
                            <div className="mb-2">
                                <p>Cuenta de Destino</p>
                                <Field
                                    type="text"
                                    name="destino"
                                    autoComplete="off"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="destino"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]" />
                            </div>
                            <div className="mb-2">
                                <p>Monto</p>
                                <Field
                                    type="text"
                                    name="monto"
                                    autoComplete="off"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="monto"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]" />
                            </div>
                            <div className="mb-2">
                                <p>Descripción</p>
                                <Field
                                    type="text"
                                    name="descripcion"
                                    autoComplete="off"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="descripcion"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]" />
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                                <Field type="checkbox" name="terminos" />
                                <p>Guardar como beneficiario frecuente</p>
                                <ErrorMessage
                                    name="terminos"
                                    component="span"
                                    className="text-red-600/70 text-[.7em]"
                                />
                            </div>
                            <button
                                className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
                                ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                                    }
                                `}
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Realizar Transferencia
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default TransferForm;