import React from 'react'
import { Link } from 'react-router-dom'


const Home = ({ entries }) => {
  return (
    <>
    <h2>Journal Entries</h2>
      {entries.map((entry, index) => ( // Multi line JSX needs to be wrapped in parentheses. With a single line arrow function we don't need curly brackets and a return statement. Having the parentheses makes this a single line statement which is why they have been ommited. 
        <p key={index}>
          <Link to={`entry/${index}`}>{entry.category}</Link>
          -{entry.content}
        </p>
    ))}
    </>
  )
}

export default Home