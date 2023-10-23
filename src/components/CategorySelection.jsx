import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import JournalContext from '../context'

const CategorySelection = () => {
  const { dataStore: { categories} } = useContext(JournalContext)
  return (
    <>
      <h2>Category Selection</h2>
      <h4>Please select a category:</h4>
      <ul> 
        {/* This will map over all of the categories and for each element it will create a new array containing JSX. Each element will be an li with the key set to the index of the array (so that react can efficently refer to a single element). As a child of that we have a link element containing a template string which takes the user to the URL specified for adding a new affirmation in that specific class. The visible link it also the category. */}
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/new/${category.name}`}>{category.name}</Link>
          </li>
        )

        )}
      </ul>
    </>
  )
}

export default CategorySelection