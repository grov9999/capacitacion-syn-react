import { User } from "../interfaces/User"
import styles from './Avatar.module.css'

interface AvatarProps {
  user: User
}


export const Avatar = ({user}:AvatarProps) => {
  return (
    <div className={styles.avatar__image}>
        <img
            style={{ 
                width: '50px',
                height: '50px', 
                borderRadius: '50%' 
            }} 
            src="https://avatars.githubusercontent.com/u/42283073"
            alt={user.name} />
        <h2 style={{ 
            fontSize: '1.2rem',
             }}
        >{user.ciudad} - {user.name}</h2>
    </div>
  )
}