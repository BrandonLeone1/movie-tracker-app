import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router";

export function HomePage({trendingMovies}){

    const [selectedTrending, setSelectedTrending] = useState(null);

    const carousel = useRef(null);

    function scrollLeft () {
        if (carousel.current) {
            carousel.current.scrollBy({left: -400, behavior: "smooth"});
        }
    };

    function scrollRight() {
        if (carousel.current) {
            carousel.current.scrollBy({left: 400, behavior: "smooth"});
        }
    };

    return (
     
        <div>


            <div className="hero-section-container h-screen px-8 text-center flex flex-col place-items-center justify-center gap-16  bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_40%),linear-gradient(to_bottom,#0f0f0f,#000)] text-white">
                <h1 className="text-xl font-bold text-center sm:text-xl md:text-2xl lg:text-3xl font-[montserrat]">Search major movies, add to favorites, and sort by watched or not!</h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-xl">Don't end up forgetting to watch that movie you said you would.</p>
                <p className="text-base sm:text-lg md:text-lg lg:text-lg">Ready to get started?</p>

                <Link to="/search">
                <button className="text-base sm:text-xl md:text-2xl lg:text-3xl min-h-16 bg-red-600 px-8 text-white py-1 font-bold rounded-xl cursor-pointer hover:bg-red-700 transition-all duration-300 after:content-['>'] after:ml-2">Search Now!</button>
                </Link>
            </div>


            <div className="flex w-300 max-w-[90%] m-auto text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
                <h2 className="text-white">Trending Movies</h2>
            </div>
            <div className="flex gap-16 justify-center">
                <button className="text-red-600 text-3xl cursor-pointer" onClick={scrollLeft}>{`<`}</button>
                <button className="text-red-600 text-3xl cursor-pointer" onClick={scrollRight}>{`>`}</button>
            </div>
            <div ref={carousel} className="trending-movies-container w-300 max-w-[90%] mx-auto my-10 flex overflow-x-hidden scroll-smooth space-x-4 p-4">
                
                {
                    trendingMovies.map((movie) => (
                        <div key={movie.number} className="md:min-w-50 min-w-31.25 flex flex-col items-center gap-4 justify-center text-white relative transition-all hover:scale-105">
                            <h2>{movie.title}</h2>
                            <p className="absolute top-60 left-0 text-white font-bold text-6xl hidden md:block">{movie.number}</p>
                            <img src={movie.poster} className="w-62.5 rounded-2xl"/>
                            <button onClick={() => setSelectedTrending(movie)} className="text-md min-h-8 bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300">View More</button>
                        </div>
                    )
                
                
                )
                }
            </div>

            {selectedTrending && (

                <div onClick={() => setSelectedTrending(null)} className={`grid justify-center fixed inset-0 z-50 p-4`}>
                    <div className={`grid grid-cols-1 place-items-center px-8 py-16 bg-slate-800 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl relative overflow-y-auto shadow-2xl max-h-[50vh] my-[50%] animate-[fadeIn_0.3s_ease-out]`} onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-white">{selectedTrending.title}</h2>
                        <p className="text-white">{selectedTrending.number}</p>
                        <p className="text-white">Donec eu nulla rutrum, condimentum leo in, cursus erat. Duis id mi quis arcu elementum eleifend. Duis pulvinar lacinia augue, non dictum enim.</p>
                

                
                        <button onClick={() => setSelectedTrending(null)} className="text-sm w-20 min-h-8 bg-red-600 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300">Close</button>
                
                    </div>
                </div>
            )

            }

            <h2>More benefits</h2>
            <div className="reasons-to-join-container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 my-20 gap-12 w-300 max-w-[90%] m-auto">

                

                <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 text-white">
                    <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Multiple device access</h3>
                    <p>Stream on up to 3 devices concurrently on our cheapest plan! Support available for Smart TVs, Apple TV, Xbox & Playstation consoles, and more!</p>
                    <i className="fa-solid fa-tv mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl"></i>
                </div>

                <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 text-white">
                    <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Offline viewing</h3>
                    <p>You can download your favorite movies so that you can watch them even without access to the internet.</p>
                    <i className="fa-solid fa-download mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl"></i>
                </div>

                <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 text-white">
                    <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Multiple profiles</h3>
                    <p>Add multiple user profiles so that your content does not get mixed up!</p>
    
                    <i className="fa-solid fa-circle-user mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl"></i>
                  
                </div>

                <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 text-white">
                    <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Ad free</h3>
                    <p>None of our plans have ads to disrupt your content, allowing hassle free viewing. Paying for a plan means no advertisments and we will always keep this viewpoint.</p>
                    <i className="fa-solid fa-binoculars mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl"></i>
                </div>
            </div>

            <div className="faq-container">

                <h2>Frequently Asked Questions</h2>

                <div className="question">

                </div>

                <div className="question">

                </div>

                <div className="question">

                </div>

                <div className="question">

                </div>

                <div className="question">

                </div>

                <div className="question">

                </div>

            </div>
        </div>
      
    );
}