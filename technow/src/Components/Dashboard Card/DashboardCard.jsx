import axios from "axios"
import styles from "./DashboardCard.module.css"
import {FaTrashCan} from 'react-icons/fa6'
import {FiEdit} from 'react-icons/fi'
import { Link } from "react-router-dom"
import { useState } from "react"

const DashboardCard = ({author , date , title , _id}) => {
  const formatDate = (date) => {
    const dateOnly = date.split('T')[0];
    const [year, month, day] = dateOnly.split('-');
    return `${day}-${month}-${year}`;
}

const [errorDelete , setErrorDelete] = useState(false)

const handleDelete = (id , e) => {
  e.preventDefault();
  axios.delete('http://localhost:5000/delete/news' , {data : {id : _id}})
  .then((response)=>{
    if(response.ok){
      setErrorDelete(false)
    }
  })
  .catch((error) => {
    setErrorDelete(true)
  })
}

const errorStyle = {
  fontSize : 14,
  color : "red" ,
  margin : 0 ,
  padding : 0
}
  return (
    <div className={styles.Heroo}>
        <div className={styles.Hero}>
        <Link to={`/newsletterDetails/${_id}`}>
          <h4 className={styles.h4}>{title}</h4>
          </Link>
          <div className={styles.DashboardBottom}>
            <p className={styles.p}>{author} / {formatDate(date)} 
              <span className={styles.span}>
              {errorDelete && <p style={errorStyle}>Error deleting news</p>}
                <button className={styles.btn} onClick={(e) => handleDelete(_id , e)} ><FaTrashCan className={styles.icon}/></button>
                <Link to={`/newsletterUpdate/${_id}`}><FiEdit className={styles.icon}/></Link>
              </span>
            </p>
          </div>
        </div>
    </div>
  )
}

export default DashboardCard