import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import format from 'date-fns/format'
import { Icon } from './Icon'

const Content = styled.div`
  padding: 0.75rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  @media screen and (min-width: 700px) {
    padding: 1rem;
    opacity: 0;
  }
`

const Inner = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 150%;
  background: url(${props => props.cover}) 50% 50% no-repeat;
  background-size: cover;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  width: 100%;
  border-radius: var(--br);
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 102%;
    height: 102%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    z-index: -10;
    border-radius: var(--br);
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
    @media screen and (min-width: 700px) {
      opacity: 0;
    }
  }
  &:hover {
    &:after {
      opacity: 1;
    }
    ${Content} {
      opacity: 1;
    }
  }
  @media screen and (max-width: 400px) {
    [data-name='small-hidden'] {
      display: none;
    }
  }
`

const Title = styled.h3`
  font-size: 1.15rem;
  svg {
    vertical-align: super;
  }
`

const Details = styled.div`
  display: flex;
`

const Item = styled.div`
  [data-item='custom-icon'] {
    fill: var(--primary);
    margin-bottom: 0.25rem;
  }
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: 700px) {
    margin-right: 1rem;
  }
`

const ItemText = styled.div`
  font-size: 0.75rem;
  text-align: center;
`

const Card = ({ name, cover, next, rating, status, release, episodes, seasons }) => {
  const ref = useRef()
  const [isHovered, setHovered] = useState(false)

  const [animatedProps, setAnimatedProps] = useSpring({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 400, friction: 30, precision: 0.00001 },
  })

  return (
    <Inner
      ref={ref}
      cover={cover}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        const x =
          clientX - (ref.current.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft))
        const y = clientY - (ref.current.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop))
        const dampen = 90 // Lower the number the less rotation
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.07, // Scale
        ]
        setAnimatedProps({ xys })
      }}
      onMouseLeave={() => {
        setHovered(false)
        setAnimatedProps({ xys: [0, 0, 1] })
      }}
      style={{
        zIndex: isHovered ? 2 : 1,
        transform: animatedProps.xys.interpolate(
          (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        ),
      }}
    >
      <Content>
        <Title>
          {name} {status && (status === 'Returning Series' ? <Icon name="running" /> : <Icon name="ended" />)}
        </Title>
        <Details>
          <Item>
            <Icon name="star" /> <ItemText>{rating}</ItemText>
          </Item>
          <Item>
            <Icon name="first" /> <ItemText>{format(release, 'YYYY')}</ItemText>
          </Item>
          {next && (
            <Item data-name="small-hidden">
              <Icon name="next" /> <ItemText>{format(next, 'DD.MM.YY')}</ItemText>
            </Item>
          )}
          {episodes && (
            <Item>
              <Icon name="episodes" /> <ItemText>{episodes}</ItemText>
            </Item>
          )}
          {seasons && (
            <Item>
              <Icon name="seasons" /> <ItemText>{seasons}</ItemText>
            </Item>
          )}
        </Details>
      </Content>
    </Inner>
  )
}

export default Card

Card.propTypes = {
  name: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  next: PropTypes.string,
  rating: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['Returning Series', 'Ended']),
  release: PropTypes.string.isRequired,
  episodes: PropTypes.number,
  seasons: PropTypes.number,
}

Card.defaultProps = {
  next: null,
  status: null,
  episodes: null,
  seasons: null,
}
