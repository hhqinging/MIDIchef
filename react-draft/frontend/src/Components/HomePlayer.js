import React from "react";
import "../css/Homeplayer.css";
import picture from "../img/sign.jpeg";
import play from "../img/play.png";
import algo from "../img/algo.png";
import heart from "../img/heart.png";
import play1 from "../img/play1.png";
import edit from "../img/edit.png";

const HomePlayer = (props) => (
  <div className="main-musicgeneral">
    <img src={picture} className="table_background" alt="" />
    <div className="table_mainplayer">
      <div className="display_bar">
        <div className="title_main">
          <strong>SIGN</strong>
        </div>
        <div className="creater_main">MIDIcat</div>
      </div>
      <div className="playbar">
        <div>
          <img src={play} className="play" alt="" />
        </div>
        <div className="time">
          <strong>00:35</strong>
        </div>
        <img src={algo} className="algo" alt="" />
        <div className="price">
          <strong>1 Algo</strong>
        </div>
      </div>
      <div>
        <div className="music_detail">
          <div>
            <img src={heart} className="heart" alt="" />
          </div>
          <div className="music_info">300</div>
          <div>
            <img src={play1} className="play1" alt="" />
          </div>
          <div className="music_info">7000</div>
          <div>
            <img src={edit} className="edit" alt="" />
          </div>
          <div className="music_info">7 days ago</div>
        </div>
      </div>
    </div>
  </div>
);
export default HomePlayer;



// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import Grid from '@mui/material/Grid';


// export default function HomePlayer() {
//   const theme = useTheme();

//   return (
//     <div>

//       <div>
//         <Grid container style={{ gap: 15 , padding: 15 }} >
//           <Card sx={{ display: 'flex' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flex: '1 0 auto' }}>
//                 <Typography component="div" variant="h5">
//                   Live From Space
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                   Mac Miller
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//                 <IconButton aria-label="previous">
//                   {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//                 </IconButton>
//                 <IconButton aria-label="play/pause">
//                   <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//                 </IconButton>
//                 <IconButton aria-label="next">
//                   {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//                 </IconButton>
//               </Box>
//             </Box>
//             <CardMedia
//               component="img"
//               sx={{ width: 151 }}
//               image={picture}
//             />
//           </Card>

//           <Card sx={{ display: 'flex' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flex: '1 0 auto' }}>
//                 <Typography component="div" variant="h5">
//                   Live From Space
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                   Mac Miller
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//                 <IconButton aria-label="previous">
//                   {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//                 </IconButton>
//                 <IconButton aria-label="play/pause">
//                   <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//                 </IconButton>
//                 <IconButton aria-label="next">
//                   {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//                 </IconButton>
//               </Box>
//             </Box>
//             <CardMedia
//               component="img"
//               sx={{ width: 151 }}
//               image={picture}
//             />
//           </Card>

//           <Card sx={{ display: 'flex' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flex: '1 0 auto' }}>
//                 <Typography component="div" variant="h5">
//                   Live From Space
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                   Mac Miller
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//                 <IconButton aria-label="previous">
//                   {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//                 </IconButton>
//                 <IconButton aria-label="play/pause">
//                   <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//                 </IconButton>
//                 <IconButton aria-label="next">
//                   {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//                 </IconButton>
//               </Box>
//             </Box>
//             <CardMedia
//               component="img"
//               sx={{ width: 151 }}
//               image={picture}
//             />
//           </Card>

//         </Grid>
//       </div>

//       <div>
//         <Grid container style={{ gap: 15 ,padding: 15 }} >
//           <Card sx={{ display: 'flex' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flex: '1 0 auto' }}>
//                 <Typography component="div" variant="h5">
//                   Live From Space
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                   Mac Miller
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//                 <IconButton aria-label="previous">
//                   {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//                 </IconButton>
//                 <IconButton aria-label="play/pause">
//                   <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//                 </IconButton>
//                 <IconButton aria-label="next">
//                   {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//                 </IconButton>
//               </Box>
//             </Box>
//             <CardMedia
//               component="img"
//               sx={{ width: 151 }}
//               image={picture}
//             />
//           </Card>

//           <Card sx={{ display: 'flex' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flex: '1 0 auto' }}>
//                 <Typography component="div" variant="h5">
//                   Live From Space
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                   Mac Miller
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//                 <IconButton aria-label="previous">
//                   {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//                 </IconButton>
//                 <IconButton aria-label="play/pause">
//                   <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//                 </IconButton>
//                 <IconButton aria-label="next">
//                   {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//                 </IconButton>
//               </Box>
//             </Box>
//             <CardMedia
//               component="img"
//               sx={{ width: 151 }}
//               image={picture}
//             />
//           </Card>

//           <Card sx={{ display: 'flex' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flex: '1 0 auto' }}>
//                 <Typography component="div" variant="h5">
//                   Live From Space
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                   Mac Miller
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//                 <IconButton aria-label="previous">
//                   {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//                 </IconButton>
//                 <IconButton aria-label="play/pause">
//                   <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//                 </IconButton>
//                 <IconButton aria-label="next">
//                   {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//                 </IconButton>
//               </Box>
//             </Box>
//             <CardMedia
//               component="img"
//               sx={{ width: 151 }}
//               image={picture}
//             />
//           </Card>

//         </Grid>
//       </div>

//     </div>

//   );
// }
