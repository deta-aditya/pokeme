import { useState } from "react"
import { PokemonDetailsData } from "../resources/types"
import { useOwnedPokemons } from "../contexts/owned-pokemons"
import styled from "@emotion/styled"

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
    <ModalBackdrop
      hasCaughtInfo={recentlyCaught.type !== 'none'}
      onClick={() => {
        dispatch({ type: 'cancel-caught' })
      }}
    >
      <ModalDialog
        onClick={(evt) => {
          evt.stopPropagation()
        }}
      >
        
        {/* Change it to bright variant if catch is success! */}
        <img src={pokemon.picture} alt={`${pokemon.name}'s picture`} />
        <ModalTitle>
          {matchWhen({
            caught: () => <>You caught <Capitalize>{pokemon.name}</Capitalize>!</>,
            failed: () => <>Failed catching <Capitalize>{pokemon.name}</Capitalize></>,
            _: () => <></>
          })}
        </ModalTitle>
        <AdditionalDesc>
          {matchWhen({
            caught: () => 'Let\'s give it a nickname',
            failed: () => 'Better luck next time!',
            _: () => ''
          })} 
        </AdditionalDesc>
        {matchWhen({
          caught: () => (
            <NicknameForm onSubmit={(evt) => {
              evt.preventDefault()
              if (nickname !== '') {
                dispatch({ type: 'save-caught', nickname })
                setNickname('')
              }
            }}>
              <NicknameInput 
                type="text" 
                name="nickname" 
                id="nickname" 
                value={nickname}
                autoComplete="off"
                onChange={(evt) => setNickname(evt.target.value)} 
              />
              <NicknameValidation show={isNicknameOwned}>
                "{nickname}" is already used!
              </NicknameValidation>
              <SubmitButton type="submit">Keep</SubmitButton>
            </NicknameForm>
          ),
          failed: () => (
            <SubmitButton 
              onClick={() => {
                dispatch({ type: 'cancel-caught' })
              }}
            >
              Close
            </SubmitButton>
          ),
          _: () => <></>
        })}
      </ModalDialog>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div<{ hasCaughtInfo: boolean }>(({ hasCaughtInfo, theme }) => ({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.modalBackdropColor,
  display: hasCaughtInfo ? 'flex' : 'none',
  justifyContent: 'center',
  alignItems: 'start',
  zIndex: 99,
}))

const ModalDialog = styled.div(({ theme }) => ({
  backgroundColor: theme.whiteColor,
  width: '360px',
  borderRadius: '10px',
  margin: '3rem 2rem',
  textAlign: 'center',
}))

const ModalTitle = styled.div({
  fontWeight: 'bold',
  fontSize: '1.25rem',
})

const Capitalize = styled.span({
  textTransform: 'capitalize',
})

const AdditionalDesc = styled.div({
  marginTop: '0.875rem',
})

const NicknameForm = styled.form({
  display: 'flex',
  flexDirection: 'column',
})

const NicknameInput = styled.input(({ theme }) => ({
  margin: '1.75rem 2.5rem 0',
  padding: '0.625rem 0.875rem',
  border: `1px solid ${theme.baseBorderColor}`,
  borderRadius: '5px',
}))

const NicknameValidation = styled.div<{ show: boolean }>(({ show }) => ({
  display: show ? 'block' : 'none',
  color: '#999',
  fontSize: '0.875rem',
  marginTop: '0.875rem',
}))

const SubmitButton = styled.button(({ theme }) => ({
  marginTop: '2.5rem',
  width: '100%',
  padding: '1.25rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: theme.accentColor,
  borderTop: `1px solid ${theme.baseBorderColor}`,
  borderRight: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRadius: '0 0 10px 10px',
  backgroundColor: 'transparent',
  '&:hover': {
    boxShadow: 'inset 0 0 10px 5px #eee',
  },
}))

export { CatchResultModal }
