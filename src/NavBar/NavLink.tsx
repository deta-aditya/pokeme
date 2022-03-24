import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { TabLink } from '../TabLink'

type NavLinkProps = {
  to: string
  children: React.ReactNode
}

function NavLink(props: NavLinkProps) {
  const { to, children } = props

  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  const isActive = match !== null

  const theme = useTheme()

  return (
    <TabLink
      to={to}
      isActive={isActive}
      insideBackgroundColor={theme.baseBackgroundColor}
      outsideBackgroundColor={'#ECECEC'}
    >
      {children}
    </TabLink>
  )
}

export { NavLink }
