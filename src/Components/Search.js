import React,{useState,useEffect} from 'react';
import { TextField } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Tab, Tabs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from './SingleContent';
import CustomPagination from './CustomPagination';

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  //use this in ThemeProvider
  const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
          main: "#fff",
        },
      },
  });

  const fetchSearch = async () => {
    try {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=e49ad01b738b930fe205087c472133c5&language=en-US&page=${page}&include_adult=false`
      );
      // setContent(data.results);
      // setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      {/* <span className="pageTitle">Search</span> */}
      <ThemeProvider theme={darkTheme}>
        <div style={{display:"flex",margin:'15px 0'}}>
          <TextField
            style={{ flex: 1 }} 
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e)=>setSearchText(e.target.value)}
          />
          <Button variant='contained' style={{marginLeft:10}}onClick={fetchSearch} >
            <SearchIcon />
          </Button>
        </div>
        <Tabs value={type} indicatorColor='primary' textColor='primary'
          onChange={(event, newValue) => {
            //if tab = search movies then type=0, and if search TV series then type=1
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab  style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {/* if first check if there is anything inside content , if yes then only map this */}
        {
            content && content.map((c)=>
            // passing this fileds as a props to SingleContent component
            <SingleContent  key={c.id} id={c.id} poster={c.poster_path}
                title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={type?"tv":"movie"}
                vote_average={c.vote_average}
            />
            )
        }
        {/* if for perticular searched value we didn't find any movie or series */}
        {
          searchText && !content && (type?<h2>No Series Found</h2>:<h2>No Movies Found</h2>)
        }
      </div>
      {/* display only if numOfPages >1 */}
      {numOfPages >1 &&(
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search
