
import React, { useState } from 'react'
import NavBar from './NavBar'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import ShowEntry from './ShowEntry'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'

const seedEntries = [
  { category: 'Food', content: 'Pizza is delicious and a great way to use up left over vegetables' },
  { category: 'Work', content: "Coding is like a rollercoaster amazing when it works anger provoking when it doesn't" },
  { category: 'Climbing', content: 'My goal for the end of 2023 is to finish a 25 clean on lead outdoors' },
  { category: 'Other', content: "I am enough, I'm doing enough and I have enough" },
  { category: 'Food', content: "My favourite guilty pleasure food is hot chips and ice-cream." },
]

const App = () => {
  const [entries, setEntries] = useState(seedEntries)
  // HOC (Higher Order Component)
  
  const nav= useNavigate() // We can use this to programmatically navigate around our app. 
  const ShowEntryWrapper = ()=> { // Create a child component to wrap the ShowEntry component which allows additional functionality to happen before and/or after the component is rendered. It allows us to extract the id from the url to access the entry from the entries array. HOC's can also be used to add error handling. That way we avoid modifying the component itself which makes it more reusable. 
    const { id } = useParams() // We use the useParams hook to access the entryID from the URL. useParams()  returns an object that contains the key-value pairs of all the URL parameters in the current route. { id } is using destructuring assignment to extract a specific property (in this case, id) from the object returned by useParams().
    const current_entry = entries[id] //because we aren't working with a db the id will just be the array index of the entry we wish to display. Entries is taken from line 12. 
    return current_entry ?  <ShowEntry entry={current_entry} /> : <h4>Entry not found</h4> // If the entry exists render the entry component. Otherwise display a message indicating the entry was not found. 
  } 

  const addEntry = (category, content) => { // A regular function that will add a new entry to the array. 
    const id = entries.length // I have access to the entries array (passed in in line 4). If for example before this new entry was added the list of entries contained 4 elements then this new entry would have an index of 4 (due to the fact indexing starts at 0, 1, 2, 3). I need to make sure I do this before adding the new item otherwise the id would not be the same as the length it would be the length minus one to account for the 0 indexing.   
    // The default behavour when a form is submitted is to reload/refresh the page so we need to prevent the default behaviour
    //Here we are going to create a new object containing the new entry. 
    const newEntry = {
      category: category,  // category comes from the URL declared as a variable in line 7. 
      content: content // entry comes from entry state that was entered by the user in the text area. 
    }
    //We want to keep everything that is already in the array and add a new entry onto the end. We create a new array consisting of the exsiting entries 
    setEntries([...entries, newEntry]) // setter's must be replaced rather than updated.
    nav(`/entry/${id}`) // Here I call nav and pass it the URL I want to navigate to. ID is the parameter I defined in line 11. 
  }

  return (
    <>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home entries={entries}/>}/>
          <Route path='/category' element={<CategorySelection />} />
          <Route path='/entry/:id' element={<ShowEntryWrapper />} /> 
          {/* Here I have told REACT to render to ShowEntryWrapper which will call the Show Entry component within it. */}
          <Route path='/new/:category' element={<NewEntry addEntry={addEntry} />} />
          {/* Anything prefixed with a colon /: is treated as a restful parameter. Originally we passed entries (the entire array of entries) and set entries to this component as props. The problem with this is that it needed to know too much about how we are storing, representing and updating the data. We don't need to add a HOC because we don't need to do anything before or after new entry is rendered. Instead we need something that is event driven that hides the complexity from new entry but still allows it to execute it in an async way (when the user clicks a button).    */}
          <Route path='*' element= {<h4>Page not found!</h4>} />
        </Routes>
    </>
  )
}
export default App

