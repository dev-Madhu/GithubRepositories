// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repo-card">
      <img src={avatarUrl} className="avatar" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="star-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star"
          alt="stars"
        />
        <p className="tags-line">{starsCount} stars</p>
      </div>
      <div className="star-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="star"
          alt="forks"
        />
        <p className="tags-line">{forksCount} forks</p>
      </div>
      <div className="star-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="star"
          alt="open issues"
        />
        <p className="tags-line">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
