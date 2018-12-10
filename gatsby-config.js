require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'The Movie Database - Gatsby',
    description: 'Source from The Movie Database (TMDb) API (v3) in Gatsby.',
    url: 'https://tmdb.lekoarts.de',
    logo: '/logo.png',
    twitter: '@lekoarts_de',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve(`./src/components/Layout.jsx`),
      },
    },
    {
      resolve: 'gatsby-source-tmdb',
      options: {
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
        region: 'DE',
        timezone: 'Europe/Berlin',
        reqPerTenSeconds: 32,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Movie Database - Gatsby',
        short_name: 'TMDb',
        start_url: '/',
        background_color: '#272B35',
        theme_color: '#00d374',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
  ],
}
