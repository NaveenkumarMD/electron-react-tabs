import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tabData } from '../TabsContainer'

interface tabProps {
  data: tabData
  index: number
}
const Tab2: React.FC<tabProps> = (props) => {
  const [value, setValue] = useState<number>(props?.data?.value ?? 0)

  const sendDataThroughIPC = (value: number): void =>
    window.electron.ipcRenderer.send('updateTabValue', props.index, value)

  function handleBtnClick(): void {
    const nextValue = value + 1
    setValue(nextValue)
    sendDataThroughIPC(nextValue)
  }
  useEffect(() => {
    window.electron.ipcRenderer.send('newTab', props.index)
  }, [])
  return (
    <>
      <Typography variant="h4">Tab {props.index} Details </Typography>
      <br />
      <Typography variant="h5">{value}</Typography>
      <Button onClick={handleBtnClick}>Click </Button>
    </>
  )
}

export default Tab2
