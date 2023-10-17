export default function reducer(state, action) { 
  switch (action.type) { 
    case 'setEntries': 
    return { 
      ...state, 
      entries: action.entries,
    }
    case 'addEntry': 
      return { 
        ...state, 
        entries: [...state.entries, action.newEntry] 
      }
    case 'deleteEntry': 
      return { 
        ...state, 
        entries: state.entries.filter((entry) => entry._id !== action.entryID) 
      }
    case 'updateEntry': 
      return { 
        ...state, 
        entries: state.entries.map((entry) => 
          entry._id === action.updatedEntry._id ? action.updatedEntry : entry
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
