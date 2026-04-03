export function SearchMovies({query, clearMethod}) {
    return(
       
            <div className="grid md:grid-cols-2 gap-10 justify-center place-items-center my-40 px-16 lg:max-w-230 lg:mx-auto">
                <input 
                
                placeholder="Search for a movie"
                onKeyDown={(e) => 
                {
                    if (e.key === "Enter") {
                        query(e.target.value);
                        e.target.value = "";
                    }
                }
                }
                className="border text-[17px] truncate border-zinc-400 placeholder:text-center p-2 w-full block m-auto rounded-xl text-white placeholder:text-white font-semibold font-mono"
                />

                <button onClick={() => clearMethod()} className="text-md bg-teal-700 px-6 text-white font-bold rounded cursor-pointer min-w-37.5 h-13.75 hover:bg-teal-800 active:scale-95 font-mono transition-all duration-300 my-auto">Clear Search</button>
            </div>
            
    );
}