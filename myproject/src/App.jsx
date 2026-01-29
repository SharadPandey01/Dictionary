import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import WordDetail from './WordDetail'
import MyWords from './MyWords'
import WordOfTheDay from './WordOfTheDay'
import RandomWord from "./RandomWord";
import NotFound from './NotFound'


function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 pt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MyWords" element={<MyWords />} />
          <Route path="/WordOfTheDay" element={<WordOfTheDay />} />
          <Route path="/WordDetail" element={<WordDetail />} />
          <Route path="/RandomWord" element={<RandomWord />} />
          <Route path="/MyWords" element={<MyWords />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
