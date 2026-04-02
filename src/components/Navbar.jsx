import { useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from "./Signup";
import { signOut } from "firebase/auth";
import { auth } from "../services/Firebase";

export function Navbar({signedInOrNot, setMethod}) {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
        <header className="md:pb-0 bg-zinc-800/85 shadow sticky top-0 z-50">

            <nav className="flex backdrop-blur-sm items-center justify-between px-8 md:px-10 py-6 w-400 max-w-[95%] m-auto font-[montserrat]">
                
                <div className="">
                    <Link to="/">
                    <h2 className="text-lg uppercase md:text-2xl lg:text-2xl text-white font-semibold font-mono animate-[slideInLeft_1s_ease-out]" onClick={() => setIsOpen(false)}>Movie Tracker</h2>
                    </Link>
                </div>

                <div>
                    <p className="text-white lg:hidden text-3xl cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>≡</p>
                </div>
               
                <div className="gap-16 hidden lg:flex">
                    
                        <Link to="/search">
                        <button className="text-md min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_1s_ease-out]">Search</button>
                        </Link>

                        <Link to="/favorites">
                        <button className="text-md min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_1s_ease-out]">Favorites</button>
                        </Link>

                        { signedInOrNot ? (
                            <div>
                                <button onClick={() => signOut(auth)} className="text-md min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300 animate-[slideInLeft_1s_ease-out]">Sign Out</button>
                            </div>
                        ) :
                        <Signup userToSet={setMethod}/>
                        }
                   
                </div>
            </nav>

            { isOpen && (
                <div className="flex flex-col lg:hidden gap-6 w-300 m-auto max-w-[95%] px-8 md:px-10 animate-[fadeIn_0.3s_ease-out] pb-6 bg-zinc-800 pt-6">
                        
                        <Link to="/search">
                        <button className="text-sm md:text-lg min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300" onClick={() => setIsOpen(false)}>Search</button>
                        </Link>

                        <Link to="/favorites">
                        <button className="text-sm md:text-lg min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300" onClick={() => setIsOpen(false)}>Favorites</button>
                        </Link>

                        { signedInOrNot ? (
                            <div>
                                <button onClick={() => signOut(auth)} className="text-sm md:text-lg min-h-8 font-mono text-white font-bold uppercase cursor-pointer hover:scale-105 active:scale-100 duration-300">Sign Out</button>
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