import { AppBar, Typography } from '@mui/material'
import Carlist from './components/Carlist'

export default function App() {

  return (
    <>
      <AppBar position='fixed'>
        <Typography variant='h6'>
          Carshop
        </Typography>
      </AppBar>

      <Carlist />
    </>
  )
}

