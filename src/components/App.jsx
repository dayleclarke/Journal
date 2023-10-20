
import React, { useEffect, useReducer } from 'react'
import NavBar from './NavBar'
import Header from './Header'

import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import ShowEntry from './ShowEntry'
import Register from './Register'

import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import reducer from '../reducer'
import JournalContext from '../context'
import Footer from "./Footer"


const initialState = { 
  entries: [],
  categories: []
}

const App = () => {
  
  const [dataStore, dispatch ] = useReducer(reducer, initialState) // The useReducer hook takes two arguments: a reducer function and the initial state of the entire application (all props that are dynamically added or changed). The reducer function is responsible for updating the state based on the dispatched actions. The returned value from useReducer is an array containing the current state and a dispatch function to trigger state updates. This is a function provided by useReducer that allows you to send actions to the reducer function, which in turn updates the state. When you call dispatch with an action, it triggers the reducer function, and the state can be updated based on the action type and payload.
  const { entries, categories } = dataStore // entries and categories properties are extracted from the dataStore state. Now when we want to access the current state of entries we can just use "entries" rather than dataStore.entries. 
  
  const nav= useNavigate() // We can use this to programmatically navigate around our app. 

  useEffect(()=> {
    async function fetchEntries(){
      const res = await fetch('http://localhost:4001/entries')
      const data = await res.json()
      dispatch({
        type: 'setEntries',
        entries: data
    }) 
    }
    fetchEntries()
  }, [])  

  useEffect(() => {
    async function getCategories(){
      const res = await fetch('http://localhost:4001/categories')
      const data = await res.json()
      dispatch({
        type: 'setCategories',
        categories: data
      })
    }
    getCategories()
  }, [])

  
  // HOC (Higher Order Component)
  const ShowEntryWrapper = ()=> { // Create a child component to wrap the ShowEntry component which allows additional functionality to happen before and/or after the component is rendered. It allows us to extract the id from the url to access the entry from the entries array. HOC's can also be used to add error handling. That way we avoid modifying the component itself which makes it more reusable. 
      const { id } = useParams() // We use the useParams hook to access the entryID from the URL. useParams()  returns an object that contains the key-value pairs of all the URL parameters in the current route. { id } is using destructuring assignment to extract a specific property (in this case, id) from the object returned by useParams().
      const current_entry = entries.find(entry => entry._id === id);
      return current_entry ?  <ShowEntry entry={current_entry} updateEntry={updateEntry} /> : <h4>Entry not found</h4>
  }
    const updateEntry = async (entryId, category, content) => {
      const updatedEntry = {
        category: category, 
        content: content  
      }
      try {
        const returnedEntry= await fetch(`http://localhost:4001/entries/${entryId}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(updatedEntry)
        });
        const data = await returnedEntry.json()
        // const otherEntries = entries.filter((entry) => entry._id !== entryId);
        dispatch({
          type: 'updateEntry',
          updatedEntry: data
        }) 
        //setEntries(...otherEntries, data);
        nav(`/entry/${data._id}`)

      } catch (error) {
        console.error('Error updating entry', error);
      }
    };
  const addEntry = async (category, content) => { // A regular function that will add a new entry to the array. 
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
    //setEntries([...entries, data]) // setter's must be replaced rather than updated.
    dispatch({
      type: 'addEntry',
      newEntry: data
    }) // This triggers a call to the reducer function, React automatically passes in the current state as an implicit parameter and the second object (with type and newEntry) here as the action.
    nav(`/entry/${data._id}`) // Here I call nav and pass it the URL I want to navigate to. ID is the parameter I defined in line 11. 
  }
  return (
    <JournalContext.Provider value={{dataStore, dispatch}}>
        <NavBar />
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/register" element={<Register />} />
          <Route path='/category' element={<CategorySelection />} />
          <Route path='/entry/:id' element={<ShowEntryWrapper />} /> 
          <Route path='/new/:category' element={<NewEntry addEntry={addEntry} />} />
          <Route path='*' element= {<h4>Page not found!</h4>} />
        </Routes>
        <Footer />
    </JournalContext.Provider>
  )
}
export default App

