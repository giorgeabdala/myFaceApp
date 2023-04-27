import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import ClientListChacra from "./components/ClientListChacraUi/clientListChacra";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <ClientListChacra />
  </React.StrictMode>,
)
