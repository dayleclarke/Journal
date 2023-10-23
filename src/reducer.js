export default function reducer(state, action) { 
  switch (action.type) { 
    case 'setAffirmations': 
    return { 
      ...state, 
      affirmations: action.affirmations,
    }
    case 'addAffirmation': 
      return { 
        ...state, 
        affirmations: [...state.affirmations, action.newAffirmation] 
      }
    case 'deleteAffirmation': 
      return { 
        ...state, 
        affirmations: state.affirmations.filter((affirmation) => affirmation._id !== action.affirmationID) 
      }
    case 'updateAffirmation': 
      return { 
        ...state, 
        affirmations: state.affirmations.map((affirmation) => 
          affirmation._id === action.updatedAffirmation._id ? action.updatedAffirmation : affirmation
        ),
      }
    case 'setCategories':
      return { 
        ...state, 
        categories: action.categories,
    }
    default: 
      return state
  }
}
