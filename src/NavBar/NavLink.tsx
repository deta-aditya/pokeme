import styled from "@emotion/styled";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { AppTheme, useAppTheme } from "../contexts/app-theme";

type NavLinkProps = {
  to: string
  children: React.ReactNode
}

function NavLink(props: NavLinkProps) {
  const { to, children } = props

  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  const isActive = match !== null

  const theme = useAppTheme()

  return (
    <Container to={to} isActive={isActive} theme={theme}>
      <RoundedCornerLeft isActive={isActive} theme={theme} />
      {children}
      <RoundedCornerRight isActive={isActive} theme={theme} />
    </Container>
  )
}

type HasActiveFlag = {
  isActive: boolean
}

type HasAppTheme = {
  theme: AppTheme
}

const Container = styled(Link)(({ isActive, theme }: HasActiveFlag & HasAppTheme) => ({
  color: '#000',
  position: 'relative',
  padding: '0.5rem 1.25rem',
  textDecoration: 'none',
  border: '1px solid',
  borderColor: isActive 
    ? `${theme.baseBorderColor} ${theme.baseBorderColor} transparent` 
    : `transparent transparent ${theme.baseBorderColor}`,
  transform: 'translateY(1px)',
  backgroundColor: isActive ? theme.baseBackgroundColor : '',
  borderRadius: '5px 5px 0 0',
  '::before': {
    content: '""',
    display: isActive ? 'block' : 'none',
    position: 'absolute',
    left: '-5px',
    bottom: '-1px',
    width: '5px',
    height: '5px',
    backgroundColor: theme.baseBackgroundColor,
  },
  '::after': {
    content: '""',
    display: isActive ? 'block' : 'none',
    position: 'absolute',
    right: '-5px',
    bottom: '-1px',
    width: '5px',
    height: '5px',
    backgroundColor: theme.baseBackgroundColor,
  },
}))

const RoundedCornerLeft = styled.div(({ isActive, theme }: HasActiveFlag & HasAppTheme) => ({
  position: 'absolute',
  display: isActive ? 'block' : 'none',
  left: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 5px',
  border: `solid ${theme.baseBorderColor}`,
  borderWidth: '0 1px 1px 0',
  backgroundColor: '#ECECEC',
}))

const RoundedCornerRight = styled.div(({ isActive, theme }: HasActiveFlag & HasAppTheme) => ({
  position: 'absolute',
  display: isActive ? 'block' : 'none',
  right: '-6px',
  bottom: '-1px',
  width: '5px',
  height: '5px',
  borderRadius: '0 0 0 5px',
  border: `solid ${theme.baseBorderColor}`,
  borderWidth: '0 0 1px 1px',
  backgroundColor: '#ECECEC',
  zIndex: 9,
}))

export { NavLink }
