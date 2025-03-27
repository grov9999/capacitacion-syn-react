import { ChangeEvent, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export const useForm = <T extends Object>(intialValues: T) => {
  const [form, setForm] = useState(intialValues);

  const onResetForm = () => {
    setForm(intialValues);
  };

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