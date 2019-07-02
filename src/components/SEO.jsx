import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

const SEO = () => {
  const data = useStaticQuery(query)
  const {
    site: {
      siteMetadata: { title, description, url, logo },
    },
  } = data

  return (
    <Helmet>
      <title>{title}</title>
      <html lang="en" />
      <meta name="description" content={description} />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta name="msapplication-TileColor" content="#44ce70" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${logo}`} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${logo}`} />
    </Helmet>
  )
}

export default SEO

const query = graphql`
  query Config {
    site {
      siteMetadata {
        title
        description
        url
        logo
      }
    }
  }
`
