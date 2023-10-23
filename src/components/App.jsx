
import React, { useEffect, useReducer } from 'react'
import NavBar from './NavBar'
import Header from './Header'

import Home from './Home'
import Affirmations from './Affirmations'

import CategorySelection from './CategorySelection'
import NewAffirmation from './NewAffirmation'
import ShowAffirmation from './ShowAffirmation'
import Register from './Register'
import Login from './Login'

import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import reducer from '../reducer'
import JournalContext from '../context'
import Footer from "./Footer"


const initialState = { 
  affirmations: [],
  categories: []
}

const App = () => {
  
  const [dataStore, dispatch ] = useReducer(reducer, initialState) // The useReducer hook takes two arguments: a reducer function and the initial state of the entire application (all props that are dynamically added or changed). The reducer function is responsible for updating the state based on the dispatched actions. The returned value from useReducer is an array containing the current state and a dispatch function to trigger state updates. This is a function provided by useReducer that allows you to send actions to the reducer function, which in turn updates the state. When you call dispatch with an action, it triggers the reducer function, and the state can be updated based on the action type and payload.
  const { affirmations, categories } = dataStore // affirmations and categories properties are extracted from the dataStore state. Now when we want to access the current state of affirmations we can just use "affirmations" rather than dataStore.affirmations. 
  
  const nav= useNavigate() // We can use this to programmatically navigate around our app. 

  useEffect(()=> {
    async function fetchAffirmations(){
      const res = await fetch('http://localhost:4001/affirmations')
      const data = await res.json()
      dispatch({
        type: 'setAffirmations',
        affirmations: data
    }) 
    }
    fetchAffirmations()
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
  const ShowAffirmationWrapper = ()=> { // Create a child component to wrap the ShowAffirmation component which allows additional functionality to happen before and/or after the component is rendered. It allows us to extract the id from the url to access the affirmation from the affirmations array. HOC's can also be used to add error handling. That way we avoid modifying the component itself which makes it more reusable. 
      const { id } = useParams() // We use the useParams hook to access the affirmationID from the URL. useParams()  returns an object that contains the key-value pairs of all the URL parameters in the current route. { id } is using destructuring assignment to extract a specific property (in this case, id) from the object returned by useParams().
      const current_affirmation = affirmations.find(affirmation => affirmation._id === id);
      return current_affirmation ?  <ShowAffirmation affirmation={current_affirmation} updateAffirmation={updateAffirmation} /> : <h4>Affirmation not found</h4>
  }
    const updateAffirmation = async (affirmationId, category, content) => {
      const updatedAffirmation = {
        category: category, 
        content: content  
      }
      try {
        const returnedAffirmation= await fetch(`http://localhost:4001/affirmations/${affirmationId}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(updatedAffirmation)
        });
        const data = await returnedAffirmation.json()
        // const otherAffirmations = affirmations.filter((affirmation) => affirmation._id !== affirmationId);
        dispatch({
          type: 'updateAffirmation',
          updatedAffirmation: data
        }) 
        //setAffirmations(...otherAffirmations, data);
        nav(`/affirmation/${data._id}`)

      } catch (error) {
        console.error('Error updating affirmation', error);
      }
    };
  const addAffirmation = async (category, content) => { // A regular function that will add a new affirmation to the array. 
    // Add new affirmation
    const newAffirmation = {
      category: category,  // category comes from the URL declared as a variable in line 7. 
      content: content // affirmation comes from affirmation state that was entered by the user in the text area. 
    }
    //We want to keep everything that is already in the array and add a new affirmation onto the end. We create a new array consisting of the exsiting affirmations 
    // Post new affirmation to the API
    const returnedAffirmation = await fetch('http://localhost:4001/affirmations', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(newAffirmation)
    }) // the content type tells the API/server that I am sending it JSON data so that express will pick it up and parse it appropriately. The accept header applies to the incoming response. It tells fetch what it should expect to receive as a response to that request. You only need the quotes if the header is multi-word or seperated by hyphens. 
    const data = await returnedAffirmation.json()
    //setAffirmations([...affirmations, data]) // setter's must be replaced rather than updated.
    dispatch({
      type: 'addAffirmation',
      newAffirmation: data
    }) // This triggers a call to the reducer function, React automatically passes in the current state as an implicit parameter and the second object (with type and newAffirmation) here as the action.
    nav(`/affirmation/${data._id}`) // Here I call nav and pass it the URL I want to navigate to. ID is the parameter I defined in line 11. 
  }
  return (
    <JournalContext.Provider value={{dataStore, dispatch}}>
        <NavBar />
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/affirmations' element={<Affirmations />}/>
          <Route path='/category' element={<CategorySelection />} />
          <Route path='/affirmation/:id' element={<ShowAffirmationWrapper />} /> 
          <Route path='/new/:category' element={<NewAffirmation addAffirmation={addAffirmation} />} />
          <Route path='*' element= {<h4>Page not found!</h4>} />
        </Routes>
        <Footer />
    </JournalContext.Provider>
  )
}
export default App

