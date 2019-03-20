# gatsby-source-tmdb-example

Source from [The Movie Database (TMDb)](https://www.themoviedb.org/) API (v3) in Gatsby.

Built with [gatsby-source-tmdb](https://github.com/LekoArts/gatsby-source-tmdb).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/LekoArts/gatsby-source-tmdb-example)

## How to use

1. Create an account on GitHub
1. Create an account/Login on [The Movie Database](https://www.themoviedb.org/) and grab your [API Key](https://developers.themoviedb.org/3/getting-started/introduction)
1. Create your [Session ID](https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id)
    1. Create a new [request token](https://developers.themoviedb.org/3/authentication/create-request-token) by inserting your API key into the `api_key` field on the "Try it out" tab
    1. Make sure to allow your account writing-access to that request token by following the url  `https://www.themoviedb.org/authenticate/{place-your-request-token-here}`
    1. Create a new [Session ID](https://developers.themoviedb.org/3/authentication/create-session) by going to the "Try it out" tab, insert your API key into the `api_key` field and insert your _request token_ into the **Request Body** json, so:
    ```json
    {
      "request_token": "place-your-request-token-here"
    }
    ```
1. Add films/TV shows to your watchlist/favourites or create lists
1. Click on the "Deploy to Netlify" button, connect your GitHub and insert your API key and Session ID into the corresponding fields. Those two are mandatory, the rest can be left out or changed later.
