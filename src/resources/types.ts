export type PokemonListItem = {
  name: string
  url: string
}

export type PokemonsResource = {
  next?: string
  pokemons: PokemonListItem[]
}

export type PokemonDetailsData = {
  name: string
  picture: string
  moves: string[]
  types: string[]
}
