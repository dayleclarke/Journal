
import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import ShowEntry from './ShowEntry'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'

// const seedEntries = [
//   { category: 'Food', content: 'Pizza is delicious and a great way to use up left over vegetables' },
//   { category: 'Work', content: "Coding is like a rollercoaster amazing when it works anger provoking when it doesn't" },
//   { category: 'Climbing', content: 'My goal for the end of 2023 is to finish a 25 clean on lead outdoors' },
//   { category: 'Other', content: "I am enough, I'm doing enough and I have enough" },
//   { category: 'Food', content: "My favourite guilty pleasure food is hot chips and ice-cream." },
// ]

const App = () => {
  const [entries, setEntries] = useState([]) // The initial state of the variable will be the seedEntries defined above. This will return an array of elements the first element gets the current value of the state at the time you reference it. The second element is a setting which allows you to change the state. React will then respond to that and update the DOM accordingly. The array is then destructured so that I can access each element seperately.   
  
  const nav= useNavigate() // We can use this to programmatically navigate around our app. 
  const [categories, setCategotries] = useState([])
  
  useEffect(() => {
    async function getCategories(){
      const res = await fetch('http://localhost:4001/categories')
      const data = await res.json()
      setCategotries(data)
    }
    getCategories()
  }, [])

  useEffect(()=> {
    async function fetchEntries(){
      const res = await fetch('http://localhost:4001/entries')
      const data = await res.json()
      setEntries(data)
    }
    fetchEntries()
  }, []) // this will happen every time the component is mounted. But it has no dependencies so nothing else will trigger the useEffect. 
  // HOC (Higher Order Component)
  const ShowEntryWrapper = ()=> { // Create a child component to wrap the ShowEntry component which allows additional functionality to happen before and/or after the component is rendered. It allows us to extract the id from the url to access the entry from the entries array. HOC's can also be used to add error handling. That way we avoid modifying the component itself which makes it more reusable. 
      const { id } = useParams() // We use the useParams hook to access the entryID from the URL. useParams()  returns an object that contains the key-value pairs of all the URL parameters in the current route. { id } is using destructuring assignment to extract a specific property (in this case, id) from the object returned by useParams().
      const current_entry = entries[id] //because we aren't working with a db the id will just be the array index of the entry we wish to display. Entries is taken from line 12. 
      return current_entry ?  <ShowEntry entry={current_entry} deleteEntry={deleteEntry} /> : <h4>Entry not found</h4> // If the entry exists render the entry component. Otherwise display a message indicating the entry was not found. 
  }

  const deleteEntry = async (entryId) => {
      try {
        await fetch(`http://localhost:4001/entries/${entryId}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        });

      } catch (error) {
        console.error('Error deleting entry', error);
      }
      const updatedEntries = entries.filter((entry) => entry._id !== entryId);
      setEntries(updatedEntries);
      nav(`/`)
    };
  const addEntry = async (category, content) => { // A regular function that will add a new entry to the array. 
    const id = entries.length // I have access to the entries array (passed in in line 4). If for example before this new entry was added the list of entries contained 4 elements then this new entry would have an index of 4 (due to the fact indexing starts at 0, 1, 2, 3). I need to make sure I do this before adding the new item otherwise the id would not be the same as the length it would be the length minus one to account for the 0 indexing.   
    // The default behavour when a form is submitted is to reload/refresh the page so we need to prevent the default behaviour
    //Here we are going to create a new object containing the new entry. 
    //const categoryObject = categories.find(cat => cat.name === category) // iterate over the categories array and call a callback function for each element. Find the element that have the same category name as the category passed in.  
    // Add new entry
    const newEntry = {
      category: category,  // category comes from the URL declared as a variable in line 7. 
      content: content // entry comes from entry state that was entered by the user in the text area. 
    }
    //We want to keep everything that is already in the array and add a new entry onto the end. We create a new array consisting of the exsiting entries 
    // Post new entry to the API
    const returnedEntry = await fetch('http://localhost:4001/entries', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(newEntry)
    }) // the content type tells the API/server that I am sending it JSON data so that express will pick it up and parse it appropriately. The accept header applies to the incoming response. It tells fetch what it should expect to receive as a response to that request. You only need the quotes if the header is multi-word or seperated by hyphens. 
    const data = await returnedEntry.json()
    setEntries([...entries, data]) // setter's must be replaced rather than updated.
    nav(`/entry/${id}`) // Here I call nav and pass it the URL I want to navigate to. ID is the parameter I defined in line 11. 
  }
// // React components must return JSX and cannot return siblings. Everything must be returned with a parent (e.g. wrapped in a fragment or a div). A fragment <> </> can be used to group the elements without creating a DOM element. It's like an anonymous tag. It doesn't render anything to the DOM it is just used to satisfy Reacts requirement that there is only one root node.
// Front end and back end routes are not the same. 
  return (
    <>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home entries={entries}/>}/>
          <Route path='/category' element={<CategorySelection categories={categories}/>} />
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

