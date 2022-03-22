import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { OwnedPokemonsState, useOwnedPokemons } from "../contexts/owned-pokemons"

type PokemonDetailsData = {
  name: string
  picture: string
  moves: string[]
  types: string[]
}

function PokemonDetail() {
  const { name } = useParams<'name'>()
  const [details, setDetails] = useState<PokemonDetailsData | null>(null)

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => ({
        name: response.data.name,
        picture: response.data.sprites.front_default,
        moves: response.data.moves.map(({ move: { name } }: { move: { name: string }}) => name),
        types: response.data.types.map(({ type: { name } }: { type: { name: string }}) => name),
      }) as unknown as PokemonDetailsData)
      .then(setDetails)
  }, [])

  return (
    <div style={{
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      height: '100vh',
    }}>
      {details !== null ? <CatchResultModal pokemon={details} /> : <></>}
      <header>
        <Link to="/">&lt; Back</Link>
      </header>
      <div style={{
        overflow: 'auto',
        flexGrow: 0,
      }}>
        <div>
          <img src={details?.picture} alt={`${name}'s picture`} />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'max-content auto',
          gap: '1rem',
        }}>
          <div>Name</div><div>{details?.name}</div>
          <div>Types</div><div>{details?.types.join(', ')}</div>
          <div>Moves</div><div>{details?.moves.join(', ')}</div>
        </div>
      </div>
      <footer style={{
        textAlign: 'center',
      }}>
        {details !== null ? <CatchButton pokemon={details} /> : <></>}
      </footer>
    </div>
  )
}

type CatchButtonProps = {
  pokemon: PokemonDetailsData
}

function CatchButton({ pokemon }: CatchButtonProps) {
  const { dispatch } = useOwnedPokemons()

  return (
    <button
      onClick={() => {
        // let's find a way to purify this thing
        const isCaught = Math.random() < 0.5
        dispatch({ type: 'try-catch', pokemon, isCaught })
      }}
    >
      Catch!
    </button>
  )
}

type CatchResultModalProps = {
  pokemon: PokemonDetailsData
}

function CatchResultModal({ pokemon }: CatchResultModalProps) {
  const { state, dispatch } = useOwnedPokemons()
  const { recentlyCaught, pokemons } = state

  const [nickname, setNickname] = useState('')

  const isNicknameOwned = pokemons.map(pokemon => pokemon.nickname).includes(nickname)

  const matchWhen: <T>(matcher: { 
    caught: () => T, 
    failed: () => T,
    _: () => T
  }) => T = ({ caught, failed, _ }) => 
    recentlyCaught.type === 'caught' ? caught() :
    recentlyCaught.type === 'failed' ? failed() :
    _()

  return (
    <div 
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: recentlyCaught.type === 'none' ? 'none' : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => {
        dispatch({ type: 'cancel-caught' })
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          textAlign: 'center',
          padding: '1rem',
        }}
        onClick={(evt) => {
          evt.stopPropagation()
        }}
      >
        <div style={{ fontWeight: 'bold' }}>
          {matchWhen({
            caught: () => `You caught ${pokemon.name}!`,
            failed: () => `Failed to catch ${pokemon.name}`,
            _: () => ''
          })}
        </div>
        {/* Change it to bright variant if catch is success! */}
        <img src={pokemon.picture} alt={`${pokemon.name}'s picture`} />
        <div>
          {matchWhen({
            caught: () => 'Let\'s give it a nickname',
            failed: () => 'Better luck next time!',
            _: () => ''
          })} 
        </div>
        {matchWhen({
          caught: () => (
            <form onSubmit={(evt) => {
              evt.preventDefault()
              if (nickname !== '') {
                dispatch({ type: 'save-caught', nickname })
                setNickname('')
              }
            }}>
              <input 
                type="text" 
                name="nickname" 
                id="nickname" 
                value={nickname}
                onChange={(evt) => setNickname(evt.target.value)} 
              />
              <div style={{
                color: 'red'
              }}>
                {isNicknameOwned ? `${nickname} is already used! Please give a different name` : ''}
              </div>
              <div>
                <button type="submit">Keep</button>
              </div>
            </form>
          ),
          failed: () => (
            <div>
              <button 
                onClick={() => {
                  dispatch({ type: 'cancel-caught' })
                }}
              >
                Close
              </button>
            </div>
          ),
          _: () => <></>
        })}
      </div>
    </div>
  )
}

export { PokemonDetail }
