
// used to display a single entry. Components should ideally only do one thing as we want to seperate concerns. Then we combine those together in different ways to get the functionality that we need. 
import React from 'react'


const ShowEntry = ({ entry }) => { //pass through the entry as a prop that came from the ShowEntryWrapper HOC so that the component can display the contents of the entry. This will just be the object containing the entry we want to display with the category and content.
  return (
    <>
      <h5>{entry.content}</h5>
      <p>Posted in {entry.category}</p>
    </>
  )
}

export default ShowEntry