import { Link, Outlet } from "react-router-dom";


export function RenderMovies({moviesToRender, favoriteMethod, detailMovie}){
    
    if(moviesToRender.length < 1) {return}

    function handleClick(movieToPass) {
        console.log(movieToPass);
        favoriteMethod(movieToPass);
    }
    
    return(

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full max-w-300 mx-auto py-16">

            {

                moviesToRender.map((movie) => (
                    
                    <div key={movie.imdbID} className="flex flex-col gap-3 text-center h-120 min-w-0">
                        <h2 className="text-white font-mono text-md md:text-lg truncate lg:text-lg">{movie.Title}</h2>
                        <p className="text-white font-mono">{movie.Year}</p>
                        <Link to={`/search/movie/${movie.imdbID}`}>
                        <img src={movie.Poster} onClick={() => detailMovie(movie)} className="h-80 w-[90%] object-cover rounded-2xl block m-auto"/>
                        </Link>
                        <button onClick={() => handleClick(movie)} className="text-md min-h-8 bg-red-600 px-4 place-self-center text-white py-1 font-bold rounded cursor-pointer hover:bg-red-700 transition-all duration-300 active:scale-95">Add to favorites</button>
                    </div>
                    
                )
            
            
            
            )

            }
            <Outlet></Outlet>

        </div>
    );
}