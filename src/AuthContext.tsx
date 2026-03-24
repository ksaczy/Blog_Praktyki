import { auth } from "./FirebaseConfig";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {onAuthStateChanged, signOut, User} from "firebase/auth";

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const logout =()=>{
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, loading, logout}}>
            {loading ? "Loading..." : children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("use auth doesn't exist outside AuthProvider");
    }
    return context;
}