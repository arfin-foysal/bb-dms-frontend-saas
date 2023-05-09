import React from 'react'
import { Link } from 'react-router-dom'

const NotAccess = () => {
  return (
    <>
      <div className='text-center p-5'>
      <div>Not Access</div>
      <Link to="/dashboard"><button className='btn btn-info'>Dashborad</button> </Link>
  </div>
    </>
  )
}

export default NotAccess