import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageMusic } from './routes/pageMusic'
import { Home } from '../src/routes/Home'
import '../src/style/global.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/track/:artistId/:musicId' element={<PageMusic />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
