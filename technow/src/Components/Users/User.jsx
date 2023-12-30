import React from 'react'
import GitHub from '../../Assets/Images/github.png'
import {Link} from 'react-router-dom'
import person from '../../Assets/Images/mobile.png'
import style from '../Users/User.module.css'
const User = ({user:{firstName,lastName,description,image}},link) => {
  return (
    <div className={style.cardUser}>
      <img src={`${process.env.REACT_APP_API}/${image}`} width={100} height={100} alt={`${firstName} ${lastName}`} className={style.imageUser}/>
      <p className={style.userName}>{firstName} {lastName}</p>
      <p className={style.description}>{description}</p>
      <nav className={style.navigation}>
        <Link>See profile</Link>
        <a href={link}><img src={GitHub} alt='Github' width={20} height={20}/></a>
      </nav>
    </div>
  )
}

export default User
