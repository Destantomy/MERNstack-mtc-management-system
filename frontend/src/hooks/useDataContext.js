import { DataContext } from "../context/dataContext";
import { useContext } from "react";

export const useDataContext = () => {
    const context = useContext(DataContext)

    if (!context) {
        throw Error('useDataContext must be use inside DataContextProvider')
    }

    return context
}