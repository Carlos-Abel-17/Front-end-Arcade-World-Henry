import News from './components/News'
import MoreDownload from './components/MoreDownload'
import Rating from './components/Rating'
import {useDispatch,useSelector}from 'react-redux'
import { getGames } from "../../redux/actions"
import { useEffect } from "react"
import Carrusel from './components/Carrusel.jsx';
import { Box, Container, Typography, Stack } from '@mui/material';
import FloatingBtn from '../../components/floatingButton/FloatinBtn.jsx'
import GradeIcon from '@mui/icons-material/Grade';
import DownloadingIcon from '@mui/icons-material/Downloading';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const Home = () => {
  const dispatch = useDispatch()
  const game = useSelector((g)=>g?.games)
  
  useEffect(()=>{
   dispatch(getGames())
  },[dispatch])

  const NewsGame =game?.slice(0,5)
  const DownloadsGame=game?.slice(7,12)
  const RatingGame = game?.slice(14,19) 
  const IMGcarrusel=game?.slice(40,50)

  return (
    <Box bgcolor="#1a2a3b">
    <Container maxWidth="xl">
      <Box width="95%" margin="0 2em">
        <Carrusel imagenes={IMGcarrusel}  />
      </Box>
      <Typography variant="h3" component="h3" className="titulo" textAlign="center" color="beige" sx={{ margin: '1em 0em' }}>
      <GradeIcon style={{ fontSize: 40 }}/>NEWS<GradeIcon style={{ fontSize: 40 }}/>
      </Typography>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        {NewsGame?.map((games) => (
          <News
          key={games?.id}
          id={games?.id}
          name={games?.name}
          image={games?.image}
          price={games?.price}
          />
          ))}
      </Box>

      <Typography variant="h3" sx={{ margin: '1em 0em' }} component="h3" className="titulo" textAlign="center" color="beige">
      <DownloadingIcon style={{ fontSize: 40 }}/>DOWNLOADS<DownloadingIcon style={{ fontSize: 40 }}/>
      </Typography>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        {DownloadsGame?.map((games) => (
          <MoreDownload
            key={games?.id}
            id={games?.id}
            name={games?.name}
            image={games?.image}
            price={games?.price}
          />
        ))}
      </Box>

      <Typography variant="h3" sx={{ margin: '1em 0em' }} component="h3" className="titulo" textAlign="center" color="beige">
      <TrendingUpIcon style={{ fontSize: 40 }}/>RATING<TrendingUpIcon style={{ fontSize: 40 }}/>
      </Typography>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" paddingBottom='35px'>
        {RatingGame?.map((games) => (
          <Rating
            key={games?.id}
            id={games?.id}
            name={games?.name}
            image={games?.image}
            price={games?.price}
          />
        ))}
      </Box>
    </Container>
    <Stack>
    <FloatingBtn/>
    </Stack>
  </Box>
  )
}

export default Home