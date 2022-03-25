import styled from "@emotion/styled"
import { createContext, useContext } from "react"

type ModalProps = {
  show: boolean
  onClosed: () => void
  children: React.ReactNode
}

type ModalContext = {
  onClosed?: () => void
}

const ModalContext = createContext<ModalContext>({})

function Modal({ show, onClosed, children }: ModalProps) {
  return (
    <ModalContext.Provider value={{ onClosed }}>
      <ModalBackdrop
        show={show}
        onClick={onClosed}
      >
        <ModalDialog
          onClick={(evt) => evt.stopPropagation()}
        >
          {children}
        </ModalDialog>
      </ModalBackdrop>
    </ModalContext.Provider>
  )
}

type ModalButtonProps = {
  isCloseButton?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function ModalButton({isCloseButton = false, ...props}: ModalButtonProps) {
  const { onClosed } = useContext(ModalContext)

  return (
    <StyledModalButton
      onClick={isCloseButton ? onClosed : props.onClick} 
      {...props}
    >

    </StyledModalButton>
  )
}

const ModalBackdrop = styled.div<{ show: boolean }>(({ show, theme }) => ({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.modalBackdropColor,
  display: show ? 'flex' : 'none',
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

const ModalFooter = styled.div({
  marginTop: '2.5rem',
  display: 'flex',
})

const StyledModalButton = styled.button(({ theme }) => ({
  width: '100%',
  padding: '1.25rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: theme.accentColor,
  borderTop: `1px solid ${theme.baseBorderColor}`,
  borderRight: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
  background: 'transparent',
  '&:hover': {
    boxShadow: 'inset 0 0 10px 5px #eee',
  },
  '&:first-of-type': {
    borderBottomLeftRadius: '10px',
  },
  '&:last-child': {
    borderBottomRightRadius: '10px',
  },
  '&:not(:last-child)': {
    borderRight: `1px solid ${theme.baseBorderColor}`,
  }
}))

export { Modal, ModalTitle, ModalFooter, ModalButton }
