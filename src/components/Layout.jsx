import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, StaticQuery } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import Helmet from 'react-helmet'
import { IconMother } from './Icon'

const { Provider: SiteProvider, Consumer: SiteConsumer } = React.createContext()

export { SiteConsumer }

const GlobalStyle = createGlobalStyle`
@import url('https://rsms.me/inter/inter-ui.css');

:root {
  --bg-dark: #172742;
  --bg-light: #47524f;
  --primary: #00de7b;
  --primary-light: #71ffc0;
  --black: #0c111f;
  --blue: #00d6dd;
  --white: #f6fffa;
  --grey: #9fb7c7;
  --grey-light: #cee8f8;
  --br: 5px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  font-family: 'Inter UI', '-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial','sans-serif','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol', sans-serif; 
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 18px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
}

@supports (font-variation-settings: normal) {
  html { 
    font-family: 'Inter UI var alt', '-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial','sans-serif','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol', sans-serif; 
  }
}

body {
  background: linear-gradient(to top, #172742 0%, #47524f 100%) no-repeat;
  color: var(--white);
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--bg-dark);
}

::selection {
  color: var(--white);
  background-color: var(--primary);
}

a {
  color: var(--primary);
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  &:hover, &:focus {
    color: var(--primary-light);
  }
}

.hidden {
  display: none !important;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0 %,
  100% {
    transform: rotate(0)
  }
  20%,
  60% {
    transform: rotate(-25deg)
  }
  40%,
  80% {
    transform: rotate(10deg)
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
`

const Footer = styled.footer`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
  color: var(--grey);
  [data-size='small'] {
    font-size: 0.8rem;
  }
`

export default class Layout extends Component {
  render() {
    return (
      <StaticQuery
        query={query}
        render={({
          site: {
            siteMetadata: { title, description, url, logo, twitter },
          },
          tmdbAccountInfo: { username },
          tmdbConfiguration: {
            images: { secureBaseUrl },
          },
        }) => {
          const { children } = this.props
          return (
            <SiteProvider value={{ username, secureBaseUrl }}>
              <>
                <Helmet>
                  <title>{title}</title>
                  <html lang="en" />
                  <meta name="description" content={description} />
                  <meta property="og:url" content={url} />
                  <meta property="og:title" content={title} />
                  <meta property="og:description" content={description} />
                  <meta property="og:image" content={`${url}${logo}`} />
                  <meta property="og:image:alt" content={title} />
                  <meta property="og:image:width" content="512" />
                  <meta property="og:image:height" content="512" />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:creator" content={twitter} />
                  <meta name="twitter:title" content={title} />
                  <meta name="twitter:description" content={description} />
                  <meta name="twitter:image" content={`${url}${logo}`} />
                </Helmet>
                <GlobalStyle />
                <a
                  href="https://github.com/LekoArts/gatsby-source-tmdb"
                  className="github-corner"
                  aria-label="View source on GitHub"
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 250 250"
                    style={{
                      fill: 'var(--primary)',
                      color: 'var(--white)',
                      position: 'absolute',
                      top: 0,
                      border: 0,
                      right: 0,
                    }}
                    aria-hidden="true"
                  >
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
                    <path
                      d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                      fill="currentColor"
                      style={{ transformOrigin: '130px 106px' }}
                      className="octo-arm"
                    />
                    <path
                      d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                      fill="currentColor"
                      className="octo-body"
                    />
                  </svg>
                </a>
                {children}
                <Footer>
                  <p>
                    Made by <a href="https://www.lekoarts.de">LekoArts</a>.{' '}
                    <a href="https://github.com/LekoArts/gatsby-source-tmdb">Source</a>.{' '}
                    <Link to="/attribution">Attribution</Link>.
                  </p>
                  <p data-size="small">Powered by The Movie Database</p>
                </Footer>
                <IconMother />
              </>
            </SiteProvider>
          )
        }}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
}

const query = graphql`
  query Config {
    site {
      siteMetadata {
        title
        description
        url
        logo
        twitter
      }
    }
    tmdbAccountInfo {
      username
    }
    tmdbConfiguration {
      images {
        secureBaseUrl: secure_base_url
      }
    }
  }
`
