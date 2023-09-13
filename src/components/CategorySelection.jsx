import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CategorySelection = () => {
  const [categories, setCategotries] = useState(['Food', 'Climbing', 'Coding', 'Other'])

  return (
    <>
      <h2>Category Selection</h2>
      <h4>Please select a category:</h4>
      <ul> 
        {/* This will map over all of the categories and for each element it will create a new array containing JSX. Each element will be an li with the key set to the index of the array (so that react can efficently refer to a single element). As a child of that we have a link element containing a template string which takes the user to the URL specified for adding a new entry in that specific class. The visible link it also the category. */}
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/new/${category}`}>{category}</Link>
          </li>
        )

        )}
      </ul>
    </>
  )
}

export default CategorySelection