import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import JournalContext from '../context'


const Home = () => {
  const { dataStore: { entries} } = useContext(JournalContext) // nested distructuring. 

  return (
    <>
    <h2>Journal Entries</h2> 
    {entries.length ? (
        <section>
          {entries.map(item => (
            <p key={item.id}>
              <Link to={`entry/${item._id}`}>{item.category.name}</Link>
              -{item.content}</p>
          ))}
        </section>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  )
}

export default Home