import Slider from 'react-slick';
import PropTypes from "prop-types";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carrusel({imagenes}){
  const settings = {
    dots: true,
    infinite: true,
    speed: 9000, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    pauseOnHover: false,
    useTransform: true,
  };
  const images = imagenes?.map((h)=>{
    return{
      imagen:h.image,
      name:h.name
    }
  })
  return (
    <Slider {...settings}>
      {
        images?.map((i)=>{
          return(
            <div key={i.id}>
              <img src={i?.imagen}  style={{width:'100%',height:'30em'}} />
            <h2 style={{textAlign:'center',color:'white'}}>{i?.name}</h2>
            </div>
          )
        })
      }
    </Slider>
  )
}
Carrusel.propTypes= {
  imagenes: PropTypes.array.isRequired
}

export default Carrusel