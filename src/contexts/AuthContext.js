import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebaseconfig'
import { createUserWithEmailAndPassword ,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
GoogleAuthProvider,
signInWithPopup} from 'firebase/auth'

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    signInWithGoogle: () => Promise
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

    function register(email, password) {
        const registerNewUser = async () => {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const user = res.user;
                console.log(res.user);
                let idToken = await user.getIdToken(true); //true is for refreshing token
                //   callback(idToken);

                // Verify and register user with backend
                const response = await fetch("http://localhost:8000/api1/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${idToken}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                console.log(res);
                return res;
            } 
            catch (e)
             {
                window.alert(e.code);
            }
            
        };
        let res1 = registerNewUser()
        console.log(res1);
        return res1

      


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
    const value = {
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}