import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebaseconfig'

import { createUserWithEmailAndPassword ,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
GoogleAuthProvider,
sendPasswordResetEmail,
confirmPasswordReset,
signInWithPopup} from 'firebase/auth'

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    signInWithGoogle: () => Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUSer] = useState(null)

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,user=>{
            setCurrentUSer(user)
        })

        return()=>{
            unsubscribe()
        }
    },[])

   const register =  (email,password) =>{
    
    return createUserWithEmailAndPassword(auth, email, password);

    }
    

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logout(){
        return signOut(auth)
    }

    function signInWithGoogle(){
        const provider =new GoogleAuthProvider()
        return signInWithPopup(auth,provider)
    }
    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email, {
          url: `http://localhost:3000/login`,
        })
      }
    
      function resetPassword(oobCode, newPassword) {
        return confirmPasswordReset(auth, oobCode, newPassword)
      }

    const value = {
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle,
        forgotPassword,
        resetPassword,
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}