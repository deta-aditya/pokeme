import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PokemonDetail } from './PokemonDetail'
import { MyPokemons } from './MyPokemons'
import { Home } from './Home'
import { AppThemeProvider } from './contexts/app-theme'
import { OwnedPokemon, OwnedPokemonsProvider } from './contexts/owned-pokemons'
import { StoredOwnedPokemon, useLocalStorageOwnedPokemons } from "./storage/local-storage";

function App() {
  const { loadFromStorage, saveToStorage } = useLocalStorageOwnedPokemons({ initialValue: [] })

  const loadPokemons = () => {
    return new Promise<OwnedPokemon[]>((resolve) => {
      const storedPokemons = loadFromStorage()
      const ownedPokemons = storedPokemons.map(pokemon => pokemon as OwnedPokemon)
      resolve(ownedPokemons)
    })
  }

  const savePokemons = (pokemons: OwnedPokemon[]) => {
    return new Promise<void>((resolve) => {
      const toBeStoredPokemons = pokemons.map(pokemon => pokemon as StoredOwnedPokemon)
      saveToStorage(toBeStoredPokemons)
      resolve()
    })
  }

  return (
    <AppThemeProvider>
      <OwnedPokemonsProvider 
        loadPokemons={loadPokemons}
        savePokemons={savePokemons}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/my-pokemons" element={<MyPokemons/>} />
            <Route path="/pokemons/:name" element={<PokemonDetail />} />
          </Routes>
        </BrowserRouter>
      </OwnedPokemonsProvider>
    </AppThemeProvider>
  )
}

export default App
