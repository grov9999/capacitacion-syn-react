import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { RegisterLayout } from "../../../../components/templates/AuthLayout/RegisterLayout";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Las contraseñas no coinciden")
    .required("Debes confirmar tu contraseña"),
  phone: Yup.string().required("El número de teléfono es obligatorio"),
  birthdate: Yup.date().required("La fecha de nacimiento es obligatoria"),
  terms: Yup.boolean().oneOf(
    [true],
    "Debes aceptar los términos y condiciones"
  ),
});

export const RegisterFormik = () => {
  const { startRegister } = useAuth();

  return (
    <RegisterLayout>
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          birthdate: "",
          terms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          // toast.promise(sleep(2000), {
          //   loading: "Enviando información...",
          //   success: () => {
          //     resetForm();
          //     return "Formulario enviado";
          //   },
          //   error: "Error al enviar",
          // });
          // console.log(values);

          startRegister({
            email: values.email,
            name: values.name,
            password: values.password,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className="text-[#2C3E50] font-bold text-2xl text-center border-b-[#3498DB] py-2 border-b-[3px]">
              Registro de Usuario
            </h2>
            <div className="p-2 flex flex-col gap-3 mt-3">
              <div className="register__input">
                <div>
                  <p>Nombre</p>
                  <Field type="text" name="name" autoComplete="off" />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-red-600/70 text-[.7em]"
                  />
                </div>
                <div>
                  <p>Apellido</p>
                  <Field type="text" name="lastname" autoComplete="off" />
                  <ErrorMessage
                    name="lastname"
                    component="span"
                    className="text-red-600/70 text-[.7em]"
                  />
                </div>
              </div>
              <div className="register__input register__input--all">
                <div>
                  <p>Correo Electrónico</p>
                  <Field type="email" name="email" autoComplete="off" />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-red-600/70 text-[.7em]"
                  />
                </div>
              </div>
              <div className="register__input">
                <div>
                  <p>Contraseña</p>
                  <Field type="password" name="password" autoComplete="off" />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-red-600/70 text-[.7em]"
                  />
                </div>
                <div>
                  <p>Confirmar Contraseña</p>
                  <Field
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className="text-red-600/70 text-[.7em]"
                  />
                </div>
              </div>
              <div className="register__input">
                <div>
                  <p>Número de Teléfono</p>
                  <Field type="text" name="phone" autoComplete="off" />
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="text-red-600/70 text-[.7em]"
                  />
                </div>
                <div>
                  <p>Fecha de Nacimiento</p>
                  <Field type="date" name="birthdate" autoComplete="off" />
                  <ErrorMessage
                    name="birthdate"
                    component="span"
                    className="text-red-600/70 text-[.7em]"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Field type="checkbox" name="terms" />
                <p>Acepto los términos y condiciones</p>
              </div>
              <ErrorMessage
                name="terms"
                component="span"
                className="text-red-600/70 text-[.7em]"
              />
            </div>
            <button
              className="bg-[#3498DB] text-white font-bold rounded-[5px] p-2 cursor-pointer mt-2 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </Form>
        )}
      </Formik>
    </RegisterLayout>
  );
};