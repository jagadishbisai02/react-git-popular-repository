import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repositoryData

  return (
    <li className="language-card">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="heading-name">{name}</h1>
      <div className="specific-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="counters">{starsCount} stars</p>
      </div>
      <div className="specific-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="counters">{forksCount} forks</p>
      </div>
      <div className="specific-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="counters">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
