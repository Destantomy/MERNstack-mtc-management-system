import React, {useEffect, useState} from 'react'
import { useDataContext } from '../hooks/useDataContext'
import Show from '../components/Show'

const Create = () => {
  const {data, dispatch} = useDataContext()
  const [name, setName] = useState('')
  const [facility, setFacility] = useState('')
  const [issue, setIssue] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setPending] = useState(false)

  const handler = async(e) => {
    e.preventDefault()
    setPending(true)
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
      setPending(false)
    }
    if (response.ok) {
      setName('')
      setFacility('')
      setIssue('')
      setError(null)
      setPending(false)
      console.log('created data', json)
      dispatch({
        type: 'createData',
        payload: json,
      })
    }
  }

  // useEffect(() => {
  //   const fetch_data = async () => {
  //     const response = await fetch('/api/datalog')
  //     const json = await response.json()
  //     if (response.ok) {
  //       dispatch({type: 'setData', payload: json})
  //     }
  //   }
  //   fetch_data();
  // })

  return(
    <div className="create_page">
    <form className='create' onSubmit={handler}>
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
      {!isPending && <button>POST</button>}
      {isPending && <button disabled>POSTING ...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
      
        <div className='show'>
          {data && data.map((d) => (
          <Show key={d._id} data={d} />
          ))}
        </div>
    </div>
  )
}

export default Create
