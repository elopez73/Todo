import { createContext,useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { loggedIn: action.payload.loggedIn, user: action.payload.user[0] }
        case 'LOGOUT':
            return { loggedIn:false,user: null }
        default:
            return state
}
}

export const AuthContextProvider = ({children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        loggedIn: sessionStorage.getItem("loggedIn"),
        user: sessionStorage.getItem("user")
    })
    return (
        <AuthContext.Provider value ={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
