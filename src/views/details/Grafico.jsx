import React,{useEffect} from "react";
import Chart from '/node_modules/chart.js/auto'
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { gameById } from "../../redux/actions";

function Grafico() {
  const dispatch= useDispatch()
  const gameDetails = useSelector((state) => state?.gameId);
  const { id } = useParams();
  useEffect(() => {
    dispatch(gameById(id));
  }, [dispatch, id]);
  const Stargraphics= gameDetails?.graphics?.stars//[]
  const scoregraphics= gameDetails?.graphics?.score
  const Stargameplay= gameDetails?.gameplay?.stars
  const scoregameplay= gameDetails?.gameplay?.score
  const Starquality_price= gameDetails?.quality_price?.stars
  const scorequality_price= gameDetails?.quality_price?.score
   useEffect(() => {
      const ctx = document.getElementById('GRAPHICS').getContext('2d');

      const uno = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['5','4','3','2','1'],
          datasets: [{
            label: 'Stars',
            data: Stargraphics,
            backgroundColor: '#4CAF50', 
            borderWidth: 1, 
            borderRadius: 20,
            barThickness: 16,
            borderColor: 'rgba(75, 192, 192, 1)',
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              display: false, 
            },
            y: {
              beginAtZero: true,
              display: true, 
            }
          },
          plugins: {
            legend: {
              display: false, 
            }
          },
          layout: {
            padding: {
              top: 0,
              bottom: 0, 
            }
          }
        }
      });
      return () => {
        uno.destroy()
      }
    }, [Stargraphics]);

    useEffect(() => {
      const ctx = document.getElementById('GAMEPLAY').getContext('2d');

      const dos = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['5','4','3','2','1'],
          datasets: [{
            label: 'Stars',
            data:Stargameplay,
            backgroundColor: '#4CAF50',
            borderWidth: 1, 
            borderRadius: 20,
            barThickness: 16,
            borderColor: 'rgba(75, 192, 192, 1)',
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              display: false, 
            },
            y: {
              beginAtZero: true,
              display: true, 
            }
          },
          plugins: {
            legend: {
              display: false, 
            }
          },
          layout: {
            padding: {
              top: 0, 
              bottom: 0, 
            }
          }
        }
      });
      return () => {
        dos.destroy()
      }
    }, [Stargameplay]);

    useEffect(() => {
      const ctx = document.getElementById('QUALITYPRICE').getContext('2d');

     const tres = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['5','4','3','2','1'],
          datasets: [{
            label: 'Stars',
            data: Starquality_price,
            backgroundColor: '#4CAF50', 
            borderWidth: 1, 
            borderRadius: 20,
            barThickness: 16,
            borderColor: 'rgba(75, 192, 192, 1)',
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              display: false, 
            },
            y: {
              beginAtZero: true,
              display: true, 
            }
          },
          plugins: {
            legend: {
              display: false, 
            }
          },
          layout: {
            padding: {
              top: 0, 
              bottom: 0, 
            }
          }
        }
      });
      return () => {
        tres.destroy()
      }
    }, [Starquality_price]);

    

    const estilos={
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap:'wrap'
    }
    const estilosG={
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width:'300px',

    }
    const estiloss={
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'column'
    }
      return (  <div>
        <Box display='flex' sx={estilos} gap={12}>
          <Box sx={estilosG}>
            <div style={estiloss}>
              <h2 style={{margin:'0'}}>{scoregraphics}</h2>
              <p>Graphics</p>
            </div>
            <canvas id="GRAPHICS" ></canvas>
          </Box>
          <Box sx={estilosG}>
            <div style={estiloss}>
              <h2 style={{margin:'0'}}>{scoregameplay}</h2>
              <p>Game play</p>
            </div>
            <canvas id="GAMEPLAY" ></canvas>
          </Box>
          <Box sx={estilosG}>
            <div style={estiloss}>
              <h2 style={{margin:'0'}}>{scorequality_price}</h2>
              <p>Quality Price</p>
            </div>
            <canvas id="QUALITYPRICE" ></canvas>
          </Box>
        </Box>
      </div>)
}

export default Grafico

