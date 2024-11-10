import { Typography } from '@mui/material'
import TabContainer from './components/TabsContainer'

function App(): JSX.Element {
  return (
    <>
      <Typography variant="h2">Tabs are rendered below</Typography>
      <TabContainer />
    </>
  )
}

export default App
