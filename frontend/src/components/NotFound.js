import React from 'react'
import Alerts from '../../node_modules/react-bootstrap/Alert'

const NotFound = () => {
  return (
    <div className='not-found'>
      <Alerts variant='warning'><h1>404 Not Found <br/>You must lost! Let's back to earth!</h1>&copy; destanto my</Alerts>
    </div>
  )
}

export default NotFound
