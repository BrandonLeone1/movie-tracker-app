import { use, useEffect, useState } from 'react'
import { Navbar } from './Navbar';
import { SearchMovies } from './SearchMovies';
import { Route, Routes } from 'react-router-dom';
import { Favorites } from './Favorites';
import { DetailedView } from './DetailedMovie';
import { HomePage } from './HomePage';
import { RenderMovies } from './RenderMovies';
import { Loading } from './Loading';
import { Error } from './Error';
import { Signup } from './Signup';
import { auth } from './Firebase';
import { db } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"



function App() {

const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return () => unsubscribe();
}, []);
 
const [userFavorites, setUserFavorites] = useState([]);

const [allResults, setAllResults] = useState([]);

const [userQuery, setUserQuery] = useState("");

const [detailedView, setDetailedView] = useState(null);

const [fullDetails, setFullDetails] = useState(null);

const [isLoading, setIsLoading] = useState(false);

const [isError, setIsError] = useState(false);

const trendingMovies = [
  {
    title: "Lorem ipsum dolor sit",
    number: 1,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Science teacher Ryland Grace (Ryan Gosling) wakes up on a spaceship light years from home with no recollection of who he is or how he... "

  },
  {
    title: "Lorem ipsum dolor sit",
    number: 2,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Birmingham, 1940. Amidst the chaos of WWII, Tommy Shelby is driven back from a self-imposed exile to face his most destructive reckoning yet. With the..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 3,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Moments after surviving an all-out attack from the Le Domas family, Grace (Samara Weaving) discovers she’s reached the next level of the nightmarish game..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 4,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Bob is a washed-up revolutionary who lives in a state of stoned paranoia, surviving off-grid with his spirited and self-reliant daughter, Willa. When his evil..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 5,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Moments after surviving an all-out attack from the Le Domas family, Grace (Samara Weaving) discovers she’s reached the next level of the nightmarish game..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 6,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Moments after surviving an all-out attack from the Le Domas family, Grace (Samara Weaving) discovers she’s reached the next level of the nightmarish game..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 7,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Moments after surviving an all-out attack from the Le Domas family, Grace (Samara Weaving) discovers she’s reached the next level of the nightmarish game..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 8,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Moments after surviving an all-out attack from the Le Domas family, Grace (Samara Weaving) discovers she’s reached the next level of the nightmarish game..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 9,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Moments after surviving an all-out attack from the Le Domas family, Grace (Samara Weaving) discovers she’s reached the next level of the nightmarish game..."
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 10,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
    details: "Moments after surviving an all-out attack from the Le Domas family, Grace (Samara Weaving) discovers she’s reached the next level of the nightmarish game..."
  }
];

useEffect(() => {

    if(userQuery == undefined) {return}

    fetchMovies();

}, [userQuery]


)

useEffect(() => {

  if (detailedView == null) {return}
fetchSpecificDetails();

}, [detailedView]


)

useEffect(() => {

  async function loadFavorites() {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      setUserFavorites(docSnap.data().favorites || []);
    } else {
      setUserFavorites([])
    }
  };

  loadFavorites();

}, [user]


)


async function fetchMovies() {

  try {
  setIsError(false);
  setIsLoading(true);

  let stringToFetch = `http://www.omdbapi.com/?s=${encodeURIComponent(userQuery)}&apikey=1dd8fbef`;

  let response = await fetch(stringToFetch);

  let data = await response.json();
  
  let moviesArray = data.Search;

  
    
  

  console.log(moviesArray);
  setIsLoading(false);
  setAllResults(moviesArray);
  } catch {
    setIsError(true);
  }


}

async function fetchSpecificDetails(){

  try {
  let stringToFetch2 = `http://www.omdbapi.com/?i=${encodeURIComponent(detailedView.imdbID)}&apikey=1dd8fbef`;

  let response2 = await fetch(stringToFetch2);

  let data2 = await response2.json()

  console.log(data2);

 

  setFullDetails(data2);
  
  } catch {
    setIsError(true);
  }
}


async function addToFavorites(movieToFavorite) {

  if (userFavorites.some(favorite => favorite.imdbID == movieToFavorite.imdbID)) {
    return;
  } 

  if (!user) {return}

    const userRef = doc(db, "users", user.uid);

    let favoriteMovieToFav = {
      ...movieToFavorite,
      status: "want"
    }

    try {
      await updateDoc(userRef, {
        favorites: arrayUnion(favoriteMovieToFav)
      });
    } catch {
      await setDoc(userRef, {
        favorites: [favoriteMovieToFav]
      });
    }


  setUserFavorites(prev => [...prev, favoriteMovieToFav]);
  
}

async function removeFromFavorites(favoriteToRemove) {

  if (!user) {return}

  const userRef = doc(db, "users", user.uid);

  await updateDoc(userRef, {
    favorites: arrayRemove(favoriteToRemove)
  });

  setUserFavorites(prev => prev.filter((favorite) => favorite.imdbID != favoriteToRemove.imdbID
))
}

function clearSearch() {
  setUserQuery()
  setAllResults()
}



if (isLoading) {
  return(
  <Loading />
);
}

  return (
    <div className="app-container">
      
      
      <Navbar signedInOrNot={user} setMethod={setUser}/>

      <Routes>

        <Route path='/' element={<HomePage trendingMovies={trendingMovies}/>}/>



        <Route path='/search' element={
          <>
          
          <SearchMovies query={setUserQuery} clearMethod={clearSearch}/>
          
          {
          allResults && (
            <RenderMovies moviesToRender={allResults} favoriteMethod={addToFavorites} detailMovie={setDetailedView}/>
          )
          }

          { isError && (
          <Error clearFunction={clearSearch} errorOrNot={isError}/>
          )

          }
          </>
        
      
      } 
        
        
        
        >
          <Route path='/search/*' element={<DetailedView movieToDisplay={detailedView} fullDetails={fullDetails}/>}/>
        </Route>

        
        

        <Route path='/favorites' element={<Favorites favoritesList={userFavorites} detailMethod={setDetailedView} removeMethod={removeFromFavorites} updateMethod={setUserFavorites} isSignedIn={user}/>}>
          <Route path='/favorites/*' element={<DetailedView movieToDisplay={detailedView} fullDetails={fullDetails}/>} />
        </Route>

      </Routes>
    

    </div>

    
  
  )
}

export default App
