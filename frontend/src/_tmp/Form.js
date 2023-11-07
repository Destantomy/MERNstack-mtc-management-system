import React, {useState} from 'react'
import { useDataContext } from '../hooks/useDataContext'

const Form = () => {

    const {dispatch} = useDataContext()
    const [name, setName] = useState('')
    const [facility, setFacility] = useState('')
    const [issue, setIssue] = useState('')
    const [error, setError] = useState(null)

    const handler = async(e) => {
        e.preventDefault()
        const data = {name, facility, issue}
        const response = await fetch('/api/datalog', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setName('')
          setFacility('')
          setIssue('')
          setError(null)
          console.log('created data', json)
          dispatch({
            type: 'CREATE_DATA',
            payload: json,
          })
        }
      }

      return(
        <div className="create_page">
        <form className='create' onSubmit={handler}>
          <p>Add new issue</p>
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
          <input type='text' required
          onChange={(e) => setIssue(e.target.value)}
          value={issue}>
          </input>
          <button>Add</button>
          {error && <div className='error'>{error}</div>}
        </form>
    </div>
    )
}

export default Form
