import React,{useEffect} from 'react'
  import Chart from '/node_modules/chart.js/auto' 
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
  import {Box}from '@mui/material'
  import {useSelector,useDispatch}from 'react-redux'
  import { GetPuchase } from '../../redux/actions';

  
  function GraficoViewMain() {
    const Dispacth=useDispatch()
    useEffect(()=>{
      Dispacth(GetPuchase())
    },[])
    const DataUsers=useSelector((s)=>s.UserTop)
    const Users=useSelector((U)=>U.user)
    const Videogame=useSelector((G)=>G.games)
    const Purchaseds=useSelector((P)=>P.Purchase)
    const Userlength=Users.length
    const Videogamelength=Videogame.length
    const Purchasedlength=Purchaseds.length 
    const DataUser= DataUsers.slice(0,5)
    const Dataextru=DataUser?.map((y)=>{
        return {
            photo: y?.photo,
            name: y?.name,
            nickname: y?.nickname,
            purchasedLength: y?.purchased.length,
            totalAmount: y?.purchased.reduce((sum, purchase) => sum + purchase.amount, 0).toFixed(1)
        }
    })

      const CatidadPormes=(dataArray)=>{
        const sumasPorMes = {};
        dataArray.forEach((obj) => {

          const mes = new Date(obj.date).getMonth() + 1;  
          
          if (!sumasPorMes[mes]) {
            sumasPorMes[mes] = 0;
          }
          if (obj.Videogames) {
            sumasPorMes[mes] += obj.Videogames.length;
          }
        });   
        const arraySumas = Array.from({ length: 12 }, (_, index) => sumasPorMes[index + 1] || 0);   

        return arraySumas;
      }
     const lafuncion=CatidadPormes(Purchaseds)
     const CatidadPormesUser=(dataArray)=>{
      const cantidadPorMes = {};
      dataArray.forEach((obj) => {
        const mes = new Date(obj.createdAt).getMonth() + 1; 
        if (!cantidadPorMes[mes]) {
          cantidadPorMes[mes] = 0;
        }
        cantidadPorMes[mes]++;
      });
      const arrayCantidades = Array.from({ length: 12 }, (_, index) => cantidadPorMes[index + 1] || 0);
      return arrayCantidades;
     }
     const Usermes=CatidadPormesUser(Users)

      function createData(Photo, Name, Nickname, amountPurchases, amountProvided) {        
        return { Photo, Name, Nickname, amountPurchases , amountProvided  };
      }
    const rows = Dataextru.map((u)=>{
         return(
             createData(u?.photo,u?.name, u?.nickname,u?.purchasedLength , u?.totalAmount)
         );  
    }) 
    
    ;
    useEffect(() => {
        const ctx = document.getElementById('GhRAPHICS').getContext('2d');
      
        new Chart(ctx, {
          type: 'line',  
          data: {
            labels: ['Enero','Febrero','Marzo','Abril','Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre'],
            datasets: [{
              label: 'Purchaseds',
              data: lafuncion,
              fill: true, // Habilitar relleno
              backgroundColor: 'rgba(144, 202, 249, 0.4)',
              borderWidth: 1, 
              borderRadius: 20,
              borderColor: '#0d47a1',
              pointBackgroundColor: 'white', // Color de los puntos de intersección
              pointRadius: 5  // Cambiado el color del borde
            },
            {
                label: 'Users',
                data: Usermes,
                fill: true, // Habilitar relleno
                backgroundColor: 'rgba(229, 57, 53,0.6)',
                borderWidth: 1, 
                borderRadius: 20,
                borderColor: '#b71c1c',
                pointBackgroundColor: 'white', // Color de los puntos de intersección
                pointRadius: 5
            }
        ]
          },
          options: {
            scales: {
              x: {
                display: true,
                color: '#fff', // Color del texto en el eje x
              },
              y: {
                beginAtZero: true,
                display: true,
                color: '#fff', // Color del texto en el eje y
              }
            },
            plugins: {
              legend: {
                display: true,
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
      }, []);
      useEffect(() => {
        const ctx = document.getElementById('doughnutChart').getContext('2d');

        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Users', 'Videogame', 'Purchase'],
            datasets: [{
              label: 'My Dataset',
              data: [Userlength, Videogamelength, Purchasedlength],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',

              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Doughnut Chart Example'
              }
            }
          }
        });
      }, []);
      
      const BoxGraphis={
        display:'flex',
        justifyContent:'space-evenly',
        width:'100%',
        flexWrap:'wrap'
   
       }
      const GraphicOne={
        backgroundColor:'#90a4ae',//#37474f
        padding:'2em',
        borderRadius:'1em',

       }
       const GraphicTwo={
        backgroundColor:'#90a4ae',
        padding:'2em',
        borderRadius:'1em',


       }
       const canvaStyleOne={

        width:'240%'
     
       }
       const canvaStyleTwo={
  
        width:'120%'
     
       }
       const StylePhoto={
        width:'4em',
        borderRadius:'50%'
       }
       const StyleTop={
        width:'46em',
       }
  return (
    <Box>
        <Box style={BoxGraphis} gap={2}>
            <Box style={GraphicOne}>
                <Typography variant='p' style={{color:'white',fontSize:'115%',fontWeight:'bold'}}>
                Purchases and Users statistics by Month
                </Typography>
        <canvas  style={canvaStyleOne} id='GhRAPHICS' />
            </Box>
            <Box style={GraphicTwo}>
            <Typography variant='p' style={{color:'white',fontSize:'80%',fontWeight:'bold'}}>
            User,Shopping Cart,Videogames,Login
                </Typography>
            <canvas style={canvaStyleTwo} id="doughnutChart"></canvas>
            </Box>
        </Box>
        <Box   style={{backgroundColor:'#37474f',width:'49em',padding:'2em',borderRadius:'1em',margin:'1em 0em'}}>
            <Typography sx={{color:'#fff',fontWeight:'bold',fontSize:'2em'}}>
            Top 5 most purchased users 
            </Typography>
            <TableContainer sx={StyleTop} component={Paper}>
      <Table aria-label="caption table">
        <TableHead sx={{bgcolor:'#b0bec5'}}>
          <TableRow>
            <TableCell>Photo </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Nickname</TableCell>
            <TableCell align="right">Amount Purchases</TableCell>
            <TableCell align="right">Amount Provided</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{bgcolor:'#78909c'}}>
          {rows.map((row) => (
            <TableRow key={row.name} >
              <TableCell component="th" scope="row">
                <img src={row.Photo} alt={row.Name} style={StylePhoto} />
              </TableCell>
              <TableCell align="right" sx={{color:'#fff'}}>{row.Name}</TableCell>
              <TableCell align="right" sx={{color:'#fff'}}>{row.Nickname}</TableCell>
              <TableCell align="right" sx={{color:'#fff'}}>{row.amountPurchases}</TableCell>
              <TableCell align="right" sx={{color:'green',fontWeight:'bold'}}>$/{row.amountProvided}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    </Box>
  )
}

export default GraficoViewMain