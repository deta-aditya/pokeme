import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/">Home</NavLink>
      <NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '' })} to="/my-pokemons">My Pokemons</NavLink>
    </nav>
  )
}

export { NavBar }
