export type PokemonListItem = {
  name: string
  url: string
}

export type PokemonsResource = {
  next?: string
  pokemons: PokemonListItem[]
}
