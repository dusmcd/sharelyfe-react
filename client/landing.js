import React from 'react'
import styled from 'styled-components'
import { Grid, Image, Container, Segment, Divider } from 'semantic-ui-react'

const SizedImage = styled.img`
  width: 100%;
  height: 600px;
`
const Header = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 200px;
`
const FancyParagraph = styled(Grid.Column)`
  font-family: 'Amatic SC', cursive;
  font-size: 37px;
`
const MyContainer = styled(Container)`
  margin: 90px 0;
`
const Landing = () => {
  return (
    <div style={{ width: '100%' }}>
      <SizedImage src="https://images.pexels.com/photos/2180426/pexels-photo-2180426.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=1500" />
      <Header>
        <h1>Don't just live life, ShareLyfe.</h1>
      </Header>
      <MyContainer>
        <Divider />
      </MyContainer>
      <MyContainer>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image
                src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940"
                rounded
              />
            </Grid.Column>
            <FancyParagraph style={{ margin: 'auto 0' }}>
              <p>Jealous of your friend's cool bike? Why not share it?</p>
            </FancyParagraph>
          </Grid.Row>
        </Grid>
      </MyContainer>
      <MyContainer>
        <Divider />
      </MyContainer>

      <MyContainer>
        <Grid>
          <Grid.Row columns={2}>
            <FancyParagraph style={{ margin: 'auto 0' }}>
              <p>
                My friend is tired of me using his driveway for free parking.
                Perhaps we can share?
              </p>
            </FancyParagraph>
            <Grid.Column>
              <Image
                src="https://images.pexels.com/photos/2647/cars-vehicles-street-parking.jpg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940"
                rounded
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </MyContainer>
    </div>
  )
}

export default Landing
