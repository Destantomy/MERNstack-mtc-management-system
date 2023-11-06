import React from 'react'
import { useDataContext } from '../hooks/useDataContext'

const Show = ({data}) => {
  
  const { dispatch } = useDataContext()

  const handclick = async () => {
    const response = await fetch('/api/datalog/' + data._id, {
      method: 'delete'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'deleteData', payload: json})
    }
  }

  return (
    <div className='data-list'>
        <p>Register id: {data.id}</p>
        <p>Name: {data.name}</p>
        <p>Facility: {data.facility}</p>
        <p>Issue: {data.issue}</p>
        <button onClick={handclick}>X</button>
    </div>
  )
}

export default Show
