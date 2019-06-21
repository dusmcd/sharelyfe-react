import React from 'react'
import { Grid, Image, Divider } from 'semantic-ui-react'
import { Header, MyContainer, FancyParagraph, SizedImage } from './styles'

const Landing = () => {
  return (
    <div style={{ width: '100%', marginTop: '-10px' }}>
      <div>
        <SizedImage
          src="https://images.pexels.com/photos/2180426/pexels-photo-2180426.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=1500"
          fluid
        />
      </div>
      <Header>
        <h1 style={{ fontFamily: '"Courgette", cursive', fontSize: '4em' }}>
          Don't just live life, ShareLyfe.
        </h1>
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
