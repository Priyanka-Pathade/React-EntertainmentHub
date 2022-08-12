import React,{useState,useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { img_300, img_500,unavailable,noPicture } from '../config/config.js';
import '../Styles/Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type,id}) => {
    const [credits, setCredits] = useState()

    const items = (credits && credits.map((c) => (
        <div className="carouselItem">
          <img
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
            alt={c?.name}
            onDragStart={handleDragStart}
            className="carouselItem__img"
          />
          <b className="carouselItem__txt">{c?.name}</b>
        </div>
      )));

      const responsive = {
        // if 0px means screen size is very small then display 3 items
        0: {
          items: 3,
        },
        // if 512px then display 5 items
        512: {
          items: 5,
        },
        // if more than 1024px then display 7 items
        1024: {
          items: 7,
        },
      };


    // this api will fetch credits for movie or tv series
    const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=e49ad01b738b930fe205087c472133c5&language=en-US`
        );
        setCredits(data.cast);
      };
      useEffect(() => {
        fetchCredits();
      }, [])
      
  return (
    <AliceCarousel autoPlay 
     responsive={responsive}
     infinite
     mouseTracking 
     items={items}
     disableButtonsControls
     disableDotsControls
     />
  );
}

export default Carousel;