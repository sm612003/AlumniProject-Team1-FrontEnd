import React, { useEffect, useState } from 'react'
import User from './User'
import axios from 'axios'
import style from './Users.module.css'
function Users() {
  const [users, setUsers] = useState([])
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {

    const fetchingUsers = async () => {
      const data = await axios.get(`${process.env.REACT_APP_API}/user/view-all`)
      console.log('Hellooo', data.data)
      setUsers(data.data.Users)
      setIsLoading(false)
    }

    fetchingUsers()
  }, [])

  return (
    <div>
      {isloading ? <div>Loading....</div>
        : <div className={style.usersContainer}>{users.map(user => <User user={user} link={user.Link} />)}</div>
      }
    </div>
  )
}

export default Users
