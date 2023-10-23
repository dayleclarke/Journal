import JournalContext from '../context'
import React, { useState, useEffect, useContext } from 'react'



const UpdateAffirmation = ({ affirmation, updateAffirmation }) => {
  const [content, setContent] = useState(`${affirmation.content}`)
  const [category, setCategory] = useState(`${affirmation.category.name}`)

  function handleSubmit(event){
    event.preventDefault()
    updateAffirmation(affirmation._id, category, content)  
  }
  const { dataStore: { categories} } = useContext(JournalContext)

  return (
    <div className="container">
      <hr className="hr hr-blurry" />
      <h5>Update Affirmation Details for Affirmation {affirmation._id}</h5>
      <p>Please update the fields below to reflect the changes you would like to make to the affirmation shown above.</p>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <textarea 
              value={content}
              onChange={(event) => setContent(event.target.value)}
              type="text"
              id="content"              
              required
              className="form-control" // Add the "form-control" class for Bootstrap styling
              rows="5"
            ></textarea>
            <label htmlFor="Content" className="form-label">
              Content: 
            </label>
          </div>
        <div className="form-floating">
          <select  className="form-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            id="category"              
            required
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="Category" className="form-label">Category:</label>

        </div>
        <button className="btn btn-primary mt-3">Update Affirmation Details</button>
        </form>
      </section>
    </div>
  )
}

export default UpdateAffirmation