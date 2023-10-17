import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// Whenever there are attributes passed into a JSX component (in this case addEntry) it will collect all the attributes together into an object with key:value pairs. It then passes the object in as a parameter.  In JSX it is called a property or a prop for short. If the props are updated it will immediately update and rerender the New Entry component.  Use camelCase for props names. instead of using (props.addEntry) we destrcuture the object and used ({ addEntry })
const NewEntry = ({ addEntry }) => {
  const { category } = useParams() // We use the useParams hook to access the category from the URL.
  const [entry, setEntry] = useState('') // Set up entry as a controlled element with an initial value of an empty string. We use this so that the user can dynamically change the value of entry.  The useState hook is used to define a state variable named entry and a corresponding function setEntry to update it. This state variable is intended to hold the content of a new entry defined by the user in the text area on line 26. 
  
  function submit(event){
    event.preventDefault()
    addEntry(category, entry) // Now it doesn't need to know anything else about how the data is stored. We have hidden the functionality from the component. Now when we call this function (passing in the entry to add with it's category) it will add the entry to the entries array. Later if we change the way that the data is stored (when we connect this to a database) the NewEntry component will not need to be changed. 
  }
  return (
    <div className="container">
      <h2>New entry in the {category} category</h2> 
      <form noValidate onSubmit={submit}>
        <div>
          <textarea value={entry} onChange={(event) => setEntry(event.target.value)} rows="10" className='form-control' required></textarea>
        </div>
        <button className="btn btn-primary mt-3">Create Entry</button>
      </form>
    </div>
  )
}
export default NewEntry

