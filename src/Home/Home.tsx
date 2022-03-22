import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { NavBar } from "../NavBar"

type PokemonListItem = {
  name: string
  url: string
}

function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])

  useEffect(() => {
    getPokemonsList()
      .then(setPokemons)
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <header>
        <h1>Pokeme</h1>
        <NavBar />
      </header>
      <main>
        <hr />
        <div>
          {pokemons.map(({ name }, idx) => (
            <div key={idx}>
              <Link to={`/pokemons/${name}`}>{name}</Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

function getPokemonsList(): Promise<PokemonListItem[]> {
  return axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20')
    .then(response => response.data.results.map((result: any) => result as PokemonListItem))
}

export { Home }
