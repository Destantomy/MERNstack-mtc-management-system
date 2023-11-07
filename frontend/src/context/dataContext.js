import { createContext, useReducer } from 'react'

export const DataContext = createContext()

export const dataReducer = (state, action) => {
    switch (action.type) {
        case 'set_datalog':
            return {
                datalog: action.payload
            }
        case 'create_datalog':
            return {
                datalog: [action.payload, ...state.datalog]
            }
        case 'delete_datalog':
            return {
                datalog: state.datalog.filter((d) => d._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const DataContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(dataReducer, {
        datalog: null
    })

    return (
        <DataContext.Provider value={{...state, dispatch}}>
        {children}
        </DataContext.Provider>
    )
}
