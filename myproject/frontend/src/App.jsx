import { Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './AuthContext'
import Navbar from './Navbar'
import Home from './Home'
import WordDetail from './WordDetail'
import MyWords from './MyWords'
import WordOfTheDay from './WordOfTheDay'
import NotFound from './NotFound'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import Collections from './Collections'
import CollectionDetail from './CollectionDetail'
import Quiz from './Quiz'
import Dashboard from './Dashboard'

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-1 pt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/WordDetail" element={<WordDetail />} />
            <Route path="/WordOfTheDay" element={<WordOfTheDay />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/MyWords" element={<MyWords />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:id" element={<CollectionDetail />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
