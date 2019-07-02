import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import format from 'date-fns/format'
import ContentLoader from 'react-content-loader'
import Wrapper from './Wrapper'
import Back from './Back'
import { Icon } from './Icon'
import SEO from './SEO'

const convertMinsToHrsMins = mins => {
  let h = Math.floor(mins / 60)
  let m = mins % 60
  h = h < 10 ? `0${h}` : h
  m = m < 10 ? `0${m}` : m
  return `${h} Hours ${m} Minutes`
}

const calculateTime = ({ episodes, runTime }) => {
  let time
  if (Array.isArray(runTime)) {
    time = runTime[0] // eslint-disable-line
  } else {
    time = runTime
  }
  return convertMinsToHrsMins(episodes * time)
}

const Information = styled.section`
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    flex-direction: column;
  }
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
    font-size: 1.5rem;
    line-height: 2rem;
    margin: 1rem 0;
    color: var(--grey-light);
    span {
      margin-left: 2rem;
    }
    svg {
      vertical-align: bottom;
      width: 2rem;
      height: 2rem;
    }
    [data-name='star'] {
      fill: var(--primary);
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

const useFetch = ({ type, id }) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const [d, s, c, v] = await Promise.all([
      axios(`${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_API_KEY}&language=en-US`),
      axios(`${BASE_URL}${type}/${id}/similar?api_key=${process.env.GATSBY_API_KEY}&language=en-US&page=1`),
      axios(`${BASE_URL}${type}/${id}/credits?api_key=${process.env.GATSBY_API_KEY}&language=en-US`),
      axios(`${BASE_URL}${type}/${id}/videos?api_key=${process.env.GATSBY_API_KEY}&language=en-US`),
    ])
    setData({
      detail: d.data,
      similar: s.data.results,
      credits: c.data,
      videos: v.data.results.filter(video => video.type === 'Trailer'),
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading]
}

const DetailedView = ({ type, id }) => {
  const [data, isLoading] = useFetch({ type, id })
  const [imgIsLoading, setImgIsLoading] = useState(false)

  return (
    <Wrapper>
      {isLoading ? (
        <>
          <Back />
          <ContentLoader height={590} width={700} speed={3} primaryColor="#9faeac" secondaryColor="#dfe8e7">
            <rect x="0" y="0" rx="0" ry="0" width="276" height="421" />
            <rect x="0" y="460" rx="0" ry="0" width="116" height="126" />
            <rect x="125" y="460" rx="0" ry="0" width="116" height="126" />
            <rect x="250" y="460" rx="0" ry="0" width="116" height="126" />
            <rect x="375" y="460" rx="0" ry="0" width="116" height="126" />
            <rect x="500" y="460" rx="0" ry="0" width="116" height="126" />
            <rect x="310" y="0" rx="0" ry="0" width="358" height="43" />
            <circle cx="335" cy="90" r="25" />
            <circle cx="410" cy="90" r="25" />
            <rect x="310" y="142.67" rx="0" ry="0" width="180" height="12" />
            <rect x="310" y="167.67" rx="0" ry="0" width="240" height="16" />
            <rect x="310" y="198.67" rx="0" ry="0" width="160" height="16" />
            <rect x="310" y="256.67" rx="0" ry="0" width="185" height="26" />
            <rect x="310" y="299.67" rx="0" ry="0" width="340" height="11" />
            <rect x="310" y="320.67" rx="0" ry="0" width="340" height="11" />
            <rect x="310" y="340.67" rx="0" ry="0" width="340" height="11" />
          </ContentLoader>
        </>
      ) : (
        <>
          <SEO />
          <Helmet
            title={`${data.detail.title || data.detail.name} | TMDb - Gatsby`}
            meta={[
              {
                name: 'description',
                content: data.detail.overview,
              },
              {
                name: 'og:title',
                content: `${data.detail.title || data.detail.name} | TMDb - Gatsby`,
              },
              {
                name: 'og:url',
                content: `https://tmdb.lekoarts.de/data.detail/${type}/${id}`,
              },
              {
                name: 'og:description',
                content: data.detail.overview,
              },
              {
                name: 'twitter:title',
                content: `${data.detail.title || data.detail.name} | TMDb - Gatsby`,
              },
              {
                name: 'twitter:description',
                content: data.detail.overview,
              },
            ]}
          />
          <Back />
          <Information>
            <Poster>
              {!imgIsLoading ? (
                <ContentLoader rtl height={410} width={275} speed={3} primaryColor="#9faeac" secondaryColor="#dfe8e7">
                  <rect x="0" y="0" rx="0" ry="0" width="275" height="410" />
                </ContentLoader>
              ) : null}
              <img
                onLoad={() => setImgIsLoading(true)}
                style={!imgIsLoading ? { visibility: 'hidden' } : {}}
                src={`${IMAGE_URL}w500${data.detail.poster_path}`}
                alt=""
              />
            </Poster>
            <Details>
              <h1>
                {data.detail.title || data.detail.name} (
                {format(data.detail.release_date || data.detail.first_air_date, 'YYYY')}){' '}
              </h1>
              {(data.detail.title !== data.detail.original_title || data.detail.name !== data.detail.original_name) && (
                <div className="original-name">Original: {data.detail.original_title || data.detail.original_name}</div>
              )}
              <div className="statistics-01">
                <Icon name="star" /> {data.detail.vote_average}
                {data.detail.status &&
                  type === 'tv' &&
                  (data.detail.status === 'Returning Series' ? (
                    <span>
                      <Icon name="running" /> {data.detail.status}
                    </span>
                  ) : (
                    <span>
                      <Icon name="ended" /> {data.detail.status}
                    </span>
                  ))}
              </div>
              <div className="statistics-02">
                {data.detail.number_of_episodes && (
                  <div>
                    <Icon name="episodes" /> {data.detail.number_of_episodes}
                  </div>
                )}
                {data.detail.number_of_seasons && (
                  <div>
                    <Icon name="seasons" /> {data.detail.number_of_seasons}
                  </div>
                )}
                {data.detail.next_episode_to_air && (
                  <div>
                    <Icon name="next" /> {format(data.detail.next_episode_to_air.air_date, 'DD.MM.YY')}
                  </div>
                )}
              </div>
              {data.detail.runtime && <div>Runtime: {data.detail.runtime} Minutes</div>}
              {data.detail.episode_run_time && (
                <div className="totalRuntime">
                  Total Runtime:{' '}
                  {calculateTime({
                    episodes: data.detail.number_of_episodes,
                    seasons: data.detail.number_of_seasons,
                    runTime: data.detail.episode_run_time,
                  })}
                </div>
              )}
              <Genres>
                {data.detail.genres.map(genre => (
                  <Genre key={genre.id}>{genre.name}</Genre>
                ))}
              </Genres>
              <Overview>
                <h2>Overview</h2>
                <p>{data.detail.overview}</p>
              </Overview>
            </Details>
          </Information>
          <SecondaryInformation>
            {data.credits.cast.length > 0 && (
              <>
                <h2>Top Billed Cast</h2>
                <CastOverview>
                  {data.credits.cast.slice(0, 6).map(member => (
                    <Cast key={member.name}>
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
            {data.videos.length > 0 && (
              <>
                <h2>Trailer</h2>
                <Trailer>
                  <iframe
                    width="560"
                    title="Trailer"
                    height="315"
                    src={`https://www.youtube-nocookie.com/embed/${data.videos[0].key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Trailer>
              </>
            )}
            {data.credits.crew.length > 0 && (
              <>
                <h2>Featured Crew</h2>
                <CrewOverview>
                  {data.credits.crew.slice(0, 10).map(member => (
                    <Crew key={`${member.name}-${member.job}`}>
                      {member.name} <span>({member.job})</span>
                    </Crew>
                  ))}
                </CrewOverview>
              </>
            )}
            <h2>Similar {type === 'tv' ? 'Shows' : 'Movies'}</h2>
            <SimOverview>
              {data.similar.slice(0, 10).map(item => (
                <a key={item.id} href={`/detail/${type}/${item.id}`}>
                  {item.name || item.title}
                </a>
              ))}
            </SimOverview>
          </SecondaryInformation>
        </>
      )}
    </Wrapper>
  )
}

export default DetailedView

DetailedView.propTypes = {
  type: PropTypes.oneOf(['tv', 'movie']).isRequired,
  id: PropTypes.string,
}

DetailedView.defaultProps = {
  id: null,
}
