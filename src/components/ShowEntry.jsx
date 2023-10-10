

// used to display a single entry. Components should ideally only do one thing as we want to seperate concerns. Then we combine those together in different ways to get the functionality that we need. 
import React from 'react'


const ShowEntry = ({ entry, deleteEntry }) => { //pass through the entry as a prop that came from the ShowEntryWrapper HOC so that the component can display the contents of the entry. This will just be the object containing the entry we want to display with the category and content.

  const handleDeleteClick = () => {
    deleteEntry(entry._id);
  };

  return (
    <>
      <h5>{entry.content}</h5>
      <p>Posted in {entry.category.name}</p>
      <button className="btn btn-primary mt-3" onClick={handleDeleteClick}>
        Delete Entry
      </button>
    </>
  )
}

export default ShowEntry
