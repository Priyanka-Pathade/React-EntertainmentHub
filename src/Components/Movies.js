import React, { useState,useEffect } from 'react'
import axios from 'axios'
import SingleContent from './SingleContent';
import CustomPagination from './CustomPagination';
import Genres from './Genres.js';
import useGenre from '../Hooks/useGenre.js';

function Movies() {

  const [page,setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setnumOfPages] = useState()
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async ()=>{
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=e49ad01b738b930fe205087c472133c5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
      setContent(data.results);
      setnumOfPages(data.total_pages);
      // console.log(data)
  }
  useEffect(() => {
    fetchMovies();
    //getting missing dependencies warning so add below line
    // eslint-disable-next-line
  },[page,genreforURL])
  
  return (
    <div>
      <span className='pageTitle'>Movies</span>
      <Genres type="movie" setPage={setPage} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} />
      <div className="trending">
        {/* if first check if there is anything inside content , if yes then only map this */}
        {
            content && content.map((c)=>
            // passing this fileds as a props to SingleContent component
            <SingleContent  key={c.id} id={c.id} poster={c.poster_path}
                title={c.title || c.name} date={c.first_air_date || c.release_date} media_type="movie"
                vote_average={c.vote_average}
            />
            )
        }
      </div>
      {/* display only if numOfPages >1 */}
      {numOfPages >1 &&(
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Movies
