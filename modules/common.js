export const reAuthorize = async () => {
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

  return await res.json()
}

export const getActivities = async (access_token) => {
  const url = "https://www.strava.com/api/v3/athlete/activities"
  const auth = `Bearer ${access_token}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "*/*",
      "Authorization": auth
    }
  })

  return await res.json()
}