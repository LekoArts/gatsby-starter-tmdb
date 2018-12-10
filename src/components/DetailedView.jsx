/* eslint react/destructuring-assignment: 0 */
/* eslint react/require-default-props: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import format from 'date-fns/format'
import Wrapper from './Wrapper'
import Back from './Back'
import { Icon } from './Icon'

const convertMinsToHrsMins = mins => {
  let h = Math.floor(mins / 60)
  let m = mins % 60
  h = h < 10 ? `0${h}` : h
  m = m < 10 ? `0${m}` : m
  return `${h} Hours ${m} Minutes`
}

const calculateTime = ({ episodes, seasons, runTime }) => {
  let time
  if (Array.isArray(runTime)) {
    time = runTime[0] // eslint-disable-line
  } else {
    time = runTime
  }
  return convertMinsToHrsMins(episodes * seasons * time)
}

const Information = styled.section`
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const Loading = styled.div`
  padding: 4rem;
  font-size: 2rem;
`

const Poster = styled.div`
  position: relative;
  img {
    border-radius: var(--br-big);
    max-width: 100%;
    box-shadow: 0 12px 40px -5px rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 700px) {
    margin-bottom: 2rem;
  }
`

const Details = styled.div`
  margin-left: 3rem;
  max-width: 50%;
  h1 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    text-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 1rem;
    }
  }
  h2 {
    font-size: 1.4rem;
    text-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }
  .original-name {
    font-style: italic;
    font-weight: 400;
    color: var(--grey);
  }
  .statistics-01 {
    font-size: 1.75rem;
    margin: 1rem 0;
    color: var(--grey-light);
    svg {
      fill: var(--primary);
      vertical-align: bottom;
      width: 2rem;
      height: 2rem;
    }
  }
  .totalRuntime {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: var(--grey);
  }
  .statistics-02 {
    margin-top: 2rem;
    svg {
      fill: var(--white);
    }
    display: flex;
    align-items: center;
    div {
      margin-right: 1.25rem;
      font-size: 1.15rem;
      color: var(--grey-light);
      svg {
        vertical-align: baseline;
      }
    }
  }
  @media (max-width: 700px) {
    margin-left: 0;
    max-width: 100%;
  }
`

const Genres = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`

const Genre = styled.div`
  font-size: 0.8rem;
  margin-right: 0.5rem;
  padding: 0.35rem 0.65rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: var(--br);
`

const Overview = styled.div`
  p {
    letter-spacing: -0.003em;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    line-height: 1.58;
    font-size: 0.9rem;
  }
  margin-top: 2rem;
  color: var(--grey-light);
  h2 {
    color: var(--white);
  }
`

const SecondaryInformation = styled.section`
  margin-top: 4rem;
`

const CastOverview = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

const Cast = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: calc(99.9% * 1 / 6 - 0.5rem);
  margin-bottom: 2rem;
  .cast-img-wrapper {
    max-width: 185px;
    height: 225px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--br);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
  .cast-names {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    font-size: 0.9rem;
    color: var(--grey);
    span:first-child {
      font-weight: 700;
      color: var(--grey-light);
    }
  }
  @media (max-width: 1000px) {
    width: calc(99.9% * 1 / 3 - 0.5rem);
  }
  @media (max-width: 450px) {
    width: calc(99.9% * 1 / 2 - 0.5rem);
  }
`

const Trailer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`

const CrewOverview = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`

const Crew = styled.div`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--br);
  color: var(--grey--light);
  span {
    color: var(--grey);
  }
`

const SimOverview = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  a {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.4rem 0.75rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: var(--br);
    color: var(--grey--light);
    &:hover {
      color: var(--black);
      background: var(--primary);
    }
  }
`

const BASE_URL = 'https://api.themoviedb.org/3/'
const IMAGE_URL = 'https://image.tmdb.org/t/p/'

export default class DetailedView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      detail: [],
      similar: [],
      recommended: [],
      isLoading: false,
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    const [d, s, c, v] = await Promise.all([
      fetch(`${BASE_URL}${this.props.type}/${this.props.id}?api_key=${process.env.API_KEY}&language=en-US`),
      fetch(
        `${BASE_URL}${this.props.type}/${this.props.id}/similar?api_key=${
          process.env.API_KEY
        }&language=en-US&page=1`
      ),
      fetch(`${BASE_URL}${this.props.type}/${this.props.id}/credits?api_key=${process.env.API_KEY}&language=en-US`),
      fetch(`${BASE_URL}${this.props.type}/${this.props.id}/videos?api_key=${process.env.API_KEY}&language=en-US`),
    ])

    const detail = await d.json()
    const similar = await s.json()
    const credits = await c.json()
    const videos = await v.json()

    await this.setState({
      detail,
      similar: similar.results,
      credits,
      videos: videos.results,
    })

    await this.setState({ isLoading: false })
  }

  render() {
    const { type, id } = this.props
    const { detail, similar, credits, videos, isLoading } = this.state

    let filteredVideos
    if (videos) {
      filteredVideos = videos.filter(video => video.type === 'Trailer')
    }

    if (isLoading || !detail || !similar || !credits || !videos) {
      return <Loading>Loading...</Loading>
    }

    return (
      <Wrapper>
        <Helmet>
          <title>{`${detail.title || detail.name} | TMDb - Gatsby`}</title>
          <meta name="description" content={detail.overview} />
          <meta property="og:title" content={`${detail.title || detail.name} | TMDb - Gatsby`} />
          <meta property="og:url" content={`https://tmdb.lekoarts.de/detail/${type}/${id}`} />
          <meta property="og:description" content={detail.overview} />
          <meta name="twitter:title" content={`${detail.title || detail.name} | TMDb - Gatsby`} />
          <meta name="twitter:description" content={detail.overview} />
        </Helmet>
        <Back />
        <Information>
          <Poster>
            <img src={`${IMAGE_URL}w500${detail.poster_path}`} alt="" />
          </Poster>
          <Details>
            <h1>
              {detail.title || detail.name} ({format(detail.release_date || detail.first_air_date, 'YYYY')}){' '}
              {detail.status &&
                type === 'tv' &&
                (detail.status === 'Returning Series' ? <Icon name="running" /> : <Icon name="ended" />)}
            </h1>
            {(detail.title !== detail.original_title || detail.name !== detail.original_name) && (
              <div className="original-name">Original: {detail.original_title || detail.original_name}</div>
            )}
            <div className="statistics-01">
              <Icon name="star" /> {detail.vote_average}
            </div>
            <div className="statistics-02">
              {detail.number_of_episodes && (
                <div>
                  <Icon name="episodes" /> {detail.number_of_episodes}
                </div>
              )}
              {detail.number_of_seasons && (
                <div>
                  <Icon name="seasons" /> {detail.number_of_seasons}
                </div>
              )}
              {detail.next_episode_to_air && (
                <div>
                  <Icon name="next" /> {format(detail.next_episode_to_air.air_date, 'DD.MM.YY')}
                </div>
              )}
            </div>
            {detail.runtime && <div>Runtime: {detail.runtime} Minutes</div>}
            {detail.episode_run_time && (
              <div className="totalRuntime">
                Total Runtime:{' '}
                {calculateTime({
                  episodes: detail.number_of_episodes,
                  seasons: detail.number_of_seasons,
                  runTime: detail.episode_run_time,
                })}
              </div>
            )}
            <Genres>
              {detail.genres.map(genre => (
                <Genre key={genre.id}>{genre.name}</Genre>
              ))}
            </Genres>
            <Overview>
              <h2>Overview</h2>
              <p>{detail.overview}</p>
            </Overview>
          </Details>
        </Information>
        <SecondaryInformation>
          {credits.cast.length > 0 && (
            <>
              <h2>Top Billed Cast</h2>
              <CastOverview>
                {credits.cast.slice(0, 6).map(member => (
                  <Cast>
                    <div className="cast-img-wrapper">
                      <img src={`${IMAGE_URL}w185${member.profile_path}`} alt="" />
                    </div>
                    <div className="cast-names">
                      <span>{member.name}</span>
                      <span>{member.character}</span>
                    </div>
                  </Cast>
                ))}
              </CastOverview>
            </>
          )}
          {filteredVideos.length > 0 && (
            <>
              <h2>Trailer</h2>
              <Trailer>
                <iframe
                  width="560"
                  title="Trailer"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${filteredVideos[0].key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Trailer>
            </>
          )}
          {credits.crew.length > 0 && (
            <>
              <h2>Featured Crew</h2>
              <CrewOverview>
                {credits.crew.slice(0, 10).map(member => (
                  <Crew>
                    {member.name} <span>({member.job})</span>
                  </Crew>
                ))}
              </CrewOverview>
            </>
          )}
          <h2>Similar {type === 'tv' ? 'Shows' : 'Movies'}</h2>
          <SimOverview>
            {similar.slice(0, 10).map(item => (
              <a href={`/detail/${type}/${item.id}`}>{item.name || item.title}</a>
            ))}
          </SimOverview>
        </SecondaryInformation>
      </Wrapper>
    )
  }
}

DetailedView.propTypes = {
  type: PropTypes.oneOf(['tv', 'movie']).isRequired,
  id: PropTypes.string,
}
