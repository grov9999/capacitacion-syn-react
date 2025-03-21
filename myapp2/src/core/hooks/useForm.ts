import { ChangeEvent, useState } from "react";

export function useForm<T>(initialValues: T) {
    const [form, setForm] = useState<T>(initialValues);

    
    const onResetForm = () => {
        setForm(initialValues);
    }

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value
    //     });
    // }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({
          ...form,
          [name]: value,
        });
      };

    return {
        form,
        onChange,
        onResetForm,
    };
};