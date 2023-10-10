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
    <>
    {/* Everything is wrapped in a fragment so that we can return multi line JSX. */}
      <h2>New entry in the {category} category</h2>  {/* Here we are dynamically displaying category (which came from the URL declared on line 5) */}
      <form onSubmit={submit} className='container'> {/* This is an HTML <form> element. In React, it's represented as JSX. A form is used to collect user input and submit it for processing.This onSubmit attribute specifies an event handler function (in this case the submit function defined on line 8-18) called when the form is submitted. This means that when the user submits the form (e.g., by pressing Enter or clicking a submit button inside the form), the submit function will be executed. The className attribute is used to specify one or more CSS classes for an element. The 'container' class is used in Bootstrap for layout purposes to set the form's width and centers its content on the page. */}
        <div>
        {/* Here we are binding the value of the entry field to the State of Entry. If entry changes anywhere in the app the entry field will change too. The onChange event excepts the event object (with details about the change that took place). Then it calls setEntry and sets the entry value to what was typed into this field by the user. Target is the object that raised the event in this case the textarea. Value will retrieve the value of the state and display it in the text area. OnChange is needed to update the state when the user changes what is in the text area */}
          <textarea value={entry} onChange={(event) => setEntry(event.target.value)} rows="10" className='form-control'></textarea>
        </div>
        <button className="btn btn-primary mt-3">Create Entry</button>
      </form>
    </>
  )
}

export default NewEntry

