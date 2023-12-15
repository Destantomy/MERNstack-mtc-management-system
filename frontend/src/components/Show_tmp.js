import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Show_tmp = ({datalog}) => {

    const [element, setElement] = useState(2)
    const [isLoad, setLoad] = useState(false)
    const [isEmpty, setEmpty] = useState(false)
    const load = () => {
      setElement(element + 2)

      if (datalog.length === 0) {
        setEmpty(true)
      }

      if (element <= datalog.length) {
        setLoad(false)
      } else {
        setLoad(true)
      }

    }
    
    const slice = datalog.slice(0, element)

  return (
    <div className='show'>
        {slice.map((data) => (
            <div className='show-list'>
              <table>
              <Link to={`/detail/${data._id}`}>
                <tr>
                  <td>Register ID</td>
                  <td>:</td>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <td>Facility</td>
                  <td>:</td>
                  <td>{data.facility}</td>
                </tr>
                <tr>
                  <td>Issue</td>
                  <td>:</td>
                  <td>{data.issue}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>{data.status}</td>
                </tr>
                <tr>
                  <td>Created at</td>
                  <td>:</td>
                  <td>{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</td>
                </tr>
                <tr>
                  <td>Updated at</td>
                  <td>:</td>
                  <td>{formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}</td>
                </tr>
              </Link>
              </table>
              <div className="copyright">&copy;destantomy</div>
            </div>
        ))}
        {isEmpty && <div className='max-loadmore'>No data inserted yet</div>}
        {!isLoad && <button onClick={load} className='btn-loadmore'>Load more</button>}
        {isLoad && <p onClick={load} className='max-loadmore'>Reached maximum pages</p>}
        
    </div>
  )
}

export default Show_tmp
