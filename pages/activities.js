import { reAuthorize, getActivities } from "../modules/common";

// This function gets called at build time
export async function getStaticProps() {
  const token = await reAuthorize()
  const activities = await getActivities(token.access_token)
  console.log(activities)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      activities,
    },
  }
}

// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Activities({ activities }) {
  if (activities.map) {
    const activityList = []
    activities.map((item) => {
      const activity = {
        name: item.name,
        url: `./activities/${item.id}`
      }
      activityList.push(activity)
    })

    return (
      <div>
        <ul>
          {activityList.map((activity) => (
            <li>
              <a href={activity.url}>
                <p>{activity.name}</p>
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
        <p>{activities.message}</p>
      </div>
    )

  }

}

export default Activities