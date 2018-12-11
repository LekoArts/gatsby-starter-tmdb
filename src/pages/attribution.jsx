import React from 'react'
import Back from '../components/Back'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'

const Attribution = () => (
  <Wrapper>
    <SEO />
    <h1>Attribution</h1>
    <Back />
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
