import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../node_modules/react-bootstrap/Spinner'
import Alerts from '../../node_modules/react-bootstrap/Alert'

const Details = () => {

  const { id } = useParams()
  const [ name, setName ] = useState('')
  const [ facility, setFacility ] = useState('')
  const [ issue, setIssue ] = useState('')
  const [ status, setStatus ] = useState('')
  const [ error, setError ] = useState(null)
  const [ unique, setUnique ] = useState(null)
  const [ isPending, setPending ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    let result = await fetch('http://localhost:8080/api/datalog/' + id)
    result = await result.json()
    setName(result.name)
    setFacility(result.facility)
    setIssue(result.issue)
    setStatus(result.status)
  }

  const update = async (e) => {
    e.preventDefault()
      setPending(true)
      const datalog = {name, facility, issue, status}
      const response = await fetch('/api/datalog/' + id, {
        method: 'PUT',
        body: JSON.stringify(datalog),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        setPending(false)
        setUnique('Name already exist !')
      }
      if (response.ok) {
        setError(null)
        setUnique('')
        setPending(false)
        navigate('/')
      }
  } 

  const remover = async () => {
    const response = await fetch('/api/datalog/' + id, {
      method: 'DELETE'
    })
    // const json = await response.json()
    if (response.ok) {
      // dispatch({type: 'delete_datalog', payload: json})
      navigate('/')
    }
  }

  return (
    <div className='create'>
    <form className='form' onSubmit={update} >
      <p>Update issue</p>
      <label>Name</label>
      <input type='text' autoFocus required
      value={name}
      onChange={(e) => setName(e.target.value)}
      >
      </input>

      <label>Facility</label>
      <input type='text' required
      value={facility}
      onChange={(e) => setFacility(e.target.value)}>
      </input>

      <label>Issue</label>
      <textarea type='text' required
      value={issue}
      onChange={(e) => setIssue(e.target.value)}
      >
      </textarea>

      <label>Status</label>
      <select required
      value={status}
      onChange={(e) => setStatus(e.target.value)}>
        <option value='' disabled>Select Status</option>
        <option value='MAINTENANCE' disabled>Maintenance</option>
        <option value='DONE'>Done</option>
      </select>
      <div className="action-update">
      {!isPending && <button>UPDATE</button>}
      {isPending && <button disabled> <Spinner /> </button>}
      </div>
    </form>
    <button onClick={remover}>Delete</button>
    {error && <div className='error'><Alerts variant='danger'>{unique}</Alerts></div>}
    </div>
  )
}

export default Details
