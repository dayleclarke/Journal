

// used to display a single affirmation. Components should ideally only do one thing as we want to seperate concerns. Then we combine those together in different ways to get the functionality that we need. 
import React, { useContext, useState } from 'react'
import UpdateAffirmation from "./UpdateAffirmation"
import JournalContext from '../context'
import { useNavigate } from 'react-router-dom'


const ShowAffirmation = ({ affirmation, updateAffirmation }) => { //pass through the affirmation as a prop that came from the ShowAffirmationWrapper HOC so that the component can display the contents of the affirmation. This will just be the object containing the affirmation we want to display with the category and content.
  const [showEdit, setShowEdit] = useState(false) 
  const { dispatch } = useContext(JournalContext)
  const navigateTo = useNavigate()

  const handleDeleteClick =  async() => {
      try {
        await fetch(`http://localhost:4001/affirmations/${affirmation._id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        });
    
      } catch (error) {
        console.error('Error deleting affirmation', error);
      }
      dispatch({
        type: 'deleteAffirmation',
        affirmationID: affirmation._id,
    })
    navigateTo(`/`)
  };


  return (
    <div className="container">
      <h5>{affirmation.content}</h5>
      <p>Posted in {affirmation.category.name}</p>
      &nbsp;
      <button className="btn btn-primary mt-3" onClick={handleDeleteClick}>
        Delete Affirmation
      </button> &nbsp;
      <button className="btn btn-primary mt-3" onClick={() => setShowEdit(true)}>
        Update Affirmation
      </button>
      { showEdit ? (
        <div>
          <UpdateAffirmation affirmation={affirmation} updateAffirmation= {updateAffirmation} />
        </div> 
      ) : ("")}
    </div>
  )
}

export default ShowAffirmation
