import React, { useEffect, useState,lazy, Suspense  } from 'react'
import axios from 'axios'
import style from './Users.module.css'
const User = lazy(() => import('./User'));
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
        :    <div className={style.usersContainer}>
        <Suspense fallback={<div>Loading User...</div>}>
          {users.map(user => <User key={user.id} user={user} />)}
        </Suspense>
      </div>
      }
    </div>
  )
}

export default Users
