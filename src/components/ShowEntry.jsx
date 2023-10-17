

// used to display a single entry. Components should ideally only do one thing as we want to seperate concerns. Then we combine those together in different ways to get the functionality that we need. 
import React, { useContext, useState } from 'react'
import UpdateEntry from "./UpdateEntry"
import JournalContext from '../context'
import { useNavigate } from 'react-router-dom'


const ShowEntry = ({ entry, updateEntry }) => { //pass through the entry as a prop that came from the ShowEntryWrapper HOC so that the component can display the contents of the entry. This will just be the object containing the entry we want to display with the category and content.
  const [showEdit, setShowEdit] = useState(false) 
  const { dispatch } = useContext(JournalContext)
  const navigateTo = useNavigate()

  const handleDeleteClick =  async() => {
      try {
        await fetch(`http://localhost:4001/entries/${entry._id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        });
    
      } catch (error) {
        console.error('Error deleting entry', error);
      }
      dispatch({
        type: 'deleteEntry',
        entryID: entry._id,
    })
    navigateTo(`/`)
  };


  return (
    <div className="container">
      <h5>{entry.content}</h5>
      <p>Posted in {entry.category.name}</p>
      &nbsp;
      <button className="btn btn-primary mt-3" onClick={handleDeleteClick}>
        Delete Entry
      </button> &nbsp;
      <button className="btn btn-primary mt-3" onClick={() => setShowEdit(true)}>
        Update Entry
      </button>
      { showEdit ? (
        <div>
          <UpdateEntry entry={entry} updateEntry= {updateEntry} />
        </div> 
      ) : ("")}
    </div>
  )
}

export default ShowEntry
