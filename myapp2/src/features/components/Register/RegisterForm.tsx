import { RegisterLayout } from "../../../components/templates/authLayout/RegisterLayout";
import { useForm } from "../../../core/hooks/useForm";
import { sleep } from "../../../core/utils/sleep";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";


export const RegisterForm = () => {
    const { form, onChange, onResetForm } = useForm({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        name: null,
        lastname: null,
        email: null,
        password: null,
    });

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (form.password != form.confirmPassword) {
            setErrors({
                ...errors,
                password: "Contraseñas no coinciden",
            });
            return;
        }
        setErrors({});
        toast.promise(sleep(2000), {
            loading: "Enviando informacion",
            success: () => {
                onResetForm();
                return "Formulario enviado";
            },
            error: "Error when fetching",
        });
        console.log(form);
    };

    return (
        <RegisterLayout>
            <form onSubmit={handleSubmit}>
                <h2 className="text-[#2C3E50] font-bold text-2xl text-center border-b-[#3498DB] py-2 border-b-[3px]">
                    Registro de Usuario
                </h2>
                <div className="p-2 flex flex-col gap-3 mt-3">
                    <div className="register__input">
                        <div>
                            <p>Nombre</p>
                            <input
                                type="text"
                                autoComplete="off"
                                name="name"
                                value={form.name}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <p>Apellido</p>
                            <input
                                type="text"
                                autoComplete="off"
                                name="lastname"
                                value={form.lastname}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="register__input register__input--all">
                        <div>
                            <p>Correo Electronico</p>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                id=""
                                autoComplete="off"
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="register__input">
                        <div>
                            <p>Contraseña</p>
                            <input
                                type="password"
                                autoComplete="off"
                                name="password"
                                value={form.password}
                                onChange={onChange}
                            />
                            {!!errors.password && (
                                <span className="text-red-600/70 text-[.7em]">
                                    (*) {errors.password}
                                </span>
                            )}
                        </div>
                        <div>
                            <p>confirmar contraseña</p>
                            <input
                                type="password"
                                autoComplete="off"
                                name="confirmPassword"
                                onChange={onChange}
                                value={form.confirmPassword}
                            />
                            {!!errors.password && (
                                <span className="text-red-600/70 text-[.7em]">
                                    (*) {errors.password}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="register__input">
                        <div>
                            <p>Numero de telefono</p>
                            <input type="text" autoComplete="off" />
                        </div>
                        <div>
                            <p>Fecha de nacimiento</p>
                            <input type="text" autoComplete="off" />
                        </div>
                    </div>
                </div>
                <button
                    className="bg-[#3498DB] text-white font-bold rounded-[5px] p-2 cursor-pointer mt-2 w-full"
                    type="submit"
                >
                    Registrarse
                </button>
            </form>
        </RegisterLayout>
    );
};