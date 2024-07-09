import { createContext, ReactNode, useContext, useReducer } from "react";

export type User = {
    name: string;
    email: string;
    password: string;
    avatar: string;
} | null;

interface AuthContext {
    user?: User;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export type AuthAction =
{
    type: "login";
    payload: User;
} | {
    type: "logout";
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

const initialState = {
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
}

function reducer(state : AuthContext, action: AuthAction) : AuthContext {
    switch (action.type) {
        case "login":
            return {...state, user: action.payload, isAuthenticated: true}
        case "logout":
            return {...state, user: null, isAuthenticated: false}
        default:
            throw new Error("Unknown action type")
    }
}

const FAKE_USER : User = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "A$$w0rd",
    avatar: "https://www.gravatar.com/avatar/"
}

function AuthProvider({children} : {children: ReactNode}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function login(email: string, password: string) {
        //FAKE USER LOGIN
        //INSTEAD OF THIS, YOU WOULD MAKE A REQUEST TO YOUR SERVER
        if (email === FAKE_USER?.email && password === FAKE_USER?.password) {
            dispatch({type: "login", payload: FAKE_USER})
        }

    }

    function logout() {
        dispatch({type: "logout"})
    }

    return <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };