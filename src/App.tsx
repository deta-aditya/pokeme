import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PokemonDetail } from './PokemonDetail'
import { MyPokemons } from './MyPokemons'
import { Home } from './Home'
import { OwnedPokemonsProvider } from './contexts/owned-pokemons'

function App() {
  return (
    <OwnedPokemonsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/my-pokemons" element={<MyPokemons/>} />
          <Route path="/pokemons/:name" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </OwnedPokemonsProvider>
  )
}

export default App
