import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledLink, FooterContainer } from './styles'

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid style={{ textAlign: 'center' }}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h4>Navigation</h4>
            </Grid.Column>
            <Grid.Column>
              <h4>Contact</h4>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <p>
                <StyledLink to="/login">Login</StyledLink>
              </p>
            </Grid.Column>
            <Grid.Column>
              <p>123 Main Street</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <p>
                <StyledLink to="/signup">Sign Up</StyledLink>
              </p>
            </Grid.Column>
            <Grid.Column>
              <p>Lake Forest, CA 92630</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <p>
                <StyledLink to="/posts">Find Postings</StyledLink>
              </p>
            </Grid.Column>
            <Grid.Column>
              <p>(555) 555-5555</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <p style={{ color: 'rgba(255, 255, 255, 0.5', textAlign: 'center' }}>
          <em>Terms and Conditions Apply</em>
        </p>
      </Container>
    </FooterContainer>
  )
}

export default Footer
