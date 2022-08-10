import React from 'react'
import { img_300,unavailable } from '../config/config'
import '../Styles/SingleContent.css'
import Badge from '@mui/material/Badge';

function SingleContent(props) {
  return (
    <div className='media'>
        <Badge badgeContent={props.vote_average} color={props.vote_average>6 ? 'primary' : 'secondary'} />
        <img className='poster' src={props.poster ? `${img_300}/${props.poster}` : unavailable} alt={props.title} />
        <b className='title'>{props.title}</b>
        <span className='subTitle'>
            {props.media_type === "tv"? "TV Series": "Movie"}
            <span className="subTitle">{props.date}</span>
        </span>
    </div>
  )
}

export default SingleContent