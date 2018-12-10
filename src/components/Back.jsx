import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const BackStyle = styled(Link)`
  color: var(--white);
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: var(--br);
  &:hover {
    background: var(--primary);
    color: var(--black);
  }
`

const Back = () => <BackStyle to="/">Back to Overview</BackStyle>

export default Back
