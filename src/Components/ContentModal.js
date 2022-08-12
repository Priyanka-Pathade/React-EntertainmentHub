import React,{useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../Styles/SingleContent.css'
import { img_300, img_500,unavailable } from '../config/config.js';
import YouTubeIcon from "@material-ui/icons/YouTube";
import '../Styles/ContentModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: '#39445a',
  border: '1px solid #282c34',
  borderRadius: 10,
  color: "white",
  boxShadow: 24,
  p : 4,
};

// received props from SingleContent.js
export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([])
  const [video, setVideo] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //create fun to fetch API
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=e49ad01b738b930fe205087c472133c5&language=en-US`
    );
    setContent(data);
    // console.log(data);
  };
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=e49ad01b738b930fe205087c472133c5&language=en-US`
    );
        // console.log(data);
    setVideo(data.results[0]?.key);
  };
  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  return (
    <>
        {/* color inherit means inherit from parent? */}
     <div className='media' onClick={handleOpen}
        style={{cursor:"pointer"}} color="inherit">
        {children}
     </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <Box sx={style}>
                {content && (
                    <div className='ContentModal'>
                        <img src={content.poster_path?  `${img_300}/${content.poster_path}`: unavailable}
                            alt={content.name || content.title}
                            className="ContentModal__portrait"
                        />
                        {/* image for landscape mode */}
                        <img src={content.backdrop_path?  `${img_500}/${content.backdrop_path}`: unavailable}
                            alt={content.name || content.title}
                            className="ContentModal__landscape"
                        />
                        <div className='ContentModal__about'>
                            <span className='ContentModal__title'>
                                {/*printing name if it's series and title if it's movie and release date if present else dash(----)*/}
                                {/* in substring = from full date extracting just the date   */}
                            {content.name || content.title}
                            (
                                {(
                                content.first_air_date ||
                                content.release_date ||
                                "-----"
                                ).substring(0, 4)}    
                            )
                            </span>
                            {/* content tagline */}
                            {content.tagline && (
                                <i className="tagline">{content.tagline}</i>
                            )}
                            {/* content description */}
                            <span className="ContentModal__description">
                                {content.overview}
                            </span>
                            <div></div>
                            <Button
                                variant="contained"
                                startIcon={<YouTubeIcon />}
                                color="secondary"
                                target="__blank"
                                href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                Watch the Trailer
                            </Button>
                        </div>
                    </div>
                  
                )}
           </Box>
        </Fade>
      </Modal>
    </>
  );
}
