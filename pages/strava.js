// This function gets called at build time
export async function getStaticProps() {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const refresh_token = process.env.REFRESH_TOKEN;

  const auth_link = "https://www.strava.com/oauth/token"

  // Call an external API endpoint to get posts
  const res = await fetch(auth_link, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'

    },

    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
      grant_type: 'refresh_token'
    })
  })

  const token = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      token,
    },
  }
}

// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Token({ token }) {
  return (
    <div>
      {token.access_token}
    </div>
  )
}

export default Token