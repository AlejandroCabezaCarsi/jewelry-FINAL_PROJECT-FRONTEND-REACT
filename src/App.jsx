import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Body } from './pages/Body/Body'
import { Header } from './common/Header/Header';
import { Footer } from './common/Footer/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Body/>
      <Footer/>
    </>
  )
}

export default App
