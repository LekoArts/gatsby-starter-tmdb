import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const Inner = styled(animated.div)`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-image: url(${props => props.cover});
  background-size: cover;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  width: 100%;
  height: 500px;
  border-radius: var(--br);
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.5) 100%);
    z-index: -10;
    border-radius: var(--br);
  }
`

const Card = ({ name, cover }) => {
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
        const dampen = 100 // Lower the number the less rotation
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
      <div>{name}</div>
    </Inner>
  )
}

export default Card

Card.propTypes = {
  name: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
}
