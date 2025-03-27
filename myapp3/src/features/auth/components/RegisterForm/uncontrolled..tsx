import { useRef } from "react";

export const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Nombre:", nameRef.current?.value);
    console.log("Email:", emailRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input id="name" type="text" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};