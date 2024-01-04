import React from 'react'
import GitHub from '../../Assets/Images/github.png'
import {Link} from 'react-router-dom'
import style from '../Users/User.module.css'
import {Avatar} from '@mui/material'
const User = ({user:{firstName,lastName,description,image,Link:link}}) => {
  return (
    <div className={style.cardUser}>
      <Avatar src={`${process.env.REACT_APP_API}/${image}`}  alt={`${firstName} ${lastName}`} className={style.imageUser}/>
      <p className={style.userName}>{firstName} {lastName}</p>
     {(description==null)?'' :<p className={style.description}>{description}</p>}
      <nav className={style.navigation}>
        <Link to='/profile'>See profile</Link>
        {(link==null) ? '' : <a href={link} target="_blank" rel="noopener noreferrer"><img src={GitHub} alt='Github' width={20} height={20}/></a>}
      </nav>
    </div>
  )
}

export default User
