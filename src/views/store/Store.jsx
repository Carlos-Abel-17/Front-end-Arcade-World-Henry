import Sider from "../../components/sider/Sider"
import Cards from "../../components/cards/Cards";
import Paginate from '../../components/paginate/Paginate.jsx';
import usePage  from "../../components/utils/usePage";
import FloatingBtn from '../../components/floatingButton/FloatinBtn.jsx'
import { Stack } from "@mui/material";


function Store() {
  
    const {changeNext, changePrev, paginate, count, totPagine} = usePage();

  return (
    <Stack style={{backgroundColor:'#1a2a3b', minHeight:'100vh'}}>
      <Stack >
         <Sider/>
          <Cards games={paginate} />
        <Stack style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'1em'}}>
          <Paginate prevChange={changePrev} 
            nextChange={changeNext} 
            pages={count} 
            pageTotal={totPagine}
          />
          </Stack> 
      </Stack>
      <FloatingBtn/>
    </Stack>
  )
}

export default Store