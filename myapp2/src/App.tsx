import React, { useEffect, useRef, useState } from 'react';
import './App.css'

interface Image {
  url: string;
  title: string;
  description: string;
}

function App() {

  const nameRef = useRef<HTMLInputElement>(null);

  const [imagenes, setImagenes] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault
    console.log('Enviando valores del formulario al servidor')
  };

  useEffect(() => {
    if (show) {
      setLoading(true);
      fetch('https://imagenes.com.api')
        .then(data => data.json())
        .then(val => {
          setImagenes(val);
          setLoading(false);
        })
    }
  }, [show])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" ref={nameRef} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" />
        </div>
        <button type="submit">Enviar</button>
      </form>

      <button onClick={() => setShow(true)} disabled={loading}>
        {loading ? 'Consultando imagenes ...' : 'Cargar Imagenes'}
      </button>
      <ul>
        {imagenes.map(image => {
          return (
            <li>
              {""}
              <img src={image.url} alt={image.title} /> {""}
              <p>{image.description}</p>{""}
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default App
