import { useNavigate } from "react-router-dom";

export function DetailedView({movieToDisplay, fullDetails}) {
    
    const navigate = useNavigate();
   
    if (fullDetails == null) {return}

    return (

        <div onClick={() => navigate(-1)} className={`grid justify-center fixed inset-0 z-50 p-4 bg-black/50`}>
            <div className={`grid grid-cols-1 text-center place-items-center px-8 py-16 bg-zinc-700 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl relative overflow-y-auto shadow-2xl animate-[fadeIn_0.3s_ease-out]`} onClick={(e) => e.stopPropagation()}>
                
                <h2 className="text-white">{fullDetails.Title}</h2>
                <p className="text-white">{fullDetails.Genre}</p>
                <p className="text-white">{fullDetails.Year}</p>
                <p className="text-white">{fullDetails.Runtime}</p>
                <p className="text-white">{fullDetails.Actors}</p>
                <p className="text-white">{fullDetails.Plot}</p>
                <button onClick={() => navigate(-1)} className="text-sm w-20 min-h-8 bg-teal-700 px-4 text-white py-1 font-bold rounded cursor-pointer hover:bg-teal-800 transition-all duration-300">Close</button>
                
            </div>
        </div>
    );
}