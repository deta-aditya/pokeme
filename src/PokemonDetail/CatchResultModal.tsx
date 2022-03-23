import { useState } from "react"
import { PokemonDetailsData } from "./types"
import { useOwnedPokemons } from "../contexts/owned-pokemons"

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

export { CatchResultModal }
