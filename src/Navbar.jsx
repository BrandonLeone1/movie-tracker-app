import { useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from "./Signup";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";

export function Navbar({signedInOrNot, setMethod}) {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
        <header className="md:pb-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_40%),linear-gradient(to_bottom,#0f0f0f,#000)] shadow">

            <nav className="flex items-center justify-between px-10 py-6 w-300 max-w-[95%] m-auto font-[montserrat]">
                
                
                <div className="">
                    <Link to="/">
                    <h2 className="text-2xl md:text-2xl lg:text-2xl text-red-600 font-semibold" onClick={() => setIsOpen(false)}>Movie Tracker</h2>
                    </Link>
                </div>

                <div>
                    <p className="text-white lg:hidden text-4xl cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>≡</p>
                </div>
               
                <div className="gap-16 hidden lg:flex">
                    
                        <Link to="/search">
                        <button className="text-sm min-h-8 bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300">Search</button>
                        </Link>

                        <Link to="/favorites">
                        <button className="text-sm min-h-8 bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300">Favorites</button>
                        </Link>
                        { signedInOrNot ? (
                            <div>
                                <button onClick={() => signOut(auth)} className="text-sm min-h-8 bg-red-900 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300">Sign Out</button>
                            </div>
                        ) :
                        <Signup userToSet={setMethod}/>
                        }
                   
                </div>
            </nav>

            { isOpen && (
                <div className="flex flex-col lg:hidden gap-6 w-300 m-auto max-w-[95%] px-10 animate-[fadeIn_0.3s_ease-out] pb-6">
                        
                        
                        <Link to="/search">
                        <button className="text-sm min-h-8 lg:hidden bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300" onClick={() => setIsOpen(false)}>Search</button>
                        </Link>

                        <Link to="/favorites">
                        <button className="text-sm min-h-8 lg:hidden bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300" onClick={() => setIsOpen(false)}>Favorites</button>
                        </Link>

                        { signedInOrNot ? (
                            <div>
                                <button onClick={() => signOut(auth)} className="text-sm min-h-8 lg:hidden bg-red-900 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300">Sign Out</button>
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