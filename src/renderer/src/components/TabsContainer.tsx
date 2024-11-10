import { Tab, Box, Tabs, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tab1 from './Tabs/Tab1'
import Tab2 from './Tabs/Tab2'
import Tab3 from './Tabs/Tab3'

export interface tabData {
  id: number
  value: number
}
const TabContainer: React.FC = () => {
  const [value, setValue] = React.useState(0)
  const [tabValues, setTabValues] = useState<tabData[]>()

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }
  useEffect(() => {
    try {
      const tabValuesFromStorage = localStorage.getItem('tabData')
      if (tabValuesFromStorage) {
        const tabData: tabData[] = JSON.parse(tabValuesFromStorage).sort(
          (a: tabData, b: tabData) => a.id - b.id
        ) as tabData[]
        setTabValues(tabData)
        console.log(tabValues)
      }
    } catch (err) {
      console.log('Could not parse tab data')
    }
  }, [])
  if (!tabValues) {
    return 'Pending '
  }
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanelWrapper value={value} index={0}>
        <Tab1 data={tabValues[0]} index={0} />
      </TabPanelWrapper>
      <TabPanelWrapper value={value} index={1}>
        <Tab2 data={tabValues[1]} index={1} />
      </TabPanelWrapper>
      <TabPanelWrapper value={value} index={2}>
        <Tab3 data={tabValues[2]} index={2} />
      </TabPanelWrapper>
    </>
  )
}

export default TabContainer

interface TabPanelWrapperProps {
  children?: React.ReactNode
  index: number
  value: number | undefined
}
const TabPanelWrapper: React.FC<TabPanelWrapperProps> = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}
