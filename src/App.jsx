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
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 2,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 3,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 4,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279",
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 5,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 6,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 7,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 8,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 9,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"
  },
  {
    title: "Lorem ipsum dolor sit",
    number: 10,
    poster: "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"
  }
];

useEffect(() => {

    if(!userQuery) {return}

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
  
  if(!data.Search) {
    setIsError(true)
  }
 
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
