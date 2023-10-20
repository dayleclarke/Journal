import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import JournalContext from '../context'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const { dataStore: { entries, categories } } = useContext(JournalContext);
  const navigateTo = useNavigate();

  return (
    <div className="container">
      <h2>Affirmations</h2>
      <div className="row row-cols-1 row-cols-lg-2">
      {categories.length ? (
        categories.map((category) => (
          <div className="col" key={category._id}>
            <div className="border border-primary border-3 border-opacity-50 rounded-2 p-3 m-1" >
            <h4>{category.name}</h4>
            {entries.length ? (
              <ul>
                {entries.map((entry) => {
                  // Check if the category name matches the current category
                  if (entry.category.name === category.name) {
                    return (
                      <li key={entry._id}>
                        {/* Display the content or other details of the "Career" entries */}
                        <p>{entry.content}</p>
                      </li>
                    );
                  }
                  // If the category name doesn't match, return null (or omit the "else" part).
                  return null;
                })}
              </ul>
            ) : (
              <p>Loading affirmations...</p>
            )}
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigateTo(`/new/${category.name}`)}
            >
              Add {category.name} Affirmation
            </button>
            </div>
            
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
      </div>
    </div>
  );
};

export default Home;