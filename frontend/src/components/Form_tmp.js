import React, { useEffect, useState } from 'react'
import { useDataContext } from '../hooks/useDataContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../node_modules/react-bootstrap/Spinner'
import Alerts from '../../node_modules/react-bootstrap/Alert'

const Form_tmp = () => {

    const { dispatch } = useDataContext()
    const [ name, setName ] = useState('')
    const [ facility, setFacility ] = useState('')
    const [ issue, setIssue ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ error, setError ] = useState(null)
    const [ unique, setUnique ] = useState(null)
    const [ isPending, setPending ] = useState(false)
    const navigate = useNavigate()
  
    const handler = async(e) => {
      e.preventDefault()
      setPending(true)
      const datalog = {name, facility, issue, status}
      const response = await fetch('https://render-c1agcvp79-destas-projects.vercel.app/api/datalog', {
        method: 'POST',
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
        setName('')
        setFacility('')
        setIssue('')
        setStatus('')
        setError(null)
        setUnique('')
        setPending(false)
        navigate('/')
        console.log('created datalog', json)
        dispatch({
          type: 'create_datalog',
          payload: json,
        })
      }
    }

    useEffect(() => {
    const fetch_data = async () => {
      const response = await fetch('/api/datalog')
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'set_datalog', payload: json})
      }
    }
    fetch_data();
  })

  return (
    <div className='create'>
    <form className='form' onSubmit={handler}>
      <p>Post new issue</p>
      <label>Name</label>
      <input type='text' autoFocus required
      onChange={(e) => setName(e.target.value)}
      value={name}>
      </input>

      <label>Facility</label>
      <input type='text' required
      onChange={(e) => setFacility(e.target.value)}
      value={facility}>
      </input>

      <label>Issue</label>
      <textarea type='text' required
      onChange={(e) => setIssue(e.target.value)}
      value={issue}>
      </textarea>

      <label>Status</label>
      <select required
      value={status}
      onChange={(e) => setStatus(e.target.value)}>
        <option value='' disabled>Select Status</option>
        <option value='MAINTENANCE'>Maintenance</option>
        <option value='DONE' disabled>Done</option>
      </select>

      {!isPending && <button>POST</button>}
      {isPending && <button><Spinner variant='primary' /></button>}
      {error && <div className='error'><Alerts variant='danger'>{unique}</Alerts></div>}
    </form>
    </div>
  )
}

export default Form_tmp
