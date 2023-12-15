import React from 'react'
import Show from '../components/Show_tmp'
import useFetch from '../handling/useFetch'
import Spinner from '../../node_modules/react-bootstrap/Spinner'

const Home = () => {
  const { error, isPending, datalog } = useFetch('https://mer-nstack-mtc-management-system.vercel.app/api/datalog/')
  // console.log(datalog)

  return (
    <div className='home'>
      {error && <div>{error}</div>}
      {isPending && <div className='spinner'><Spinner variant='primary' /></div>}
      {datalog && <Show datalog={datalog} />}
    </div>
  )
}

export default Home