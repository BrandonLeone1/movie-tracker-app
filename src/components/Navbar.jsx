import { useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from "./Signup";
import { signOut } from "firebase/auth";
import { auth } from "../services/Firebase";

export function Navbar({signedInOrNot, setMethod}) {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
        <header className="md:pb-0 bg-zinc-800/85 shadow sticky top-0 z-1000">

            <nav className="flex backdrop-blur-sm items-center justify-between px-8 md:px-10 py-6 w-400 max-w-[95%] m-auto font-[montserrat]">
                
                <div className="">
                    <Link to="/">
                    <h2 className="text-lg uppercase md:text-2xl lg:text-2xl text-white font-semibold font-mono animate-[slideInLeft_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0" onClick={() => setIsOpen(false)}>Movie Tracker</h2>
                    </Link>
                </div>

                <div className="w-5 h-5 relative flex items-center justify-center cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
                    <p className={`text-white lg:hidden text-3xl md:text-4xl cursor-pointer w-5 h-0.75 bg-white after:content-[''] after:block after:w-5 after:h-0.75 after:bg-white relative after:absolute after:top-3 -mt-2  ${isOpen && "after:-rotate-45 after:top-0! rotate-20 top-1 duration-300"} duration-500`}></p>
                </div>
               
                <div className="gap-16 hidden lg:flex">
                    
                        <Link to="/search">
                        <button className="text-md min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0">Search</button>
                        </Link>

                        <Link to="/favorites">
                        <button className="text-md min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0">Favorites</button>
                        </Link>

                        { signedInOrNot ? (
                            <div>
                                <button onClick={() => signOut(auth)} className="text-md min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0">Sign Out</button>
                            </div>
                        ) :
                        <Signup userToSet={setMethod}/>
                        }
                   
                </div>
            </nav>

            { isOpen && (
                <div className="flex flex-col lg:hidden gap-6 w-300 m-auto max-w-[95%] px-8 md:px-10 animate-[fadeIn_0.3s_ease-out] pb-6 bg-zinc-800 pt-6">
                        
                        <Link to="/search">
                        <button className="text-sm md:text-lg min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_0.5s_ease-out_forwards] [animation-delay:0.3s] opacity-0" onClick={() => setIsOpen(false)}>Search</button>
                        </Link>

                        <Link to="/favorites">
                        <button className="text-sm md:text-lg min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_0.5s_ease-out_forwards] [animation-delay:0.3s] opacity-0" onClick={() => setIsOpen(false)}>Favorites</button>
                        </Link>

                        { signedInOrNot ? (
                            <div>
                                <button onClick={() => signOut(auth)} className="text-sm md:text-lg min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0">Sign Out</button>
                            </div>
                        ) :
                        <div className="lg:hidden">
                        <Signup userToSet={setMethod}/>
                        </div>
                        }

                </div>
                )

                }
            
        </header>

        </>
    );
}