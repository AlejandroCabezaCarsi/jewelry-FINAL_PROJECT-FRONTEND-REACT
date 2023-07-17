import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Body } from './pages/body/Body'
import { Header } from './common/Header/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Body/>
    </>
  )
}

export default App
