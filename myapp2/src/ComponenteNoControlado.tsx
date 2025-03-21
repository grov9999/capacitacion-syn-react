import React, { useRef } from 'react';
import './App.css'

function App() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault
        console.log('Enviando valores del formulario al servidor')
        console.log({
            name: nameRef.current?.value,
            email: emailRef.current?.value,
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" ref={nameRef} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" ref={emailRef}/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default App
