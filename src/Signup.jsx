import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./Firebase";
import { useState } from "react";


export function Signup({userToSet}) {

    const provider = new GoogleAuthProvider();
    

    function handleSignIn() {
        signInWithPopup(auth, provider)
         .then((result) => {
            userToSet(result.user);
            console.log("User signed in:", result.user);
        })
        .catch((error) => {
        console.error("Error signing in:", error);
    });

}

    return (
        <div>
            <button onClick={handleSignIn} className="text-sm min-h-8 bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300">Sign in with Google</button>  
        </div>
    
    );
}