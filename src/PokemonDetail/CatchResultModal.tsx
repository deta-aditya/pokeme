import { useState } from "react"
import { PokemonDetailsData } from "../resources/types"
import { useOwnedPokemons } from "../contexts/owned-pokemons"
import styled from "@emotion/styled"
import { Modal, ModalTitle, ModalButton, ModalFooter } from '../Modal'
import { useNavigate } from "react-router-dom"

type CatchResultModalProps = {
  pokemon: PokemonDetailsData
}

function CatchResultModal({ pokemon }: CatchResultModalProps) {
  const { state, dispatch } = useOwnedPokemons()
  const { recentlyCaught, pokemons } = state

  const [nickname, setNickname] = useState('')
  const isNicknameOwned = pokemons.map(pokemon => pokemon.nickname).includes(nickname)

  const navigate = useNavigate()

  const matchWhen: <T>(matcher: { 
    caught: () => T, 
    failed: () => T,
    _: () => T
  }) => T = ({ caught, failed, _ }) => 
    recentlyCaught.type === 'caught' ? caught() :
    recentlyCaught.type === 'failed' ? failed() :
    _()

  return (
    <Modal
      show={recentlyCaught.type !== 'none'}
      onClosed={() => dispatch({ type: 'cancel-caught' })}
    >
      {/* Change it to bright variant if catch is success! */}
      <PokemonPicture src={pokemon.picture} alt={`${pokemon.name}'s picture`} />
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
              navigate('/my-pokemons')
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
            <ModalFooter>
              <ModalButton type="submit">Keep</ModalButton>
            </ModalFooter>
          </NicknameForm>
        ),
        failed: () => (
          <ModalFooter>
            <ModalButton isCloseButton>Close</ModalButton>
          </ModalFooter>
        ),
        _: () => <></>
      })}
    </Modal>
  )
}

const PokemonPicture = styled.img({
  marginTop: '2rem',
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

export { CatchResultModal }
