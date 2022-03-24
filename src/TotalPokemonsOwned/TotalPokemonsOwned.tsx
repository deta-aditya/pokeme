import styled from "@emotion/styled"
import { useOwnedPokemons } from "../contexts/owned-pokemons"

function TotalPokemonsOwned({ className }: { className?: string }) {
  const { state } = useOwnedPokemons()
  const { pokemons } = state

  return (
    <Container className={className} show={pokemons.length > 0}>
      {pokemons.length}
    </Container>
  )
}

const Container = styled.div(({ show }: { show: boolean }) => ({
  display: show ? 'inline-flex' : 'none',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#EE5050',
  width: '1.125rem',
  height: '1.125rem',
  borderRadius: '100%',
  fontSize: '0.75rem',
  color: '#fff',
}))

export { TotalPokemonsOwned }
