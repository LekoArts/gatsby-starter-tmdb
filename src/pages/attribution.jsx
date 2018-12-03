import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem 2rem;
  min-height: 99.9vh;
  @media (max-width: 600px) {
    padding: 2rem 1rem 4rem 1rem;
  }
`

const Back = styled(Link)`
  color: var(--white);
`

const Attribution = () => (
  <Wrapper>
    <h1>Attribution</h1>
    <p>
      <Back to="/">Back to home</Back>
    </p>
    <p>
      <a href="https://www.themoviedb.org/">The Movie Database</a>
    </p>
    <p>
      <a href="https://github.com/grantholle/moviedb-promise">moviedb-promise</a>
    </p>
    <p>
      <a href="https://usehooks.com/#useSpring">React Spring Hooks Example</a>
    </p>
    <p>
      Star by laris icon from the Noun Project, Calendar by Thengakola from the Noun Project, movie ticket by Three Six
      Five from the Noun Project
    </p>
  </Wrapper>
)

export default Attribution
