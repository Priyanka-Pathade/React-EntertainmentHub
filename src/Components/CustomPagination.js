import React from 'react'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@material-ui/core/colors';

//use this in ThemeProvider
const darkTheme = createTheme({
    palette: {
        mode: "dark",
      },
});

function CustomPagination(props) {
    // whenever we change the page it should back to top and set the state
    const handlePageChange=(page) => {
        props.setPage(page);
        window.scroll(0,0);
    }

  return (
    //style for pagination
    <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}>
        <ThemeProvider theme={darkTheme}>
            <Pagination count={10} 
            onChange={(e)=>handlePageChange(e.target.textContent)}
            hideNextButton hidePrevButton color='primary'
            />
        </ThemeProvider>
    </div>
  )
}

export default CustomPagination
