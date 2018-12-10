import React from 'react'
import { Router } from '@reach/router'
import DetailedView from '../components/DetailedView'

const Detail = () => (
  <Router>
    <DetailedView path="/detail/movie/:id" type="movie" />
    <DetailedView path="/detail/tv/:id" type="tv" />
  </Router>
)

export default Detail
