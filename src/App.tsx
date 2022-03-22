import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MyPokemons } from './MyPokemons'
import { Home } from './Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/my-pokemons" element={<MyPokemons/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
