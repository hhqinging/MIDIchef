// import * as React from "react";
// import { styled, makeStyles } from "@mui/material/styles";
// import { Link } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// import AudioPlayer from "material-ui-audio-player";
// import { backdropClasses } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function PlayerCard() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "pink" }}>
//       <CardContent sx={{ flex: "1 0 auto" }}>
//         <Link href="#" component="div" variant="h5" underline="none">
//           Song title
//         </Link>
//         <Link
//           href="#"
//           variant="subtitle1"
//           color="text.secondary"
//           component="div"
//           underline="none"
//         >
//           Song creator
//         </Link>
//       </CardContent>
//       <CardMedia
//         component="img"
//         height="194"
//         image="https://images.unsplash.com/photo-1649044750195-c5d73df24521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
//       />
//       <CardContent>
//         <AudioPlayer
//           autoplay={false}
//           preload="auto"
//           loop={false}
//           src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//           // useStyle={useStyles}
//         />
//       </CardContent>

//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         {/* <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton> */}

//       </CardActions>
//     </Card>
//   );
// }
