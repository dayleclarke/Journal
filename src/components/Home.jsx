import React from 'react'
import { Link } from 'react-router-dom'

// If state of a prop changes it will trigger a rerender of the component. 
const Home = ({ entries }) => {
  return (
    <>
    <h2>Journal Entries</h2> 
      {entries.map((entry, index) => ( // The {} indicated that this is an embeded JavaScript expression. Use {} whenever you want to embed JS into JSX.  Multi line JSX needs to be wrapped in parentheses. With a single line arrow function we don't need curly brackets and a return statement. Having the parentheses makes this a single line statement which is why they have been ommited. Here we are mapping over each entry in the entries array with each entry and it's index we will map that to a block of JSX. This will produce a new array and each element will contain a block of JSX code. For each entry we will create a paragraph. We provide a unique key so that React knows which entry to update. Without the key it would need to rerender the entire list.  Each parahraph will contain a link component with a link to the route for displaying that single entry. I can't used a regular <a> tag because that would reload the page which we don't want. We want to to swap out components rather than rerender the entire page. 
        <p key={index}>
          <Link to={`entry/${index}`}>{entry.category.name}</Link>
          - {entry.content}
        </p>
    ))}
    </>
  )
}

export default Home