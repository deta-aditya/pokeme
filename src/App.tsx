import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { MyPokemons } from './MyPokemons'
import { Home } from './Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/my-pokemons" element={<MyPokemons/>} />
        <Route path="/pokemons/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

function PokemonDetail() {
  const params = useParams<'name'>()

  return (
    <div>
      Detail for {params.name}
    </div>
  )
}

export default App
