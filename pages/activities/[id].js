import { reAuthorize, getActivities } from "../../modules/common";

const getKudoers = async (access_token, activityId) => {
  const url = `https://www.strava.com/api/v3/activities/${activityId}/kudos`
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

export async function getStaticPaths() {
  const token = await reAuthorize()
  const activities = await getActivities(token.access_token)

  // Get the paths we want to pre-render based on posts
  const paths = activities.map((item) => ({
    params: { id: item.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const token = await reAuthorize()
  const kudoers = await getKudoers(token.access_token, params.id)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      kudoers,
    },
  }
}

function Activity({ kudoers }) {
  const baseURL = "https://www.strava.com/athletes/"
  const athletes = [
    {
      name: "Atilio G.",
      id: "61735012"
    },
    {
      name: "BENEDITO F.",
      id: "52062345"
    },
    {
      name: "Beto S.",
      id: "14119022"
    },
    {
      name: "Douglas B.",
      id: "11720718"
    },
    {
      name: "Eduardo D.",
      id: "12844377"
    },
    {
      name: "Fernando F.",
      id: "13475577"
    },
    {
      name: "Gisele S.",
      id: "21353446"
    },
    {
      name: "Hélcio Á.",
      id: "12765088"
    },
    {
      name: "Joao P.",
      id: "47524061"
    },
    {
      name: "Josias L.",
      id: "25499275"
    },
    {
      name: "Kelly T.",
      id: "24155065"
    },
    {
      name: "Lilian S.",
      id: "17715791"
    },
    {
      name: "Marcelo P.",
      id: "20427152"
    },
    {
      name: "Paulo F.",
      id: "48373701"
    },
    {
      name: "Reinaldo O.",
      id: "35520297"
    },
    {
      name: "Rubens M.",
      id: "5354585"
    },
    {
      name: "Solange J.",
      id: "29480604"
    },
    {
      name: "ésio C.",
      id: "68146671"
    },
  ]

  if (kudoers.map) {
    const kudoersList = []
    kudoers.map((item) => {
      const athleteName = `${item.firstname} ${item.lastname}`
      const athlete = athletes.filter(item => item.name === athleteName);
      const athleteId = athlete.length > 0 ? athlete[0].id : undefined;
      const url = athleteId ? `${baseURL}${athleteId}` : null

      const kudoer = {
        name: athleteName,
        url: url
      }
      kudoersList.push(kudoer)
    })

    return (
      <div>
        <ul>
          {kudoersList.map((kudoer) => (
            <li>
              <a href={kudoer.url}>
                <p>{kudoer.name}</p>
              </a>
            </li>
            // <li>{activity.name}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <p>{kudoers.message}</p>
      </div>
    )

  }
}

export default Activity;