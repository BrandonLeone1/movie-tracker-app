import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import {doc, updateDoc} from "firebase/firestore"
import { db } from "../services/Firebase";

export function Favorites({favoritesList, detailMethod, removeMethod, updateMethod, isSignedIn}) {

    if (isSignedIn == null) {
        return (
            <div className="grid w-275 max-w-[90%] m-auto h-screen text-center place-items-center">
                <h2 className="text-white text-2xl text-center font-mono">Please sign in to add favorites without issues!</h2>
            </div>
        );
    }

    if (favoritesList.length < 1) {
        return (
            <div className="grid w-275 max-w-[90%] m-auto h-screen text-center place-items-center">
                <h2 className="text-white text-2xl text-center font-mono">No Favorites Found :( Try heading over to the search page to get started adding some!</h2>
            </div>
        );
    }

const [draggedID, setDraggedID] = useState(null);


    function handleClick(favoriteToRemove){
        removeMethod(favoriteToRemove);
    }

async function handleDrop(status) {
    if (isSignedIn == null) {return}    
    
    const updatedFavorites = favoritesList.map(favorite => 
       { if (favorite.imdbID === draggedID) {
            return {...favorite, status}
        } else {return favorite}
        }
    )
        updateMethod(updatedFavorites)
        
        const userRef = doc(db, "users", isSignedIn.uid);
        
        try {
            await updateDoc(userRef, {favorites: updatedFavorites});
        } catch (error) {
            console.log("failed to update favorites:", error);
        }
        
    }

    return(
        <>
        <div className="w-300 max-w-[90%] mx-auto">
            <>
            <h2 className="text-white text-2xl md:text-2xl sm:text-2xl lg:text-3xl font-bold font-mono my-16">Favorites</h2>
            
            
            
            <div className="grid grid-cols-2 gap-16">
          
                {/* Want to watch movies container */}
                <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop("want")}
                className="grid grid-cols-1 gap-8 place-content-start">

                    <h3 className="text-white text-center text-xl sm:text-xl md:text-xl lg:text-xl font-[montserrat] font-semibold mb-12">Want to watch</h3>

                    {
                        favoritesList.filter(favorite => favorite.status === "want")
                        .map(favorite => (
                            <div key={favorite.imdbID} draggable onDragStart={() => setDraggedID(favorite.imdbID)} className="flex flex-col gap-3 min-w-0">
                                <h2 className="text-white text-center text-xl truncate">{favorite.Title}</h2>
                                <Link to={`/favorites/movie/${favorite.imdbID}`}>
                                <img src={favorite.Poster} onClick={() => detailMethod(favorite)} className="h-80 w-[90%] object-cover rounded-2xl block m-auto"/>
                                </Link>

                                <button onClick={() => handleClick(favorite)} className="text-md min-h-8 bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300 block mx-auto">Remove</button>
                            </div>
                        )
                    ) 
                        
                        
                    }

                </div>

                {/* Watched movies container */}
                <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop("watched")}
                className="grid grid-cols-1 gap-8 place-content-start"
                
                >
                    <h3 className="text-white text-center text-xl sm:text-xl md:text-xl lg:text-xl font-[montserrat] font-semibold mb-12">Watched</h3>

                    {
                        favoritesList.filter(favoriteM => favoriteM.status === "watched")
                        .map(favoriteM => (
                            <div key={favoriteM.imdbID} draggable onDragStart={() => setDraggedID(favoriteM.imdbID)} className="flex flex-col gap-3 min-w-0">
                                <h2 className="text-white text-center text-xl truncate">{favoriteM.Title}</h2>
                                <Link to={`/favorites/movie/${favoriteM.imdbID}`}>
                                <img src={favoriteM.Poster} onClick={() => detailMethod(favoriteM)} className="h-80 w-[90%] object-cover rounded-2xl block m-auto"/>
                                </Link>

                                <button onClick={() => handleClick(favoriteM)} className="text-md min-h-8 bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300 block mx-auto">Remove</button>
                            </div>
                        ))
                    }

                </div>
            </div>
            
      </>

        {/* Detailed view of favorite */}
        <Outlet></Outlet>
       
        </div>

        </>
    );
}