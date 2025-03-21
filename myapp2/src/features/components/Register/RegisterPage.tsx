import { useState } from "react";
import toast from "react-hot-toast";
import { sleep } from "../../../core/utils/sleep";
import { useForm } from "../../../core/hooks/useForm";

export const RegisterPage = () => {

    // const [form, setForm] = useState({
    //     name: '',
    //     lastname: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    // });

    // const onResetForm = () => {
    //     setForm({
    //         name: '',
    //         lastname: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: ''
    //     });
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value
    //     });
    // }

    const {form, onChange, onResetForm} = useForm({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<Record<string, null | string>>({
        name: null,
        lastname: null,
        email: null,
        password: null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(form.password !== form.confirmPassword) {
            setError({
                ...error,
                password: 'Las contraseñas no coinciden'
            })
            return;

        }
        
        toast.promise(sleep(2000), {
            loading: 'Enviando formulario',
            success: () => {
                console.log('Formulario enviado');
                console.table(form);
                setError({});
                onResetForm();
                return 'Formulario enviado';
            },
            error: 'Error al enviar formulario'
        });
    }

    
    return (
        <div className="w-[90%] border-amber-100 border-[2px] bg-white rounded-2xl m-auto my-5 md:w-[600px]">
            <form onSubmit={handleSubmit}>
                <h2 className="text-[#2C3E50] font-bold text-2xl text-center border-b-[#3498DB] py-2 border-b-[3px]">
                    Registro de usuario
                </h2>
                <div className="register">
                    <div className="register__input">
                        <div>
                            <p>Nombre</p>
                            <input type="text" name="name" value={form.name} onChange={onChange}/>
                        </div>
                        <div>
                            <p>Apellido</p>
                            <input type="text" name="lastname" value={form.lastname} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="register__input register__input--all">
                        <div>
                            <p>Correo Electronico</p>
                            <input type="text" name="email" value={form.email} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="register__input">
                        <div>
                            <p>Contraseña</p>
                            <input type="password" name="password" value={form.password} onChange={onChange}/>
                            {!!error.password && <span className="text-red-500 text-[.7em]">{error.password}</span>}
                        </div>
                        <div>
                            <p>Confirmar Contraseña</p>
                            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange}/>
                            {!!error.password && <span className="text-red-500 text-[.7em]" >{error.password}</span>}
                        </div>
                    </div>
                </div>
                <button className="bg-[#3598DB] text-white font-bold rounded-[5px] p-2 cursor-pointer w-full mt-2">
                    Registrarse
                </button>
            </form>
        </div>
    );
}