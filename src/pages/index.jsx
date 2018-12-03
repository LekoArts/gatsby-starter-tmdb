import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from '../components/TabOverview'
import { SiteConsumer } from '../components/Layout'
import Card from '../components/Card'
import { Icon } from '../components/Icon'

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 3rem 2rem;
  @media (max-width: 600px) {
    padding: 2rem 1rem 2rem 1rem;
  }
`

const Title = styled.h1`
  span {
    color: var(--primary);
  }
  margin-bottom: 6rem;
`

const SmallTitle = styled.h2`
  color: var(--white);
  font-weight: 500;
  font-size: 1rem;
`

const Legend = styled.div`
  margin-bottom: 3rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: var(--br);
  font-size: 0.8rem;
  [data-name='next'],
  [data-name='first'],
  [data-name='star'],
  [data-name='episodes'],
  [data-name='seasons'] {
    fill: var(--grey-light);
  }
  h2 {
    margin-top: 0;
    color: var(--grey-light);
  }
`

const LegendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    display: flex;
    align-items: center;
    color: var(--grey);
    padding: 0.5rem 1.25rem 0.5rem 0;
  }
  [data-item='custom-icon'] {
    margin-right: 0.4rem;
    width: 1.25rem;
    height: 1.25rem;
  }
`

const Row = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 3rem;
`

const Column = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-basis: 100%;
  max-width: 100%;
  width: 100%;
  margin-bottom: 2.5rem;
  @media screen and (min-width: 321px) {
    flex-basis: calc(99.9% * 1 / 2 - 0.5rem);
    max-width: calc(99.9% * 1 / 2 - 0.5rem);
    width: calc(99.9% * 1 / 2 - 0.5rem);
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 700px) {
    flex-basis: calc(99.9% * 1 / 3 - 1rem);
    max-width: calc(99.9% * 1 / 3 - 1rem);
    width: calc(99.9% * 1 / 3 - 1rem);
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 1000px) {
    flex-basis: calc(99.9% * 1 / 3 - 1.5rem);
    max-width: calc(99.9% * 1 / 3 - 1.5rem);
    width: calc(99.9% * 1 / 3 - 1.5rem);
    margin-bottom: 2.5rem;
  }
`

const BigTab = styled(Tab)`
  padding: 0;
  margin-right: 2rem;
  border-radius: 0;
  color: var(--grey);
  font-weight: 500;
  font-size: 1.5em;
  box-shadow: rgba(73, 221, 122, 0.5) 0 0 0 0 inset;
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  &.selected {
    background: none;
    color: var(--white);
  }
  &:not(.selected) {
    &:hover {
      box-shadow: rgba(73, 221, 122, 0.5) 0 -3px 0 0 inset;
      background: none !important;
    }
  }
`

