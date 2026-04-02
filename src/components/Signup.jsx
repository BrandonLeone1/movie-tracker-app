import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/Firebase";

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
            <button onClick={handleSignIn} className="text-sm md:text-lg min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300">Sign in with Google</button>  
        </div>
    
    );
}