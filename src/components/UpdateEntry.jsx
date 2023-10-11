import React, { useState } from 'react'


const UpdateEntry = ({ entry, updateEntry }) => {
  const [content, setContent] = useState(`${entry.content}`)
  const [category, setCategory] = useState(`${entry.category.name}`)

  function handleSubmit(event){
    event.preventDefault()
    updateEntry(entry._id, category, content)  
  }
  return (
    <>
      <hr className="hr hr-blurry" />
      <h5>Update Entry Details for Entry {entry._id}</h5>
      <p>Please update the fields below to reflect the changes you would like to make to the book</p>
      <section className="form">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Content">
            Content: 
          </label>
          <input 
            value={content}
            onChange={(event) => setContent(event.target.value)}
            type="text"
            id="content"              
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Category">
            Category: 
          </label>
          <input 
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            type="text"
            id="category"              
            required
          />
        </div>
        <button className="btn btn-primary mt-3">Update Entry Details</button>
        </form>
      </section>
    </>
  )
}

export default UpdateEntry