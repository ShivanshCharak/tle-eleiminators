import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './global.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import Contest from './pages/Contest'

import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contests' element={<Contest/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
