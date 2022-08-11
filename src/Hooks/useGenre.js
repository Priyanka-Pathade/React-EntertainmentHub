const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
  
     // extract all of the IDs of that genres
    const GenreIds = selectedGenres.map((g) => g.id);
        //reduce it to that perticular value that we need 
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
  };
  
  export default useGenre;