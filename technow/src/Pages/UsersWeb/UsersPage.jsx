import React from 'react'
import Users from '../../Components/Users/Users'
import style from './UsersPage.module.css'
import { Helmet } from 'react-helmet';

const structuredData = {
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "technow",
  "url": `${process.env.REACT_APP_API}/users`,
};
const UsersPage = () => {
  return (
    <div className={style.container}>
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Users of techNow news letter" />

        {/*   JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <h1 className={style.h1}>Users</h1>
      <Users />
    </div>
  )
}

export default UsersPage
