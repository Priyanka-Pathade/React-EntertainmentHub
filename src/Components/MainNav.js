import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import TVIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function SimpleBottomNavigation() {
    //in useState it states 0-trending, 1-movies, 2-Tv series, 3-search
  const [value, setValue] = useState(0);
  const history = useHistory();
  //if we select movies then it shoild push/1 to our url, and for Tv series /2, and for search /3
  //but to load this movies, series and search component we have to add this names to url as we have defined this paths in App.js file
  //so write logic for that
  useEffect(() => {
    if(value===0)history.push("/");
    else if (value===1) history.push("/movies");
    else if (value===2) history.push("/series");
    else if (value===3) history.push("/search");
  }, [value,history])
  
  return (
    <Box sx={{ 
        width: 500,
        position:'fixed',
        bottom:0,
        backgroundColor:'black',
        zIndex:100 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} style={{color:"black"}} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} style={{color:"black"}} />
        <BottomNavigationAction label="TV Series" icon={<TVIcon />} style={{color:"black"}}/>
        <BottomNavigationAction label="Nearby" icon={<SearchIcon />} style={{color:"black"}}/>

      </BottomNavigation>
    </Box>
  );
}