const Desc = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: var(--br);
`

const IndexPage = ({ data: { lists, favMovies, favTV, watchedTV, watchedMovies } }) => (
  <SiteConsumer>
    {({ username, secureBaseUrl }) => {
      const imageLink = img => `${secureBaseUrl}w500${img}`
      return (
        <Wrapper>
          <header>
            <Title>
              Series & Movies<span>.</span> {username}
            </Title>
            <Legend>
              <SmallTitle>Legend</SmallTitle>
              <LegendWrapper>
                <div>
                  <Icon name="star" /> Rating
                </div>
                <div>
                  <Icon name="first" /> Release
                </div>
                <div>
                  <Icon name="next" /> Next Episode
                </div>
                <div>
                  <Icon name="episodes" /> Episodes
                </div>
                <div>
                  <Icon name="seasons" /> Seasons
                </div>
                <div>
                  <Icon name="running" /> Returning Series
                </div>
                <div>
                  <Icon name="ended" /> Ended
                </div>
              </LegendWrapper>
            </Legend>
          </header>
          <main>
            <Tabs forceRenderTabPanel>
              <TabList>
                <BigTab>Favorites</BigTab>
                <BigTab>Watchlist</BigTab>
                <BigTab>Lists</BigTab>
              </TabList>
              <TabPanel>
                <Tabs forceRenderTabPanel>
                  <TabList>
                    <Tab>Series ({favTV.totalCount})</Tab>
                    <Tab>Movies ({favMovies.totalCount})</Tab>
                  </TabList>
                  <TabPanel>
                    <Row>
                      {favTV.edges.map(({ node: tv }) => {
                        let airDate
                        if (tv.next_episode_to_air) {
                          airDate = tv.next_episode_to_air.air_date
                        }
                        return (
                          <Column key={tv.name}>
                            <Card
                              cover={imageLink(tv.poster_path)}
                              name={tv.name}
                              next={airDate}
                              rating={tv.vote_average}
                              status={tv.status}
                              release={tv.first_air_date}
                              episodes={tv.number_of_episodes}
                              seasons={tv.number_of_seasons}
                            />
                          </Column>
                        )
                      })}
                    </Row>
                  </TabPanel>
                  <TabPanel>
                    <Row>
                      {favMovies.edges.map(({ node: movie }) => (
                        <Column key={movie.title}>
                          <Card
                            cover={imageLink(movie.poster_path)}
                            name={movie.title}
                            rating={movie.vote_average}
                            release={movie.release_date}
                          />
                        </Column>
                      ))}
                    </Row>
                  </TabPanel>
                </Tabs>
              </TabPanel>
              <TabPanel>
                <Tabs forceRenderTabPanel>
                  <TabList>
                    <Tab>Series ({watchedTV.totalCount})</Tab>
                    <Tab>Movies ({watchedMovies.totalCount})</Tab>
                  </TabList>
                  <TabPanel>
                    <Row>
                      {watchedTV.edges.map(({ node: tv }) => {
                        let airDate
                        if (tv.next_episode_to_air) {
                          airDate = tv.next_episode_to_air.air_date
                        }
                        return (
                          <Column key={tv.name}>
                            <Card
                              cover={imageLink(tv.poster_path)}
                              name={tv.name}
                              next={airDate}
                              rating={tv.vote_average}
                              status={tv.status}
                              release={tv.first_air_date}
                              episodes={tv.number_of_episodes}
                              seasons={tv.number_of_seasons}
                            />
                          </Column>
                        )
                      })}
                    </Row>
                  </TabPanel>
                  <TabPanel>
                    <Row>
                      {watchedMovies.edges.map(({ node: movie }) => (
                        <Column key={movie.title}>
                          <Card
                            cover={imageLink(movie.poster_path)}
                            name={movie.title}
                            rating={movie.vote_average}
                            release={movie.release_date}
                          />
                        </Column>
                      ))}
                    </Row>
                  </TabPanel>
                </Tabs>
              </TabPanel>
              <TabPanel>
                <Tabs forceRenderTabPanel>
                  <TabList>
                    {lists.edges.map(({ node: list }) => (
                      <Tab key={list.name}>{list.name}</Tab>
                    ))}
                  </TabList>
                  {lists.edges.map(({ node: list }) => (
                    <TabPanel key={list.name}>
                      <Desc>{list.description}</Desc>
                      <Row>
                        {list.items.map(item => (
                          <Column key={item.name}>
                            <Card
                              cover={imageLink(item.poster_path)}
                              name={item.name}
                              rating={item.vote_average}
                              release={item.first_air_date}
                            />
                          </Column>
                        ))}
                      </Row>
                    </TabPanel>
                  ))}
                </Tabs>
              </TabPanel>
            </Tabs>
          </main>
        </Wrapper>
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
      edges: PropTypes.array.isRequired,
    }).isRequired,
    favTV: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.array.isRequired,
    }).isRequired,
    watchedTV: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.array.isRequired,
    }).isRequired,
    watchedMovies: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.array.isRequired,
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
          description
          items {
            name
            vote_average
            poster_path
            first_air_date
          }
        }
      }
    }
    favTV: allTmdbAccountFavoriteTv(sort: { fields: [vote_average], order: DESC }) {
      totalCount
      edges {
        node {
          poster_path
          name
          next_episode_to_air {
            air_date
          }
          vote_average
          status
          number_of_episodes
          number_of_seasons
          first_air_date
        }
      }
    }
    favMovies: allTmdbAccountFavoriteMovies(sort: { fields: [vote_average], order: DESC }) {
      totalCount
      edges {
        node {
          release_date
          vote_average
          title
          poster_path
        }
      }
    }
    watchedTV: allTmdbAccountTvWatchlist(sort: { fields: [first_air_date], order: DESC }) {
      totalCount
      edges {
        node {
          first_air_date
          next_episode_to_air {
            air_date
          }
          vote_average
          status
          poster_path
          name
          number_of_seasons
          number_of_episodes
        }
      }
    }
    watchedMovies: allTmdbAccountMovieWatchlist(sort: { fields: [release_date], order: DESC }) {
      totalCount
      edges {
        node {
          release_date
          vote_average
          title
          poster_path
        }
      }
    }
  }
`
