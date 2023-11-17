import { Card, CardContent, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import GamesIcon from '@mui/icons-material/Games';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function About() {
  
  return (
    <Stack container sx={{minHeight: '85vh', display:'flex', flexDirection: 'colum', textAlign:'center', backgroundImage:`url('https://th.bing.com/th/id/R.5eca9af824ce557d667fe29298d474bd?rik=28WwQq7GYHkyLw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-sj-ah7PMCvk%2fUeDD4EQkAqI%2fAAAAAAAAABo%2fQfKKgI5rw7w%2fs1600%2fClasicos.png&ehk=q%2f2JDoqvpFzVKsmYUdE%2fxl%2bFKx6x2vRv3EISg1YaI1A%3d&risl=&pid=ImgRaw&r=0')`}}>
      <Stack sx={{display:'flex', marginLeft:'20px', marginRight:'20px', marginTop:'10px'}}>
        <Card sx={{ backgroundColor:' rgba(255, 255, 255, 0.8)', transition: 'transform 0.3s','&:hover': {transform: 'scale(1.02)',}}}>
          <CardContent>
            <SportsEsportsIcon sx={{fontSize:'50px', color:'#1a2a3b'}} />
            <Typography variant="h3" sx={{marginBottom:'20px'}}>Welcome to Arcade World!</Typography>
            <Typography variant="body1" >
              Arcade World is a virtual paradise for all video game lovers. Upon
              entering the site, you are met with a vibrant and dynamic design
              that captures the essence of the fun and excitement of video
              games. The homepage features a variety of featured games, from
              retro classics to the latest releases. Each game comes with a
              detailed description, screenshots and user reviews to help you
              make an informed decision. At Arcade World, you can search for
              games by genre, platform or even by developer. We also offer an
              "Upcoming Releases" section where you can view the most
              anticipated games and pre-order them. Arcade World prides itself
              on excellent customer service. If you have any questions or
              problems, our support team is always ready to help. So whether
              you're a casual gamer or a video game enthusiast, Arcade World has
              something for you. Come and immerse yourself in the exciting world
              of video games with Arcade World!
            </Typography>
          </CardContent>
        </Card>
      </Stack>
      <Grid container>
        <Grid item sm={5} sx={{margin:'20px',  marginRight:'100px'}}>
            <Card  sx={{backgroundColor:' rgba(255, 255, 255, 0.8)', height:'100%', transition: 'transform 0.3s','&:hover': {transform: 'scale(1.05)',}}}>
              <CardContent>
                <QuestionMarkIcon sx={{color:'#1a2a3b', fontSize:'50px'}} />
                <Typography variant="h4" sx={{marginBottom:'20px'}}>Mission of Arcade World</Typography>
                <Typography variant="body1" >
                  Operation Retro Game Rescue At Arcade World, we have
                  discovered that some of our treasured retro games have
                  mysteriously disappeared from our library. Your mission,
                  should you choose to accept it, is to help us recover these
                  games. To achieve this, you will have to navigate through the
                  vast world of Arcade World, exploring different genres and
                  platforms. You'll have to interact with other users and review
                  their reviews to gather clues about the whereabouts of the
                  lost games. Once you have gathered enough clues, you can start
                  searching for the missing games. But be careful, some games
                  may be protected by challenges and riddles that you will have
                  to solve! If you manage to recover all the retro games, you
                  will be rewarded with a place in our Arcade World Hall of Fame
                  and receive a pack of gaming accessories. Good luck on your
                  mission, gamer, the world of Arcade World is counting on you!
                </Typography>
              </CardContent>
            </Card>
        </Grid>
        <Grid item sm={5} sx={{margin: '20px', marginLeft:'100px'}}>
          <Card  sx={{backgroundColor:' rgba(255, 255, 255, 0.8)', height:'100%', transition: 'transform 0.3s','&:hover': {transform: 'scale(1.05)',}}}>
            <CardContent>
              <VisibilityIcon sx={{color:'#1a2a3b', fontSize:'50px'}} />
              <Typography variant="h4" sx={{marginBottom:'20px'}}>Vision of Arcade World</Typography>
              <Typography variant="body1" >
                Imagine a digital universe, a cosmos of codes and pixels, where
                every star is a video game waiting to be discovered. This is
                Arcade World, an ever-expanding universe of interactive
                adventures. At the center of this universe, you will find the
                home page, a kaleidoscope of colors and shapes that constantly
                changes to reflect the most popular games and the latest
                releases. Here, classic retro games coexist with the latest
                innovations in the world of gaming. Arcade World's galaxies are
                organized by genre, platform and developer, making it easy to
                navigate this vast universe. Each game is like a planet to be
                discovered, with its own story, characters and challenges. In
                addition to games, Arcade World also houses a variety of
                accessories to enhance your gaming experience. From controllers
                to headsets, each item is like a tool to help you on your
                journey through the gaming universe. In short, Arcade World is
                not just an online video game store. It's an ever-expanding
                universe of interactive adventures, a community of gamers and a
                resource for all things gaming - come join the fun!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default About;
