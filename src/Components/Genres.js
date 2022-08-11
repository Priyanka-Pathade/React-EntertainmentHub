import { Chip } from '@mui/material';
import axios from 'axios'
import { useEffect } from 'react';

const Genres = ({ selectedGenres, setSelectedGenres,
    genres, setGenres,
    type, setPage})=>{

        //when we select any chip in movies page then that genre will get added in selected genre
        //and it will get removed from that genres array
        const handleAdd = (genre)=>{
            // console.log(selectedGenres);
            setSelectedGenres([...selectedGenres,genre]);
            // console.log("genre added")
            //remove from genres
            setGenres(genres.filter((g)=>g.id !== genre.id ));
            //set page to 1
            setPage(1);
        }
        
        const handleRemove = (genre) => {
            //removing genre from selected genre array 
            setSelectedGenres(
              selectedGenres.filter((selected) => selected.id !== genre.id)
            );
            //adding it again to genre array
            setGenres([...genres, genre]);
            setPage(1);
          };

        
        // console.log(selectedGenres)
        const fetchGenres= async()=>{
          const {data} = await axios.get(`
            https://api.themoviedb.org/3/genre/movie/list?api_key=e49ad01b738b930fe205087c472133c5&language=en-US`
            );
            // console.log(data.genres)
            setGenres(data.genres);
        }
        // console.log(genres);
        useEffect(() => {
          fetchGenres();
          //whenever we are changing page we want this genre component should unmount
          //i.e. it should cancel the API call, although it is not imp but it is a good practice
          return()=>{
            setGenres({});
          };
           // eslint-disable-next-line
        }, []);
        
        return (
        <div style={{ padding: "6px 0" }}>
            {/* if is array then only we can map it */}
            {
             Array.isArray(selectedGenres) ?  selectedGenres.map((genre)=>(
                <Chip label={genre.name} variant="outlined" key={genre.id} size="small" 
                style={{margin:2, color:'white', backgroundColor:'blue'}}clickable 
                onDelete={()=>handleRemove(genre)}
                />)) 
                : null 
            }
            {
             Array.isArray(genres) ?  genres.map((genre)=>(
                <Chip label={genre.name} variant="outlined" key={genre.id} size="small" 
                style={{margin:2, color:'black', backgroundColor:"white"}}
                onClick={() => handleAdd(genre)}  clickable 
                />)) 
                : null 
            }
        </div>
        );
};
export default Genres;