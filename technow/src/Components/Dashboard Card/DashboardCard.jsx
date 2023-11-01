import React from 'react'
import styles from "./DashboardCard.module.css"
import { News } from './DashboardApi'

const DashboardCard = () => {
  return (
    
         
        <div className={styles.Heroo}>
         {News.map(newsItem => (
          <div className={styles.Hero} key={newsItem.id}>
               <h4 className={styles.h4}>{newsItem.title}</h4>
                <div className={styles.DashboardBottom}>
             <p className={styles.p}>Author: {newsItem.author} / {newsItem.date} <span>{newsItem.someProperty}</span></p>
              </div>
            </div>
))}


            
            </div>

        
  )
}

export default DashboardCard