import styled from 'styled-components'
import { Grid, Container } from 'semantic-ui-react'

export const SizedImage = styled.img`
  width: 100%;
  height: 600px;
`
export const Header = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 200px;
`
export const FancyParagraph = styled(Grid.Column)`
  font-family: 'Amatic SC', cursive;
  font-size: 37px;
`
export const MyContainer = styled(Container)`
  margin: 90px 0;
`
