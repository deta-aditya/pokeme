import styled from "@emotion/styled";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

type NavLinkProps = {
  to: string
  children: React.ReactNode
}

function NavLink(props: NavLinkProps) {
  const { to, children } = props
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  const isActive = match !== null

  return (
    <Container to={to} isActive={isActive}>
      <RoundedCornerLeft isActive={isActive} />
      {children}
      <RoundedCornerRight isActive={isActive} />
    </Container>
  )
}

type HasActiveFlag = {
  isActive: boolean
}

const Container = styled(Link)(({ isActive }: HasActiveFlag) => ({
  color: '#000',
  position: 'relative',
  padding: '0.5rem 1.25rem',
  textDecoration: 'none',
  border: '1px solid',
  borderColor: isActive ? '#eee #eee transparent' : 'transparent transparent #eee',
  transform: 'translateY(1px)',
  backgroundColor: isActive ? '#fff' : '',
  borderRadius: '5px 5px 0 0',
  '::before': {
    content: '""',
    display: isActive ? 'block' : 'none',
    position: 'absolute',
    left: '-5px',
    bottom: '-1px',
    width: '5px',
    height: '5px',
    backgroundColor: '#fff',
  },
  '::after': {
    content: '""',
    display: isActive ? 'block' : 'none',
    position: 'absolute',
    right: '-5px',
    bottom: '-1px',
    width: '5px',
    height: '5px',
    backgroundColor: '#fff',
  },
}))

const RoundedCornerLeft = styled.div(({ isActive }: HasActiveFlag) => ({
  position: 'absolute',
  display: isActive ? 'block' : 'none',
  left: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 5px',
  border: 'solid #eee',
  borderWidth: '0 1px 1px 0',
  backgroundColor: '#ECECEC',
}))

const RoundedCornerRight = styled.div(({ isActive }: HasActiveFlag) => ({
  position: 'absolute',
  display: isActive ? 'block' : 'none',
  right: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 0 5px',
  border: 'solid #eee',
  borderWidth: '0 0 1px 1px',
  backgroundColor: '#ECECEC',
  zIndex: 9,
}))

export { NavLink }
