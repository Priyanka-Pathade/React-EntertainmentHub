import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react';
import SingleContent from './SingleContent';
import '../Styles/Trending.css';

function Trending() {
    const [content, setContent] = useState([]);

    const fetchTrending = async ()=>{
        const{data} =await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=e49ad01b738b930fe205087c472133c5`);
        console.log(data)
        setContent(data.results);
    }
    useEffect(() => {
      fetchTrending();
    },[])
    
  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className="trending">
        {/* if first check if there is anything inside content , if yes then only map this */}
        {
            content && content.map((c)=>
            // passing this fileds as a props to SingleContent component
            <SingleContent key={c.id} id={c.id} poster={c.poster_path}
                title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type}
                vote_average={c.vote_average}
            />
            )
        }
      </div>
    </div>
  )
}

export default Trending
