import styled from '@emotion/styled'
import { TotalPokemonsOwned as TotalPokemonsOwnedBase } from '../TotalPokemonsOwned'
import { NavLink } from './NavLink'

function NavBar() {
  return (
    <Nav>
      <NavLink to="/">Index</NavLink>
      <NavLink to="/my-pokemons">
        Owned
        <TotalPokemonsOwned />
      </NavLink>
    </Nav>
  )
}

const Nav = styled.nav({
  marginTop: '1.25rem',
  display: 'flex',
  gap: '5px',
})

const TotalPokemonsOwned = styled(TotalPokemonsOwnedBase)({
  marginLeft: '0.375rem',
})

export { NavBar }
