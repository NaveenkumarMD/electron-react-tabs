import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

window.electron.ipcRenderer.on('tabData', (_event, data) => {
  localStorage.setItem('tabData', JSON.stringify(data))
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
