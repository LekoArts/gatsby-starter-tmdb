import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from '../components/TabOverview'
import Layout, { SiteConsumer } from '../components/Layout'
import Card from '../components/Card'

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem 2rem;
  @media (max-width: 600px) {
    padding: 2rem 1rem 4rem 1rem;
  }
`

const Title = styled.h1`
  span {
    color: var(--primary);
  }
  margin-bottom: 3rem;
`

const SmallTitle = styled.h2`
  color: var(--white);
  font-weight: 500;
`

const SmallInfo = styled.div`
  color: var(--grey);
  margin-bottom: 6rem;
  p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  span {
    color: var(--primary);
    font-weight: 700;
  }
`

const Row = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Column = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-basis: 100%;
  max-width: 100%;
  width: 100%;
  margin-bottom: 3rem;
  @media screen and (min-width: 980px) {
    flex-basis: calc(99.9% * 1 / 3 - 2rem);
    max-width: calc(99.9% * 1 / 3 - 2rem);
    width: calc(99.9% * 1 / 3 - 2rem);
  }
`

const IndexPage = ({ data: { lists, favMovies, favTV, watchedTV, watchedMovies } }) => (
  <SiteConsumer>
    {({ username, secureBaseUrl }) => {
      const imageLink = img => `${secureBaseUrl}w500${img}`
      return (
        <Layout>
          <Wrapper>
            <Title>
              Series & Movies<span>.</span> {username}
            </Title>
            <SmallInfo>
              <SmallTitle>Statistics</SmallTitle>
              <p>
                Lists: <span>{lists.totalCount}</span> — Fav. Series: <span>{favTV.totalCount}</span> — Fav. Movies:{' '}
                <span>{favMovies.totalCount}</span> — Watched Movies: <span>{watchedMovies.totalCount}</span> — Watched
                Series: <span>{watchedTV.totalCount}</span>
              </p>
            </SmallInfo>
            <SmallTitle>Favorites</SmallTitle>
            <Tabs>
              <TabList>
                <Tab>Series</Tab>
                <Tab>Movies</Tab>
              </TabList>
              <TabPanel>
                <Row>
                  {favTV.edges.map(({ node: tv }) => (
                    <Column>
                      <Card cover={imageLink(tv.poster_path)} name={tv.name} />
                    </Column>
                  ))}
                </Row>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
            <SmallTitle>Watchlist</SmallTitle>
            <Tabs>
              <TabList>
                <Tab>Series</Tab>
                <Tab>Movies</Tab>
              </TabList>
              <TabPanel>
                <h2>Any content 1</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
          </Wrapper>
        </Layout>
      )
    }}
  </SiteConsumer>
)

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    lists: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.array.isRequired,
    }).isRequired,
    favMovies: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
    favTV: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
    watchedTV: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
    watchedMovies: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    lists: allTmdbAccountLists {
      totalCount
      edges {
        node {
          name
        }
      }
    }
    favTV: allTmdbAccountFavoriteTv(sort: { fields: [vote_average], order: DESC }) {
      totalCount
      edges {
        node {
          poster_path
        }
      }
    }
    favMovies: allTmdbAccountFavoriteMovies {
      totalCount
    }
    watchedTV: allTmdbAccountTvWatchlist {
      totalCount
    }
    watchedMovies: allTmdbAccountMovieWatchlist {
      totalCount
    }
  }
`
