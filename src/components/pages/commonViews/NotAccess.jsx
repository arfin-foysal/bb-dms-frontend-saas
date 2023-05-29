import React from 'react'
import { Link } from 'react-router-dom'
import forbidden from '../../../assets/images/forbidden.png'

const NotAccess = () => {
  return (
    <>
      <div className='text-center p-5'>
        <div>
          <img width="400px" src={forbidden} alt="" />
      </div >
      <Link to="/dashboard" className="btn btn-dark btn-sm">&larr; Back to Dashboard</Link>
  </div>
    </>
  )
}

export default NotAccess