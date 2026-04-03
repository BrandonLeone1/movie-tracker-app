import { useState, useRef } from "react";
import { Link } from "react-router";
import { easeInOut, motion, AnimatePresence } from "framer-motion";

export function HomePage({trendingMovies}){

    const [selectedTrending, setSelectedTrending] = useState(null);

    const carousel = useRef(null);

    const faqs = [
        {
            question: "How Do I Get Started Using This App?",
            answer: "To get started head over to the search page. From there you can view specific movie details upon search or add them to your favorites."
        },
        {
            question: "Can I Organize My Favorites?",
            answer: "Yes, drag and drop for organizing want to watch/watched movies is supported on PC. Due to the nature of the implementation, it is not supported on mobile, however your changes made on desktop will save!"
        },
        {
            question: "How Is My Sign In Being Handled?",
            answer: "Secure and private sign-in is implemented through Firebase and Google OAuth. Favorites are also securely saved to Firestore database."
        },
    ]

    const[selectedFAQ, setSelectedFAQ] = useState(null);

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

            <div className="hero-section-container h-screen px-8 text-center flex flex-col gap-16 justify-center bg-zinc-800 text-white items-center overflow-x-hidden overflow-y-hidden relative">
                
                <h1 className="text-2xl font-bold text-center md:text-3xl lg:text-4xl font-[montserrat] -mt-25 animate-[slideInRight_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0">Movie Tracking App</h1>
                <img src="videocam.png" className="w-15 block md:w-25 animate-[slideInLeft_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0"/>
                <p className="text-lg md:text-xl lg:text-2xl font-[montserrat] font-semibold animate-[slideInRight_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0">Don't end up forgetting to watch that movie you said you would.</p>
                <p className="text-lg md:text-xl lg:text-2xl font-[montserrat] font-semibold animate-[slideInLeft_1s_ease-out_forwards] [animation-delay:0.3s] opacity-0">Ready to get started?</p>

                <Link to="/search">
                <button className="text-lg md:text-2xl lg:text-3xl bg-teal-700 shadow-2xl px-6 py-2 rounded-3xl cursor-pointer hover:scale-105 hover:bg-teal-800 active:scale-100 duration-300 after:content-['>'] after:ml-2 font-[montserrat] after:font-[montserrat] after:font-semibold font-semibold [animation-delay:1.5s] animate-[popUp2_0.8s_ease-out_forwards] opacity-0">Search Now!</button>
                </Link>
            
            </div>

            <div className="flex w-300 max-w-[90%] m-auto text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
            
                <h2 className="text-white font-[montserrat]">"Trending Movies"</h2>
            
            </div>
            <div className="md:flex gap-16 justify-center mt-10 hidden">
            
                <button className="text-3xl text-zinc-800 cursor-pointer font-bold bg-zinc-400 px-4 rounded-2xl hover:bg-zinc-500 duration-300 shadow-2xl" onClick={scrollLeft}>{`<`}</button>
                <button className="text-3xl text-zinc-800 cursor-pointer font-bold bg-zinc-400 px-4 rounded-2xl hover:bg-zinc-500 duration-300 shadow-2xl" onClick={scrollRight}>{`>`}</button>
            
            </div>
            
            <div ref={carousel} className="trending-movies-container w-300 max-w-[90%] mx-auto my-10 flex overflow-x-scroll md:overflow-x-hidden scroll-smooth space-x-4 p-4">
                
                {
                    trendingMovies.map((movie) => (
                        <div key={movie.number} className="md:min-w-50 min-w-31.25 flex flex-col items-center gap-4 justify-center text-white relative transition-all hover:scale-105">
                            <h2>{movie.title}</h2>
                            <p className="absolute top-60 left-0 text-white font-bold text-6xl hidden md:block">{movie.number}</p>
                            <img src={movie.poster} className="w-62.5 rounded-2xl"/>
                            <button onClick={() => setSelectedTrending(movie)} className="text-md min-h-8 bg-zinc-500 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-zinc-600 transition-all duration-300">View More</button>
                        </div>
                    )
                
                )
                }
            
            </div>

            {selectedTrending && (
                <div onClick={() => setSelectedTrending(null)} className={`fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/50`}>
                    <div className={`grid grid-cols-1 place-items-center px-8 py-16 bg-zinc-700 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl relative overflow-y-auto gap-3 shadow-2xl max-h-[90vh] animate-[fadeIn_0.3s_ease-out]`} onClick={(e) => e.stopPropagation()}>
                        
                        <h2 className="text-white">{selectedTrending.title}</h2>
                        <p className="text-white">{selectedTrending.number}</p>
                        <p className="text-white">Donec eu nulla rutrum, condimentum leo in, cursus erat. Duis id mi quis arcu elementum eleifend. Duis pulvinar lacinia augue, non dictum enim.</p>
                        <button onClick={() => setSelectedTrending(null)} className="text-sm w-20 min-h-8 bg-teal-700 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-teal-800 transition-all duration-300">Close</button>
                
                    </div>
                </div>
            )
            }

            <div className="flex w-300 max-w-[90%] m-auto text-xl md:text-2xl lg:text-3xl font-bold mt-15">
                <h2 className="text-white font-[montserrat]">"More Benefits"</h2>
            </div>
            
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

            <motion.div
            className="w-300 mb-10 max-w-[90%] mx-auto flex flex-col mt-15 text-white font-[montserrat]"
            initial={{opacity: 0, y: 25}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 2}}
            >
                
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold ">Frequently Asked Questions</h2>
             </motion.div>


                <div className="faq-container flex flex-col gap-4 w-300 max-w-[90%] mx-auto font-[montserrat]">
                    
                  {
                    faqs.map((faq, index) => (
                        
                      <div key={index}>

                        <motion.div className="bg-zinc-700 text-white p-6 mt-15 cursor-pointer relative rounded-t-2xl" onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)} initial={{opacity: 0, y: 25}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 2}}
                        >
                            <h3 className={`text-lg max-w-[50%] font-semibold after:content-['↓'] after:absolute after:top-[50%] after:translate-y-[-50%] after:right-5 after:text-5xl ${selectedFAQ == index ? "after:rotate-180 after:duration-300" : "after:duration-300"}`}>{faq.question}</h3>
                        </motion.div>

                    <AnimatePresence>
                        {selectedFAQ === index && (
                            <motion.div 
                            className="text-zinc-800 p-6 bg-zinc-200 rounded-b-2xl text-md md:text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{opacity: 0}}
                            >
                            {faq.answer}
                            </motion.div>
                        )

                        }
                    </AnimatePresence>

                    
                   
                   
                      </div>
                   
                    ))}
               
                    
                </div>
            
   

        </div>
      
    );
}