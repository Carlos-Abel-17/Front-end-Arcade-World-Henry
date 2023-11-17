import { useState } from 'react'
import Login from './Login'
import Create from './Create'
import { Button, Stack, Typography } from '@mui/material'

export default function AuthLogin() {
  const [signUp, setSignUp] = useState(false)
  const [signIn, setSignIn] = useState(true)

  const handleSign = () => {
    setSignUp((elemento) => !elemento)
    setSignIn((elemento) => !elemento)
  }
  return (
    <Stack style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      {
        signIn === true ? (<Login/>) : (<Create handleSign={handleSign}/>)
      }
      {
        signIn === true ? 
        ( 
          <Stack>
            <Typography variant='body1'>No account? <Button color='primary' variant='text' onClick={handleSign}>Create one</Button></Typography>
          </Stack>
        )
        :
       ( 
        <Stack>
          <Typography mb={2} variant='body1'>Already have account? <Button color='primary' variant='text' onClick={handleSign}  className='btnCreate'>Sign in</Button></Typography>
        </Stack>
      )
      }
      
      
    </Stack>
  )
}
