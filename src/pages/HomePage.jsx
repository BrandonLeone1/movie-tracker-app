import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export function HomePage({trendingMovies}){

    const [selectedTrending, setSelectedTrending] = useState(null);

    const carousel = useRef(null);

    const faqs = [
        {
            question: "How Do I Get Started Using This App?",
            answer: "To get started head over to the search page. From there you can view specific movie details upon search or add them to your favorites.",
            id: 1
        },
        {
            question: "Can I Organize My Favorites?",
            answer: "Yes, drag and drop for organizing want to watch/watched movies is supported on PC. Due to the nature of the implementation, it is not supported on mobile, however your changes made on desktop will save!",
            id: 2
        },
        {
            question: "How Is My Sign In Being Handled?",
            answer: "Secure and private sign-in is implemented through Firebase and Google OAuth. Favorites are also securely saved to Firestore database.",
            id: 3
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
                
                <motion.div className="-mt-25 overflow-x-hidden overflow-y-hidden"
                initial={{opacity: 0, x: -200}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                >
                    <h1 className="text-2xl font-bold text-center md:text-3xl lg:text-4xl font-[montserrat]">Movie Tracking App</h1>
                </motion.div>

                <motion.div
                className="overflow-x-hidden"
                initial={{opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                >
                <img src="videocam.png" className="w-15 block md:w-25"/>
                </motion.div>

                <motion.div
                className="overflow-x-hidden"
                initial={{opacity: 0, x: -200}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                >
                <p className="text-lg md:text-xl lg:text-2xl font-[montserrat] font-semibold">Don't end up forgetting to watch that movie you said you would.</p>
                </motion.div>

                <motion.div
                className="overflow-x-hidden"
                initial={{opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                >
                <p className="text-lg md:text-xl lg:text-2xl font-[montserrat] font-semibold">Ready to get started?</p>
                </motion.div>

                <Link to="/search">
                <button className="text-lg md:text-2xl lg:text-3xl bg-teal-700 shadow-2xl px-6 py-2 rounded-3xl cursor-pointer hover:scale-105 hover:bg-teal-800 active:scale-100 duration-300 after:content-['>'] after:ml-2 font-[montserrat] after:font-[montserrat] after:font-semibold font-semibold [animation-delay:1.5s] animate-[popUp2_0.8s_ease-out_forwards] opacity-0" aria-label="Navigate to search page.">Search Now!</button>
                </Link>
            
            </div>

            <motion.div 
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.8}}
            className="flex w-300 max-w-[90%] m-auto text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
            
                <h2 className="text-white font-[montserrat]">"Trending Movies"</h2>
            
            </motion.div>
            
            
            <motion.div 
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.8}}
            ref={carousel} className="trending-movies-container w-300 max-w-[90%] mx-auto my-10 flex overflow-x-scroll md:overflow-x-hidden scroll-smooth space-x-4 p-4">
                
                {
                    trendingMovies.map((movie) => (
                        <div key={movie.number} className="md:min-w-50 min-w-31.25 flex flex-col items-center gap-4 justify-center text-white relative transition-all hover:scale-105">
                            <h2>{movie.title}</h2>
                            <p className="absolute top-60 left-0 text-white font-bold text-6xl hidden md:block">{movie.number}</p>
                            <img src={movie.poster} alt="Poster of movie." className="w-62.5 rounded-2xl"/>
                            <button onClick={() => setSelectedTrending(movie)} className="text-md min-h-8 bg-zinc-500 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-zinc-600 transition-all duration-300" aria-label="Bring of modal for selected 'trending movie'.">View More</button>
                        </div>
                    )
                
                )
                }
            
            </motion.div>

            <div className="flex gap-6 w-300 max-w-[90%] mx-auto justify-center text-white font-semibold">
                <button className="hidden md:block md:text-4xl cursor-pointer" onClick={() => scrollLeft()}>{`<`}</button>
                <button className="hidden md:block md:text-4xl cursor-pointer" onClick={() => scrollRight()}>{`>`}</button>
            </div>

            {selectedTrending && (
                <div onClick={() => setSelectedTrending(null)} className={`fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/50`}>
                    <div className={`grid grid-cols-1 place-items-center px-8 py-16 bg-zinc-700 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl relative overflow-y-auto gap-3 shadow-2xl max-h-[90vh] animate-[fadeIn_0.3s_ease-out]`} onClick={(e) => e.stopPropagation()}>
                        
                        <h2 className="text-white">{selectedTrending.title}</h2>
                        <p className="text-white">{selectedTrending.number}</p>
                        <p className="text-white">Donec eu nulla rutrum, condimentum leo in, cursus erat. Duis id mi quis arcu elementum eleifend. Duis pulvinar lacinia augue, non dictum enim.</p>
                        <button onClick={() => setSelectedTrending(null)} aria-label='Close the modal pop-up of selected trending movie.' className="text-sm w-20 min-h-8 bg-teal-700 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-teal-800 transition-all duration-300">Close</button>
                
                    </div>
                </div>
            )
            }

            <motion.div 
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.8}}
            className="flex w-300 max-w-[90%] m-auto text-xl md:text-2xl lg:text-3xl font-bold mt-15">
                <h2 className="text-white font-[montserrat]">"More Benefits"</h2>
            </motion.div>
            
            <motion.div 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.8}}
            className="my-20 gap-12 w-300 max-w-[90%] m-auto">
            
            <Splide
            options ={{type: 'loop', drag: 'free', gap: '1rem', arrows: false, pagination: false, fixedWidth: 290, autoScroll: {autoStart: true, speed: 0.5},}}
            extensions={{AutoScroll}}
            >
                
                <SplideSlide>
                    <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 min-h-84 text-white">
                        <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Multiple device access</h3>
                        <p>Stream on up to 3 devices concurrently on our cheapest plan! Support available for Smart TVs, Apple TV, Xbox & Playstation consoles, and more!</p>
                        <i className="fa-solid fa-tv mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl" aria-hidden></i>
                    </div>
                </SplideSlide>

                <SplideSlide>
                    <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 min-h-84 text-white">
                        <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Offline viewing</h3>
                        <p>You can download your favorite movies so that you can watch them even without access to the internet.</p>
                        <i className="fa-solid fa-download mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl" aria-hidden></i>
                    </div>
                </SplideSlide>

                <SplideSlide>
                    <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 min-h-84 text-white">
                        
                        <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Multiple profiles</h3>
                        <p>Add multiple user profiles so that your content does not get mixed up!</p>
                        <i className="fa-solid fa-circle-user mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl" aria-hidden></i>
                    
                    </div>
                </SplideSlide>

                <SplideSlide>
                    <div className="reason flex flex-col gap-8 px-8 bg-linear-to-b from-gray-900 via-[#141422] rounded-2xl py-8 min-w-72.5 min-h-84 text-white">
                        
                        <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold">Ad free</h3>
                        <p>None of our plans have ads to disrupt your content, allowing hassle free viewing. Paying for a plan means no advertisments and we will always keep this viewpoint.</p>
                        <i className="fa-solid fa-binoculars mt-auto ml-auto sm:text-xl text-xl md:text-2xl lg:text-4xl" aria-hidden></i>
                    
                    </div>
                </SplideSlide>

            </Splide>
            </motion.div>

            <motion.div
            className="w-300 mb-10 max-w-[90%] mx-auto flex flex-col mt-15 text-white font-[montserrat]"
            initial={{opacity: 0, y: 25}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 2}}
            >
                
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold ">"Frequently Asked Questions"</h2>
             </motion.div>


                <div className="faq-container flex flex-col gap-4 w-300 max-w-[90%] mx-auto font-[montserrat]">
                    
                  {
                    faqs.map((faq) => (
                        
                      <div key={faq.id}>

                        <motion.div className="bg-zinc-700 text-white p-6 mt-15 cursor-pointer relative rounded-t-2xl" onClick={() => setSelectedFAQ(selectedFAQ === faq.id ? null : faq.id)} initial={{opacity: 0, y: 25}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 2}}
                        
                        >
                            <h3 className={`text-lg max-w-[50%] font-semibold after:content-['↑'] after:absolute after:top-[50%] after:translate-y-[-50%] after:right-5 after:text-5xl ${selectedFAQ == faq.id ? "after:rotate-180 after:duration-300" : "after:duration-300"}`}>{faq.question}</h3>
                        </motion.div>

                    <AnimatePresence>
                        {selectedFAQ === faq.id && (
                            <motion.div 
                            className="text-zinc-800 p-6 bg-zinc-200 rounded-b-2xl text-md md:text-lg"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{duration: 0.8}}
                            >
                            {faq.answer}
                            </motion.div>
                        )

                        }
                    </AnimatePresence>

                    
                   
                   
                      </div>
                   
                    ))}
               
                    
                </div>

                
                <footer className="px-8 md:px-10 py-6 m-auto font-[montserrat] border-t-2 border-zinc-700 mt-15 w-full flex flex-wrap justify-between">
                    <div className="w-400 max-w-[95%] mx-auto grid grid-cols-2 place-items-center gap-6 px-8 md:px-10 py-6">
                        
                        <div className="flex flex-col gap-6">  
                            <p className="text-white text-md">UI/sections lightly inspired by Netflix.</p>
                            <p className="text-white text-md">Designed with Tailwind CSS, Framer-Motion, and SplideJS.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <p className="text-white text-md">Uses OMDB API to search movies.</p>
                            <p className="text-white text-md">User authentication and favorites are handled using Firebase/Firestore.</p>
                        </div>
                    
                    </div>
                </footer>
            
   

        </div>
      
    );
}