import {Link} from "react-router-dom"

export const Home = () => {
  return (
    // add negative margin to
    <div className="card" style={{marginBottom: "-20px"}}>
      {/* three links react router links that leeads to 3 users */}
      <Link className="userLink" to="/users/1">
        User 1
      </Link>
      <Link className="userLink" to="/users/2">
        User 2
      </Link>
      <Link className="userLink" to="/users/3">
        User 3
      </Link>
    </div>
  )
}

export default Home
