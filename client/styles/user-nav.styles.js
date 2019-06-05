import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const UserContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 45%;
  margin: auto 0;
`
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #3d3a3a;
  padding: 22px;
  margin-bottom: 10px;
  font-size: 18px;
`
export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.75);
  }
`
export const LogoContainer = styled.section`
  margin: auto 0;
`
export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto 0;
  flex-grow: 1;
`
