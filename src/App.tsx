import loadable from '@loadable/component'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppThemeProvider } from './contexts/app-theme'
import { OwnedPokemonsProvider } from './contexts/owned-pokemons'
import { createLocalStorageOwnedPokemons } from "./storage/local-storage";
import { PokemonIndexResourceProvider } from "./contexts/pokemon-index-resource";
import { PokemonDetailsResourceProvider } from "./contexts/pokemon-details-resource";
import { newGraphQLPokemonsResource } from './resources/pokemons-graphql'

const Home = loadable(() => import('./Home'), {
  resolveComponent: ({ Home }) => Home
})

const MyPokemons = loadable(() => import('./MyPokemons'), {
  resolveComponent: ({ MyPokemons }) => MyPokemons
})

const PokemonDetail = loadable(() => import('./PokemonDetail'), {
  resolveComponent: ({ PokemonDetail }) => PokemonDetail
})

const NotFound = loadable(() => import('./NotFound'), {
  resolveComponent: ({ NotFound }) => NotFound
})

function App() {
  const { loadFromStorage, saveToStorage } = createLocalStorageOwnedPokemons([])

  const pokemonGraphqlUri = 'https://graphql-pokeapi.graphcdn.app/'
  const { getPokemonsList, getPokemonDetails } = newGraphQLPokemonsResource(pokemonGraphqlUri)

  return (
    <AppThemeProvider>
      <PokemonIndexResourceProvider 
        limit={20}
        getPokemonsList={getPokemonsList}
      >
        <PokemonDetailsResourceProvider
          getPokemonDetails={getPokemonDetails}
        >
          <OwnedPokemonsProvider 
            loadPokemons={loadFromStorage}
            savePokemons={saveToStorage}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/my-pokemons" element={<MyPokemons/>} />
                <Route path="/pokemons/:name" element={<PokemonDetail />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
              </Routes>
            </BrowserRouter>
          </OwnedPokemonsProvider>
        </PokemonDetailsResourceProvider>
      </PokemonIndexResourceProvider>
    </AppThemeProvider>
  )
}

export default App
