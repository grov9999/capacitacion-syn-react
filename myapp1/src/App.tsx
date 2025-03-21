import {  useState } from 'react'
import { Header } from './components/Header'
import './App.css'
import { User } from './interfaces/User'
import { Avatar } from './components/Avatar'

function App() {
  const [count, setCount] = useState(0)

  const [show, setShow] = useState(true)

  const [user, setUser] = useState<User>({
    name: 'Grover',
    edad: 25,
    ciudad: 'Lima'
  })

  const handleChangeNameUser = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
    setUser({
      ...user,
      name: evt.target.value
    })
  }

  return (
    <>
      {show && <Header type=''>Usuario {user.name} Live</Header>}
      <Header type='info'>
        <div>Soy un logo</div>
        <ul className='nav'>
          <li>Home</li>
          <li>About</li>
          <li>Blog</li>
        </ul>
      </Header>

      <Avatar user={user} />
      <div className="p-2">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button
          onClick={() => {
            setShow(!show)
          }}
        >
          {show ? 'Ocultar' : 'Mostrar'}
        </button>
        <div>
          <pre>
            {JSON.stringify(user, null, 3)}
          </pre>
        </div>
        <input type="text"  value={user.name} onChange={handleChangeNameUser}/>
      </div>
    </>
  )
}

export default App
