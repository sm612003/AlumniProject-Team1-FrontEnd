import React from 'react'
import Users from '../../Components/Users/Users'
import style from './UsersPage.module.css'
const UsersPage = () => {
  return (
    <div className={style.container}>
          <h1 className={style.h1}>Users</h1>
      <Users/>
    </div>
  )
}

export default UsersPage
