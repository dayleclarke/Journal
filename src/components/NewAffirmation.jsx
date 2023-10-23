import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// Whenever there are attributes passed into a JSX component (in this case addAffirmation) it will collect all the attributes together into an object with key:value pairs. It then passes the object in as a parameter.  In JSX it is called a property or a prop for short. If the props are updated it will immediately update and rerender the New Affirmation component.  Use camelCase for props names. instead of using (props.addAffirmation) we destrcuture the object and used ({ addAffirmation })
const NewAffirmation = ({ addAffirmation }) => {
  const { category } = useParams() // We use the useParams hook to access the category from the URL.
  const [affirmation, setAffirmation] = useState('') // Set up affirmation as a controlled element with an initial value of an empty string. We use this so that the user can dynamically change the value of affirmation.  The useState hook is used to define a state variable named affirmation and a corresponding function setAffirmation to update it. This state variable is intended to hold the content of a new affirmation defined by the user in the text area on line 26. 
  
  function submit(event){
    event.preventDefault()
    addAffirmation(category, affirmation) // Now it doesn't need to know anything else about how the data is stored. We have hidden the functionality from the component. Now when we call this function (passing in the affirmation to add with it's category) it will add the affirmation to the affirmations array. Later if we change the way that the data is stored (when we connect this to a database) the NewAffirmation component will not need to be changed. 
  }
  return (
    <div className="container">
      <h2>New affirmation in the {category} category</h2> 
      <form onSubmit={submit}>
        <div>
          <textarea value={affirmation} onChange={(event) => setAffirmation(event.target.value)} rows="10" className='form-control' required></textarea>
        </div>
        <button className="btn btn-primary mt-3">Create Affirmation</button>
      </form>
    </div>
  )
}
export default NewAffirmation

